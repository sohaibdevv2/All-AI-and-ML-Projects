import numpy as np
import pandas as pd
from pathlib import Path
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score, roc_curve

from imblearn.over_sampling import SMOTE


OUTPUT_DIR = Path("outputs")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def generate_synthetic_saas_data(n_samples=5000, churn_rate=0.15, random_state=42):
    """Generate a synthetic SaaS dataset with customer churn labels."""
    rng = np.random.default_rng(random_state)

    tenure_months = rng.integers(1, 61, size=n_samples)
    monthly_charges = np.round(rng.normal(80, 22, size=n_samples).clip(25, 220), 2)
    support_tickets_raised = rng.poisson(0.6, size=n_samples)
    data_usage_gb = np.round(rng.normal(92, 32, size=n_samples).clip(5, 320), 1)

    churned = np.zeros(n_samples, dtype=int)
    churn_indices = rng.choice(n_samples, size=int(np.floor(n_samples * churn_rate)), replace=False)
    churned[churn_indices] = 1

    churn_mask = churned == 1
    if churn_mask.any():
        monthly_charges[churn_mask] = np.round(
            np.clip(monthly_charges[churn_mask] + rng.normal(18, 12, churn_mask.sum()), 35, 260),
            2,
        )
        support_tickets_raised[churn_mask] = np.clip(
            support_tickets_raised[churn_mask] + rng.integers(1, 4, churn_mask.sum()), 0, None
        )
        tenure_months[churn_mask] = np.clip(
            tenure_months[churn_mask] - rng.integers(4, 18, churn_mask.sum()), 1, None
        )
        data_usage_gb[churn_mask] = np.round(
            np.clip(data_usage_gb[churn_mask] + rng.normal(8, 18, churn_mask.sum()), 10, 360),
            1,
        )

    df = pd.DataFrame(
        {
            "tenure_months": tenure_months,
            "monthly_charges": monthly_charges,
            "support_tickets_raised": support_tickets_raised,
            "data_usage_gb": data_usage_gb,
            "churned": churned,
        }
    )

    return df


def plot_correlation_matrix(df: pd.DataFrame, output_path: Path):
    """Plot and save a correlation matrix heatmap."""
    corr = df.corr()
    plt.figure(figsize=(8, 6))
    sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm", square=True, linewidths=0.8)
    plt.title("Feature Correlation Matrix")
    plt.tight_layout()
    plt.savefig(output_path)
    plt.close()


def prepare_data(df: pd.DataFrame, test_size: float = 0.2, random_state: int = 42):
    """Split data into train/test sets and scale numeric features."""
    X = df.drop(columns=["churned"])
    y = df["churned"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, stratify=y, random_state=random_state
    )

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    return X_train_scaled, X_test_scaled, y_train, y_test, scaler


def balance_train_data(X_train, y_train, strategy: str = "smote", random_state: int = 42):
    """Balance the training data either with SMOTE or class-weight adjustment fallback."""
    if strategy.lower() == "smote":
        sampler = SMOTE(random_state=random_state)
        X_balanced, y_balanced = sampler.fit_resample(X_train, y_train)
        return X_balanced, y_balanced

    raise ValueError("Unsupported balancing strategy. Use 'smote'.")


def build_models(random_state: int = 42):
    """Return a dictionary of models to train and compare."""
    models = {
        "Logistic Regression": LogisticRegression(
            solver="liblinear", random_state=random_state, max_iter=1000
        ),
        "Random Forest": RandomForestClassifier(
            n_estimators=150, max_depth=8, random_state=random_state
        ),
    }
    return models


def plot_confusion_matrix(cm, labels, output_path: Path):
    plt.figure(figsize=(6, 5))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues", xticklabels=labels, yticklabels=labels)
    plt.xlabel("Predicted label")
    plt.ylabel("True label")
    plt.title("Confusion Matrix")
    plt.tight_layout()
    plt.savefig(output_path)
    plt.close()


def plot_roc_curve(y_true, y_score, output_path: Path):
    fpr, tpr, _ = roc_curve(y_true, y_score)
    plt.figure(figsize=(6, 5))
    plt.plot(fpr, tpr, label=f"ROC curve (AUC = {roc_auc_score(y_true, y_score):.3f})")
    plt.plot([0, 1], [0, 1], linestyle="--", color="gray")
    plt.xlabel("False Positive Rate")
    plt.ylabel("True Positive Rate")
    plt.title("ROC Curve")
    plt.legend(loc="lower right")
    plt.tight_layout()
    plt.savefig(output_path)
    plt.close()


def evaluate_model(model, X_test, y_test, model_name: str):
    """Evaluate a trained model and save metrics plus plots."""
    y_pred = model.predict(X_test)
    y_score = model.predict_proba(X_test)[:, 1]

    cm = confusion_matrix(y_test, y_pred)
    report = classification_report(y_test, y_pred, target_names=["active", "churned"], digits=4)
    roc_auc = roc_auc_score(y_test, y_score)

    print(f"\n=== Evaluation for {model_name} ===")
    print(f"ROC-AUC: {roc_auc:.4f}")
    print("Confusion Matrix:")
    print(cm)
    print("\nClassification Report:")
    print(report)

    plot_confusion_matrix(
        cm,
        labels=["active", "churned"],
        output_path=OUTPUT_DIR / f"confusion_matrix_{model_name.replace(' ', '_').lower()}.png",
    )
    plot_roc_curve(
        y_test,
        y_score,
        output_path=OUTPUT_DIR / f"roc_curve_{model_name.replace(' ', '_').lower()}.png",
    )

    return {
        "model_name": model_name,
        "roc_auc": roc_auc,
        "confusion_matrix": cm.tolist(),
        "classification_report": report,
    }


def run_pipeline():
    df = generate_synthetic_saas_data()
    print("Generated dataset shape:", df.shape)
    print(df["churned"].value_counts(normalize=True).rename("ratio"))
    print(df.head())

    plot_correlation_matrix(df, OUTPUT_DIR / "correlation_matrix.png")
    print(f"Saved correlation matrix to {OUTPUT_DIR / 'correlation_matrix.png'}")

    X_train, X_test, y_train, y_test, scaler = prepare_data(df)
    X_train_balanced, y_train_balanced = balance_train_data(X_train, y_train)
    print("Training set before balancing:", y_train.value_counts().to_dict())
    print("Training set after SMOTE balancing:", pd.Series(y_train_balanced).value_counts().to_dict())

    models = build_models()
    evaluations = []
    for model_name, model in models.items():
        model.fit(X_train_balanced, y_train_balanced)
        evaluations.append(evaluate_model(model, X_test, y_test, model_name))

    evaluation_df = pd.DataFrame(
        [
            {
                "model": ev["model_name"],
                "roc_auc": ev["roc_auc"],
            }
            for ev in evaluations
        ]
    )
    evaluation_df.to_csv(OUTPUT_DIR / "model_comparison.csv", index=False)
    print(f"Saved model comparison summary to {OUTPUT_DIR / 'model_comparison.csv'}")


if __name__ == "__main__":
    run_pipeline()
