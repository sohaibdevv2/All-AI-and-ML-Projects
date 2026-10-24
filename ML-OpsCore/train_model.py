"""Train a simple RandomForest model and serialize it with joblib.
This script writes the model to `models/model.joblib`.
"""
from pathlib import Path
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
import joblib


def main():
    data = load_iris()
    X, y = data.data, data.target
    clf = RandomForestClassifier(n_estimators=50, random_state=42)
    clf.fit(X, y)

    out_dir = Path("models")
    out_dir.mkdir(exist_ok=True)
    out_path = out_dir / "model.joblib"
    joblib.dump(clf, out_path)
    print(f"Saved model to {out_path}")


if __name__ == "__main__":
    main()
