# Copyrights
# Licensed Materials - Copyright © 2021 IBM. This notebook and its source code are released under the terms of the ILAN License. Use, duplication disclosure restricted by GSA ADP Schedule Contract with IBM Corp.

# Note: The auto-generated notebooks are subject to the International License Agreement for Non-Warranted Programs
# (or equivalent) and License Information document for Watson Studio Auto-generated Notebook (License Terms),
# such agreements located in the link below. Specifically, the Source Components and Sample Materials clause
# included in the License Information document for Watson Studio Auto-generated Notebook applies to the auto-generated notebooks.

# By downloading, copying, accessing, or otherwise using the materials, you agree to the License Terms
# This python code contains a Scikit-learn representation of AutoAI pipeline. This code introduces commands for getting data, training the model, and testing the model.

# Some familiarity with Python is helpful. This code uses Python 3.7 and scikit-learn 0.23.1.



from sklearn.model_selection import train_test_split
from autoai_libs.transformers.exportable import ColumnSelector
from autoai_libs.transformers.exportable import NumpyColumnSelector
from autoai_libs.transformers.exportable import CompressStrings
from autoai_libs.transformers.exportable import NumpyReplaceMissingValues
from autoai_libs.transformers.exportable import NumpyReplaceUnknownValues
from autoai_libs.transformers.exportable import boolean2float
from autoai_libs.transformers.exportable import CatImputer
from autoai_libs.transformers.exportable import CatEncoder
import numpy as np
import pandas as pd
from sklearn.metrics import get_scorer
from ibm_watson_machine_learning import APIClient
import json
import os

from autoai_libs.transformers.exportable import float32_transform
from sklearn.pipeline import make_pipeline
from autoai_libs.transformers.exportable import FloatStr2Float
from autoai_libs.transformers.exportable import NumImputer
from autoai_libs.transformers.exportable import OptStandardScaler
from sklearn.pipeline import make_union
from autoai_libs.transformers.exportable import NumpyPermuteArray
from autoai_libs.cognito.transforms.transform_utils import TA2
import autoai_libs.utils.fc_methods
from autoai_libs.cognito.transforms.transform_utils import FS1
from autoai_libs.cognito.transforms.transform_utils import TAM
from sklearn.cluster import FeatureAgglomeration
from sklearn.ensemble import ExtraTreesClassifier

apikey = input('Enter API key : ')
space_id = input('Enter Space id : ')

with open(".env", "a") as f:
    f.write("\n#Api key\nAPI_Key="+apikey+"\n")
    f.write("\n#Space id\nSpace_ID="+space_id+"\n")

df = pd.read_csv('./Dataset/Loan_Train.csv')
df.dropna('rows', how='any', subset=['Loan_Status'], inplace=True)

df.drop_duplicates(inplace=True)
X = df.drop(['Loan_Status'], axis=1).values
y = df['Loan_Status'].values

train_X, test_X, train_y, test_y = train_test_split(X, y, test_size=0.1,
                                                    stratify=y, random_state=33)

column_selector = ColumnSelector(
    columns_indices_list=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
)
numpy_column_selector_0 = NumpyColumnSelector(
    columns=[0, 1, 2, 3, 4, 8, 9, 10]
)
compress_strings = CompressStrings(
    compress_type="hash",
    dtypes_list=[
        "char_str",
        "char_str",
        "int_str",
        "char_str",
        "char_str",
        "float_int_num",
        "float_int_num",
        "char_str",
    ],
    missing_values_reference_list=["", "-", "?", float("nan")],
    misslist_list=[
        [float("nan")],
        [float("nan")],
        [float("nan"), "3+"],
        [],
        [float("nan")],
        [float("nan")],
        [float("nan")],
        [],
    ],
)
numpy_replace_missing_values_0 = NumpyReplaceMissingValues(
    missing_values=[float("nan"), "3+"], filling_values=float("nan")
)
numpy_replace_unknown_values = NumpyReplaceUnknownValues(
    filling_values=float("nan"),
    filling_values_list=[
        float("nan"),
        float("nan"),
        float("nan"),
        float("nan"),
        float("nan"),
        100001,
        100001,
        float("nan"),
    ],
    missing_values_reference_list=["", "-", "?", float("nan")],
)
cat_imputer = CatImputer(
    strategy="most_frequent",
    missing_values=float("nan"),
    sklearn_version_family="23",
)
cat_encoder = CatEncoder(
    encoding="ordinal",
    categories="auto",
    dtype=np.float64,
    handle_unknown="error",
    sklearn_version_family="23",
)
pipeline_0 = make_pipeline(
    numpy_column_selector_0,
    compress_strings,
    numpy_replace_missing_values_0,
    numpy_replace_unknown_values,
    boolean2float(),
    cat_imputer,
    cat_encoder,
    float32_transform(),
)
numpy_column_selector_1 = NumpyColumnSelector(columns=[5, 6, 7])
float_str2_float = FloatStr2Float(
    dtypes_list=["int_num", "float_num", "float_int_num"],
    missing_values_reference_list=[float("nan")],
)
numpy_replace_missing_values_1 = NumpyReplaceMissingValues(
    missing_values=[float("nan")], filling_values=float("nan")
)
num_imputer = NumImputer(strategy="median", missing_values=float("nan"))
opt_standard_scaler = OptStandardScaler(
    num_scaler_copy=None,
    num_scaler_with_mean=None,
    num_scaler_with_std=None,
    use_scaler_flag=False,
)
pipeline_1 = make_pipeline(
    numpy_column_selector_1,
    float_str2_float,
    numpy_replace_missing_values_1,
    num_imputer,
    opt_standard_scaler,
    float32_transform(),
)
union = make_union(pipeline_0, pipeline_1)
numpy_permute_array = NumpyPermuteArray(
    axis=0, permutation_indices=[0, 1, 2, 3, 4, 8, 9, 10, 5, 6, 7]
)
ta2 = TA2(
    fun=np.add,
    name="sum",
    datatypes1=[
        "intc",
        "intp",
        "int_",
        "uint8",
        "uint16",
        "uint32",
        "uint64",
        "int8",
        "int16",
        "int32",
        "int64",
        "short",
        "long",
        "longlong",
        "float16",
        "float32",
        "float64",
    ],
    feat_constraints1=[autoai_libs.utils.fc_methods.is_not_categorical],
    datatypes2=[
        "intc",
        "intp",
        "int_",
        "uint8",
        "uint16",
        "uint32",
        "uint64",
        "int8",
        "int16",
        "int32",
        "int64",
        "short",
        "long",
        "longlong",
        "float16",
        "float32",
        "float64",
    ],
    feat_constraints2=[autoai_libs.utils.fc_methods.is_not_categorical],
    col_names=[
        "Gender",
        "Married",
        "Dependents",
        "Education",
        "Self_Employed",
        "ApplicantIncome",
        "CoapplicantIncome",
        "LoanAmount",
        "Loan_Amount_Term",
        "Credit_History",
        "Property_Area",
    ],
    col_dtypes=[
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
    ],
)
fs1_0 = FS1(
    cols_ids_must_keep=range(0, 11),
    additional_col_count_to_keep=12,
    ptype="classification",
)
tam = TAM(
    tans_class=FeatureAgglomeration(),
    name="featureagglomeration",
    col_names=[
        "Gender",
        "Married",
        "Dependents",
        "Education",
        "Self_Employed",
        "ApplicantIncome",
        "CoapplicantIncome",
        "LoanAmount",
        "Loan_Amount_Term",
        "Credit_History",
        "Property_Area",
        "sum(ApplicantIncome__CoapplicantIncome)",
        "sum(ApplicantIncome__LoanAmount)",
        "sum(CoapplicantIncome__LoanAmount)",
    ],
    col_dtypes=[
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
        np.dtype("float32"),
    ],
)
fs1_1 = FS1(
    cols_ids_must_keep=range(0, 11),
    additional_col_count_to_keep=12,
    ptype="classification",
)
extra_trees_classifier = ExtraTreesClassifier(
    bootstrap=True,
    class_weight="balanced",
    max_depth=5,
    max_features=0.9999999999281831,
    min_samples_leaf=0.010000000026196646,
    min_samples_split=0.4999999999802202,
    n_estimators=54,
    n_jobs=4,
    random_state=33,
)

pipeline = make_pipeline(
    column_selector,
    union,
    numpy_permute_array,
    ta2,
    fs1_0,
    tam,
    fs1_1,
    extra_trees_classifier,
)

scorer = get_scorer('accuracy')
print(scorer)
pipeline.fit(train_X,train_y)
score = scorer(pipeline, test_X, test_y)
print(score)


wml_credentials = {
    "apikey": apikey,
    "url": "https://us-south.ml.cloud.ibm.com"
}
client = APIClient(wml_credentials)

client.set.default_space(space_id)
sofware_spec_uid = client.software_specifications.get_id_by_name("default_py3.7")
metadata = {
    client.repository.ModelMetaNames.NAME: 'Personal Loan Prediction model',
    client.repository.ModelMetaNames.TYPE: 'scikit-learn_0.23',
    client.repository.ModelMetaNames.SOFTWARE_SPEC_UID: sofware_spec_uid
}
published_model = client.repository.store_model(model=pipeline, meta_props=metadata, \
                                                training_data=train_X, training_target=train_y)
published_model_uid = client.repository.get_model_uid(published_model)
model_details = client.repository.get_details(published_model_uid)
loaded_model = client.repository.load(published_model_uid)
test_predictions = loaded_model.predict(test_X[:10])
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
