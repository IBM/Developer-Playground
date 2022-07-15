import json
import pandas as pd
import numpy as np
# import seaborn as sns
# import matplotlib.pyplot as plt
from sklearn import preprocessing, svm
from itertools import combinations
from sklearn.preprocessing import PolynomialFeatures, LabelEncoder
# StandardScaler
import sklearn.feature_selection
from sklearn.model_selection import train_test_split
# from collections import defaultdict
from sklearn import metrics
# import pixiedust
from ibm_watson_machine_learning import APIClient
from sklearn.impute import SimpleImputer 
import pandas as pd
from dotenv import dotenv_values

#2. Loading Our Dataset
# Add asset from file system
df_data_2 = pd.read_csv('Dataset/Telco-Customer-Churn.csv')
df_data_2.head()
customer_data = df_data_2

# Checking that everything is correct
pd.set_option('display.max_columns', 30)
# customer_data.head(10)

#3. Get some info about our Dataset and whether we have missing values
customer_data.info()

# Drop customerID column
customer_data = customer_data.drop('customerID', axis=1)
customer_data.head(5)

# Convert TotalCharges column to numeric as it is detected as object
new_col = pd.to_numeric(customer_data.iloc[:, 18], errors='coerce')
new_col

# Modify our dataframe to reflect the new datatype
customer_data.iloc[:, 18] = pd.Series(new_col)
customer_data

# Check if we have any NaN values
customer_data.isnull().values.any()

# Handle missing values
imp = SimpleImputer(missing_values=np.nan, strategy='mean')

# imp = Imputer(missing_values="NaN", strategy="mean")

customer_data.iloc[:, 18] = imp.fit_transform(customer_data.iloc[:, 18].values.reshape(-1, 1))
customer_data.iloc[:, 18] = pd.Series(customer_data.iloc[:, 18])

# Check if we have any NaN values
customer_data.isnull().values.any()

customer_data.info()

#4. Descriptive analytics for our data

# Describe columns with numerical values
pd.set_option('precision', 3)
customer_data.describe()

# Describe columns with objects
customer_data.describe(exclude=np.number)

# Find correlations
customer_data.corr(method='pearson')

#6. Encode string values in data into numerical values

# Use pandas get_dummies
customer_data_encoded = pd.get_dummies(customer_data)
customer_data_encoded.head(10)

#7. Create Training Set and Labels

# Create training data for non-preprocessed approach
X_npp = customer_data.iloc[:, :-1].apply(LabelEncoder().fit_transform)
pd.DataFrame(X_npp).head(5)

# Create training data for that will undergo preprocessing
X = customer_data_encoded.iloc[:, :-2]
X.head()

# Extract labels
y_unenc = customer_data['Churn']

# Convert strings of 'yes' and 'no' to binary values of 0 or 1
le = preprocessing.LabelEncoder()
le.fit(y_unenc)

y_le = le.transform(y_unenc)
pd.DataFrame(y_le)

#8. Detect outliers in numerical values

# Calculate the Z-score using median value and median absolute deviation for more robust calculations
# Working on Monthly Charges column
threshold = 3

median = np.median(X['MonthlyCharges'])
median_absolute_deviation = np.median([np.abs(x - median) for x in X['MonthlyCharges']])
modified_z_scores = [0.6745 * (x - median) / median_absolute_deviation
                         for x in X['MonthlyCharges']]
results = np.abs(modified_z_scores) > threshold

print(np.any(results))

# Do the same for Total Charges column but using the interquartile method

quartile_1, quartile_3 = np.percentile(X['TotalCharges'], [25, 75])
iqr = quartile_3 - quartile_1
lower_bound = quartile_1 - (iqr * 1.5)
upper_bound = quartile_3 + (iqr * 1.5)

print(np.where((X['TotalCharges'] > upper_bound) | (X['TotalCharges'] < lower_bound)))

#9. Feature Engineering

# Find interactions between current features and append them to the dataframe
def add_interactions(dataset):
    # Get feature names
    comb = list(combinations(list(dataset.columns), 2))
    col_names = list(dataset.columns) + ['_'.join(x) for x in comb]
    
    # Find interactions
    poly = PolynomialFeatures(interaction_only=True, include_bias=False)
    dataset = poly.fit_transform(dataset)
    dataset = pd.DataFrame(dataset)
    dataset.columns = col_names
    
    # Remove interactions with 0 values
    no_inter_indexes = [i for i, x in enumerate(list((dataset ==0).all())) if x]
    dataset = dataset.drop(dataset.columns[no_inter_indexes], axis=1)
    
    return dataset

X_inter = add_interactions(X)
X_inter.head(15)

# Select best features
select = sklearn.feature_selection.SelectKBest(k=25)
selected_features = select.fit(X_inter, y_le)
indexes = selected_features.get_support(indices=True)
col_names_selected = [X_inter.columns[i] for i in indexes]

X_selected = X_inter[col_names_selected]
X_selected.head(10)

#10. Split our dataset into train and test datasets
#Split non-preprocessed data

X_train_npp, X_test_npp, y_train_npp, y_test_npp = train_test_split(X_npp, y_le,\
                                                    test_size=0.33, random_state=42)
print(X_train_npp.shape, y_train_npp.shape)
print(X_test_npp.shape, y_test_npp.shape)

X_train, X_test, y_train, y_test = train_test_split(X_selected, y_le,\
                                                    test_size=0.33, random_state=42)
print(X_train.shape, y_train.shape)
print(X_test.shape, y_test.shape)

X_test.head()

#Trying to send data to the endpoint will return predictions with probabilities
#11. Scale our data

# Use StandardScaler
scaler = preprocessing.StandardScaler().fit(X_train, y_train)
X_train_scaled = scaler.transform(X_train)

pd.DataFrame(X_train_scaled, columns=X_train.columns).head()

pd.DataFrame(y_train).head()

#12. Start building a classifier
#Support Vector Macines on non-preprocessed data

from sklearn.svm import SVC

# Run classifier
clf_svc_npp = svm.SVC(random_state=42)
clf_svc_npp.fit(X_train_npp, y_train_npp)

#Support Vector Machines on preprocessed data

# Run classifier
clf_svc = svm.SVC(random_state=42)
clf_svc.fit(X_train_scaled, y_train)

#Logestic Regression on preprocessed data

from sklearn.linear_model import LogisticRegression

clf_lr = LogisticRegression()
model = clf_lr.fit(X_train_scaled, y_train)
model

# #Multilayer Perceptron (Neural Network) on preprocessed data

# from sklearn.neural_network import MLPClassifier

# clf_mlp = MLPClassifier(verbose=0)
# clf_mlp.fit(X_train_scaled, y_train)

# # Note: MLP as a NN, can use data without the feature engineering step, as the NN will handle that automatically

#13. Evaluate our model

# Use the scaler fit on trained data to scale our test data
X_test_scaled = scaler.transform(X_test)
pd.DataFrame(X_test_scaled, columns=X_train.columns).head()

#Evaluate SVC on non-preprocessed data

# Predict confidence scores for data
y_score_svc_npp = clf_svc_npp.decision_function(X_test_npp)
pd.DataFrame(y_score_svc_npp)

# Get accuracy score
from sklearn.metrics import accuracy_score
y_pred_svc_npp = clf_svc_npp.predict(X_test_npp)
acc_svc_npp = accuracy_score(y_test_npp, y_pred_svc_npp)
print(acc_svc_npp)

# Get Precision vs. Recall score
from sklearn.metrics import average_precision_score
average_precision_svc_npp = average_precision_score(y_test_npp, y_score_svc_npp)

print('Average precision-recall score: {0:0.2f}'.format(
      average_precision_svc_npp))

#Evaluate SVC on preprocessed data

# Get model confidence of predictions
y_score_svc = clf_svc.decision_function(X_test_scaled)
y_score_svc

# Get accuracy score
y_pred_svc = clf_svc.predict(X_test_scaled)
acc_svc = accuracy_score(y_test, y_pred_svc)
print(acc_svc)

# Get Precision vs. Recall score
average_precision_svc = average_precision_score(y_test, y_score_svc)

print('Average precision-recall score: {0:0.2f}'.format(
      average_precision_svc))

#Evaluate Logistic Regression on preprocessed data

y_score_lr = clf_lr.decision_function(X_test_scaled)
y_score_lr

y_pred_lr = clf_lr.predict(X_test_scaled)
acc_lr = accuracy_score(y_test, y_pred_lr)
print(acc_lr)

average_precision_lr = average_precision_score(y_test, y_score_lr)

print('Average precision-recall score: {0:0.2f}'.format(
      average_precision_lr))

# #Evaluate MLP on preprocessed data

# y_score_mlp = clf_mlp.predict_proba(X_test_scaled)[:, 1]
# y_score_mlp

# y_pred_mlp = clf_mlp.predict(X_test_scaled)
# acc_mlp = accuracy_score(y_test, y_pred_mlp)
# print(acc_mlp)

# average_precision_mlp = average_precision_score(y_test, y_score_mlp)

# print('Average precision-recall score: {0:0.2f}'.format(
#       average_precision_mlp))

config = dotenv_values(".env") 
deployment_space_name=config["DEPLOYMENT_SPACE_NAME"]
apikey=config["API_KEY"]
model_name = config["MODEL_NAME"]
loc = config["PM-20_LOC"]

wml_credentials = {
  "apikey": apikey,
  "url": "https://"+loc+".ml.cloud.ibm.com"
  }

client = APIClient(wml_credentials)

#bring the deployment space name from .env file
config = dotenv_values(".env") 
DEPLOYMENT_SPACE_NAME = config["DEPLOYMENT_SPACE_NAME"]

all_spaces = client.spaces.get_details()['resources']
space_id = None
for space in all_spaces:
    if space['entity']['name'] == DEPLOYMENT_SPACE_NAME:
        space_id = space["metadata"]["id"]
        print("\nDeployment Space GUID: ", space_id)

if space_id is None:
    print("WARNING: Your space does not exist. Create a deployment space before proceeding to the next cell.")
    #space_id = client.spaces.store(meta_props={client.spaces.ConfigurationMetaNames.NAME: space_name})["metadata"]["guid"]
client.set.default_space(space_id)
sofware_spec_uid = client.software_specifications.get_id_by_name('runtime-22.1-py3.9')
metadata = {
            client.repository.ModelMetaNames.NAME: 'Churn Prediction',
            client.repository.ModelMetaNames.TYPE: 'scikit-learn_1.0',
            client.repository.ModelMetaNames.SOFTWARE_SPEC_UID: sofware_spec_uid
}
published_model = client.repository.store_model(model=model, meta_props=metadata, training_data=X_train, training_target=y_train)
published_model_uid = client.repository.get_model_id(published_model)
# model_details = client.repository.get_details(published_model_uid)
# print(json.dumps(model_details, indent=2))

loaded_model = client.repository.load(published_model_uid)
# test_predictions = loaded_model.predict(test_set[:10])
# print(test_predictions)


with open(".env", "a") as f:
    f.write("\n#Model ID\nMODEL_ID=\""+published_model_uid+"\"\n")

deploy_meta = {
     client.deployments.ConfigurationMetaNames.NAME: 'Deployment of Churn Prediction',
     client.deployments.ConfigurationMetaNames.ONLINE: {}
}
created_deployment = client.deployments.create(published_model_uid, meta_props=deploy_meta)
deployments = client.deployments.get_details()
scoring_endpoint = client.deployments.get_scoring_href(created_deployment)
deployment_id = client.deployments.get_uid(created_deployment)

#model URL is generated with the date of model creation.
from datetime import datetime
now = datetime.now() # current date and time
date=now.strftime("%Y")+"-"+now.strftime("%m")+"-"+now.strftime("%d")

modelurl = scoring_endpoint+"?version="+date

with open(".env", "a") as f:
    f.write("\n#Scoring url\nScoring_url=\""+modelurl+"\"\n")
    f.write("\n#Deployment ID\nDeployment_ID=\""+deployment_id+"\"\n")
print('end point url is :' + modelurl)
print('Deployment ID is :'+ deployment_id)
