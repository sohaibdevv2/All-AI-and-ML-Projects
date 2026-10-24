# Banking Churn Analysis & Modeling

## Project Overview

This project performs a comprehensive **Banking Churn Analysis** and builds multiple machine learning models to predict customer churn. The goal is to identify which customers are most likely to leave the bank and understand the key factors driving their decision.

### Business Objective
- Identify customers most likely to churn (leave the service)
- Understand key factors driving customer attrition
- Enable proactive retention strategies through predictive analytics

### Business Value
- **Customer retention** is critical for bank profitability
- Predictive models help take proactive steps (personalized services, incentives) to retain valuable customers
- Reduces customer acquisition costs by improving retention rates

---

## File Structure

```
data-science-end-to-end-project.ipynb    # Main notebook
Churn_Modelling.csv                      # Dataset (place in same directory)
README.md                                 # This file
```

---

## Technologies & Tools Used

### Data Processing & Analysis
- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computing
- **Seaborn** - Statistical data visualization
- **Matplotlib** - Plotting and visualization
- **SciPy** - Statistical functions

### Data Preprocessing
- **scikit-learn**:
  - `LabelEncoder` - Categorical encoding
  - `OneHotEncoder` - One-hot encoding
  - `StandardScaler` - Feature scaling
  - `train_test_split` - Data splitting

### Handling Imbalanced Data
- **imbalanced-learn** (SMOTE) - Oversampling technique for balanced training data

### Machine Learning Models
- **scikit-learn**:
  - Logistic Regression
  - Support Vector Classifier (SVC)
  - K-Nearest Neighbors (KNN)
  - Decision Tree Classifier
  - Random Forest Classifier
  - Bagging Classifier
  - Extra Trees Classifier
  - AdaBoost Classifier

- **XGBoost** - Gradient boosting framework
- **CatBoost** - Categorical boosting
- **LightGBM** - Light Gradient Boosting Machine

### Model Evaluation
- **scikit-learn**:
  - Accuracy Score
  - Precision Score
  - Recall Score
  - F1 Score
  - Confusion Matrix
  - Classification Report
  - GridSearchCV - Hyperparameter tuning

---

## Project Workflow

### 1. **Data Representation**
   - Load and explore the dataset
   - Display basic data information

### 2. **Data Wrangling**
   - Check for duplicated values
   - Check for missing values
   - Identify and visualize outliers

### 3. **Exploratory Data Analysis (EDA)**
   - **Univariate Analysis**: Distribution of individual features
   - **Bivariate Analysis**: Relationship between features and churn
   - **Multivariate Analysis**: Correlation heatmap

### 4. **Data Preprocessing**
   - Drop irrelevant columns (RowNumber, CustomerId, Surname)
   - One-hot encoding for categorical variables (Geography, Gender)
   - StandardScaler for numerical features
   - Train-test split (80-20)
   - Optional SMOTE for handling class imbalance

### 5. **Machine Learning Models**
   - Train 11 different ML models
   - Perform hyperparameter tuning (GridSearchCV for SVC)
   - Generate predictions and confusion matrices

### 6. **Model Evaluation**
   - Compare models using Accuracy, Precision, and Recall
   - Evaluate performance before and after SMOTE
   - Identify best models for different scenarios

---

## Key Metrics Explained

- **Accuracy**: Overall correctness of the model (% of correct predictions)
- **Precision**: Of predicted churners, how many actually churned? (reduces false positives)
- **Recall**: Of actual churners, how many were correctly identified? (reduces false negatives)

---

## Dataset Features

| Feature | Description |
|---------|-------------|
| CreditScore | Customer credit score (300-850) |
| Geography | Country of the customer |
| Gender | M/F |
| Age | Customer age |
| Tenure | Years with the bank |
| Balance | Account balance |
| NumOfProducts | Number of products purchased |
| HasCrCard | Has credit card (1=Yes, 0=No) |
| IsActiveMember | Active member status (1=Yes, 0=No) |
| EstimatedSalary | Annual estimated salary |
| **Exited** | Target variable (1=Churned, 0=Retained) |

---

## How to Use

1. **Prepare Data**:
   - Download or prepare your `Churn_Modelling.csv` file
   - Place it in the same directory as the notebook

2. **Run the Notebook**:
   - Open `data-science-end-to-end-project.ipynb` in Jupyter Notebook, JupyterLab, or VS Code
   - Execute cells sequentially from top to bottom

3. **Interpret Results**:
   - Review EDA visualizations to understand data patterns
   - Compare model performances in the evaluation section
   - Choose the best model based on your use case (high precision vs. high recall)

---

## Model Performance Summary

### Before SMOTE
- **Best for Recall**: XGBoost (0.5318), CatBoost (0.4860)
- **Best for Precision**: SVC (0.8285)
- **Balanced Models**: LightGBM, XGBoost

### After SMOTE (Recommended)
- **Best for Recall**: Random Forest (0.7405), Decision Tree (0.7125)
- **Balanced Models**: LightGBM (Acc: 0.866, Prec: 0.684, Rec: 0.590), CatBoost
- **Best for Precision**: SVC (0.8285)

---

## Key Insights

✅ **SMOTE improves recall significantly** - Better at identifying actual churners
✅ **Trade-off between Precision & Recall** - Choose based on business needs
✅ **Ensemble methods perform well** - Random Forest, XGBoost, LightGBM, CatBoost
✅ **Class imbalance matters** - Original data heavily skewed toward non-churners (80-20)

---

## Requirements

Create a `requirements.txt` file with:

```
pandas>=1.3.0
numpy>=1.21.0
matplotlib>=3.4.0
seaborn>=0.11.0
scikit-learn>=0.24.0
imbalanced-learn>=0.8.0
xgboost>=1.5.0
catboost>=1.0.0
lightgbm>=3.2.0
scipy>=1.7.0
```

Install with:
```bash
pip install -r requirements.txt
```

---

## Notes

- The dataset path has been changed from Kaggle to local directory to avoid copyright issues
- All models are trained on the same train-test split for fair comparison
- Consider SMOTE when class imbalance is a concern (recommended for this project)
- Hyperparameter tuning can be expanded for better results

---

## Learning Outcomes

Through this project, you'll learn:
- End-to-end ML pipeline development
- Data exploration and visualization techniques
- Feature engineering and preprocessing
- Model selection and comparison
- Handling imbalanced datasets with SMOTE
- Hyperparameter tuning with GridSearchCV
- Model evaluation metrics and trade-offs

---
Project Type**: Machine Learning Classification  
**Status**: Complete
