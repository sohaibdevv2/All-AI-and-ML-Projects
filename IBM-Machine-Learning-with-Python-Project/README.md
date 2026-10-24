# IBM-Machine-Learning-with-Python
This repository hosts files from the practical lab of the IBM Machine Learning with Python final project.
 
# Rainfall Prediction Classifier

## Project Description
This project implements a machine learning pipeline to predict whether it will rain on a given day based on historical meteorological data from Australia. It specifically focuses on the Melbourne region to maintain local weather pattern accuracy.

## Dataset Summary
- **Primary Source:** Australian Bureau of Meteorology (via Kaggle).
- **Temporal Range:** 2008 – 2017.
- **Key Features:** Temperature (Min/Max), Rainfall, Evaporation, Sunshine, Wind Speed/Direction, Humidity, Pressure, and Cloud coverage.
- **Target:** `RainToday` (Binary: Yes/No).

## Key Components
- **Data Cleaning:** Removal of null values and outlier detection using the IQR method.
- **Feature Engineering:** One-hot encoding for categorical variables and standard scaling for numerical features.
- **Class Imbalance:** Implementation of SMOTE (Synthetic Minority Over-sampling Technique) to handle the imbalance between rainy and non-rainy days.
- **Models Used:** - Random Forest Classifier
  - XGBoost Classifier

## Performance Highlights
- **Accuracy:** ~85%
- **F1-Score (Rain Class):** 0.70
- **Recommendation:** Use **XGBoost** if the priority is capturing as many rainy days as possible (higher recall), or **Random Forest** to minimize "false alarms" (higher precision).
