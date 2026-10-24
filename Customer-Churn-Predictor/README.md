# Customer Churn Predictor

A complete end-to-end binary classification pipeline for predicting customer churn in a synthetic SaaS dataset.

## Project Overview
This project generates a synthetic dataset for a SaaS business with customer usage, support, and billing features. It performs exploratory data analysis (EDA), handles class imbalance using SMOTE, trains and compares Logistic Regression and Random Forest models, and produces evaluation artifacts including confusion matrices, ROC curves, and a recall-focused classification report for the churned class.

## Features
- Synthetic data generation for SaaS customer churn
- Data cleaning, preprocessing, and EDA
- Class balancing using SMOTE
- Model training and comparison for Logistic Regression and Random Forest
- Evaluation with ROC-AUC, confusion matrix, and classification reports
- Model serialization and results export
- Interactive notebook for analysis and pipeline reproduction

## Files
- `customer_churn_pipeline.py` - main pipeline script
- `requirements.txt` - project dependencies
- `README.md` - project documentation
- `notebooks/analysis.ipynb` - interactive notebook for data exploration and modeling
- `outputs/` - saved plots and metrics from the pipeline

## Setup
1. Create a virtual environment:
   - `python3 -m venv .venv`
2. Activate the environment:
   - `source .venv/bin/activate`
3. Install dependencies:
   - `pip install -r requirements.txt`

## Usage
- To run the scripted pipeline:
  - `python customer_churn_pipeline.py`
- To explore the interactive notebook:
  - Open `notebooks/analysis.ipynb` in VS Code and run cells sequentially.

## Tools & Technologies
- Python 3.8+
- pandas
- numpy
- scikit-learn
- imbalanced-learn
- matplotlib
- seaborn
- joblib
- VS Code
- Git

## Contributing
- Open issues for bug reports or feature requests
- Submit PRs with descriptive titles and test coverage
- Follow standard Python formatting and linting conventions

## License
MIT License