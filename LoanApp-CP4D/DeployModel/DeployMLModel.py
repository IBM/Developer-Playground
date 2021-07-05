import pandas as pd
import numpy as np
from scipy.stats import zscore
from ibm_watson_machine_learning import APIClient
from sklearn import tree
import json

from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import BaggingClassifier
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import BaggingClassifier, RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn import model_selection
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB

apikey = input('Enter API key : ')
space_id = input('Enter Space id : ')

with open(".env", "a") as f:
    f.write("\n#Api key\nAPI_Key="+apikey+"\n")
    f.write("\n#Space id\nSpace_ID="+space_id+"\n")

data = pd.read_csv('./Dataset/BankLoan.csv')
print(data.head())
data.columns = ["ID","Age","Experience","Income","ZIPCode","Family","CCAvg","Education","Mortgage","PersonalLoan","SecuritiesAccount","CDAccount","Online","CreditCard"]
# print(data.columns)
# print(data.shape)
# print(data.info)
data.apply(lambda x : sum(x.isnull()))
data[data['Experience'] < 0]['Experience'].count()
dfExp = data.loc[data['Experience'] >0]
negExp = data.Experience < 0
column_name = 'Experience' 
mylist = data.loc[negExp]['ID'].tolist()
negExp.value_counts()
for id in mylist:
    age = data.loc[np.where(data['ID']==id)]["Age"].tolist()[0]
    education = data.loc[np.where(data['ID']==id)]["Education"].tolist()[0]
    df_filtered = dfExp[(dfExp.Age == age) & (dfExp.Education == education)]
    exp = df_filtered['Experience'].median()
    data.loc[data.loc[np.where(data['ID']==id)].index, 'Experience'] = exp
data[data['Experience'] < 0]['Experience'].count()
print('Credit card spending of Non-Loan customers: ',data[data.PersonalLoan == 0]['CCAvg'].median()*1000)
print('Credit card spending of Loan customers    : ', data[data.PersonalLoan == 1]['CCAvg'].median()*1000)

train_set, test_set = train_test_split(data.drop(['ID','Experience'], axis=1), test_size=0.3 , random_state=100)
train_labels = train_set.pop('PersonalLoan')
test_labels = test_set.pop('PersonalLoan')
naive_model = GaussianNB()
naive_model.fit(train_set, train_labels)

prediction = naive_model.predict(test_set)
print(naive_model.score(test_set,test_labels))
print(prediction)
wml_credentials = {
  "apikey": apikey,
  "url": "https://us-south.ml.cloud.ibm.com"
}
client = APIClient(wml_credentials)
client.set.default_space(space_id)
sofware_spec_uid = client.software_specifications.get_id_by_name('default_py3.7')
metadata = {
            client.repository.ModelMetaNames.NAME: 'Personal Loan Prediction model',
            client.repository.ModelMetaNames.TYPE: 'scikit-learn_0.23',
            client.repository.ModelMetaNames.SOFTWARE_SPEC_UID: sofware_spec_uid
}
published_model = client.repository.store_model(model=naive_model, meta_props=metadata, \
                                                training_data=train_set, training_target=train_labels)
published_model_uid = client.repository.get_model_uid(published_model)
model_details = client.repository.get_details(published_model_uid)
loaded_model = client.repository.load(published_model_uid)
test_predictions = loaded_model.predict(test_set[:10])
print(test_predictions)
deploy_meta = {
     client.deployments.ConfigurationMetaNames.NAME: 'Deployment of Personal Loan Prediction Model',
     client.deployments.ConfigurationMetaNames.ONLINE: {}
}
created_deployment = client.deployments.create(published_model_uid, meta_props=deploy_meta)
deployments = client.deployments.get_details()
scoring_endpoint = client.deployments.get_scoring_href(created_deployment)
deployment_id = client.deployments.get_uid(created_deployment)

with open(".env", "a") as f:
    f.write("\n#Scoring url\nScoring_url="+scoring_endpoint+"\n")
    f.write("\n#Deployment ID\nDeployment_ID="+deployment_id+"\n")
print('end point url is :' + scoring_endpoint)
print('Deployment ID is :'+ deployment_id)
