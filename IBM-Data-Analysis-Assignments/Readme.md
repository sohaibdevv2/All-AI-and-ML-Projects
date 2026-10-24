# IBM Data Analysis in Python Project Repository
Welcome to the  IBM Data Analysis in Python Project repository! This repository contains a collection of projects completed as part of the IBM Data Analysis in Python course. The project is designed to reinforce and apply the concepts learned throughout the course, providing hands-on experience in analyzing and visualizing data using Python. Throughout the course, I have acquired essential skills in handling datasets, extracting meaningful insights, and employing machine learning techniques for predictive analysis.

## Laptop Price Estimator: A Machine Learning Approach

**Problem statement**: In the era of ever-evolving technology, consumers are presented with a myriad of choices when it comes to purchasing laptops. The diverse range of specifications, features, and brands makes the decision-making process challenging. To simplify this process and empower consumers with informed choices, the goal is to develop a predictive model that can accurately estimate the price of a laptop based on its various attributes. 

**Dataset**: we would be using the dataset which is a filtered and modified version of the [Laptop Price Prediction using specifications](https://www.kaggle.com/datasets/arnabchaki/laptop-price-prediction?resource=download) containing information about various laptops available in the market. The dataset includes features such as "Manufacturer", "Category", "Screen", "GPU", "OS", "CPU_core",
"Screen_Size_inch", "CPU_frequency", "RAM_GB", "Storage_GB_SSD", "Weight_kg" and "Price". The target variable is the price of the laptop, which serves as the basis for prediction. Below are tables representing various features and their corresponding assigned numerical values. These mappings are designed to facilitate data representation and analysis within the context of the project.

Category: The category to which the laptop belongs: This parameter is mapped to numerical values in the following way:
| Category    | Assigned Value |
| ----------- | -------------- |
| Gaming      | 1              |
| Netbook     | 2              |
| Notebook    | 3              |
| Ultrabook   | 4              |
| Workstation | 5              |

GPU: The manufacturer of the GPU. This parameter is mapped to numerical values in the following way:
| GPU    | Assigned Value |
| ------ | -------------- |
| AMD    | 1              |
| Intel  | 2              |
| NVidia | 3              |

OS The operating system type (Windows or Linux): This parameter is mapped to numerical values in the following way:
| OS      | Assigned Value |
| ------- | -------------- |
| Windows | 1              |
| Linux   | 2              |

CPU_core: The type of processor used in the laptop: This parameter is mapped to numerical values in the following way:
| CPU Core           | Assigned Value |
| ------------------ | -------------- |
| Intel Pentium i3   | 3              |
| Intel Pentium i5   | 5              |
| Intel Pentium i7   | 7              |

# 🚀 Training Pipeline
![Pipeline](images/Pipeline.png)

Our standard training pipeline consists of several steps:
- Ingest: The initial step involved data ingestion, where the dataset was gathered and imported into the project environment. Details regarding the data sources and ingestion process can be found in the [Data Ingestion Notebook](Notebooks/LaptopPricing_DataImport.ipynb).
  
- Data Wranging: To prepare the dataset for analysis, a thorough data wrangling process was undertaken. This included addressing missing values, encoding categorical variables, and transforming features. For a comprehensive overview of the data wrangling steps, refer to the [Data Wrangling Notebook](Notebooks/LaptopPricing_DataWrangling.ipynb).

- Exploratory Data Analysis: Exploratory Data Analysis (EDA) was conducted to unveil insights, patterns, and relationships within the dataset. The [EDA Notebook](Notebooks/LaptopPricing_EDA.ipynb) contains visualizations and statistical analyses that provide a deeper understanding of the dataset.
  
- Model Development: The core of the project involved developing machine learning models tailored to the specific problem. The [Model Development Notebook](Notebooks/LaptopPricing_ModelDevelopment.ipynb) documents the selection, training, and fine-tuning of the chosen model architecture.

- Model Evaluation and Refinement: The trained models underwent rigorous evaluation using various metrics. Subsequent refinement steps, including hyperparameter tuning and feature selection, were applied to optimize model performance. Explore the [Model Evaluation and Refinement Notebook](Notebooks/LaptopPricing_ModelEvaluation.ipynb) for detailed insights into the evaluation process.
