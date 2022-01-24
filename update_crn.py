with open("services-data.txt", "r") as f :
  filedata = f.read()
data = filedata.split('\n')
res = list(filter(lambda x: "crn:v1:bluemix:public:" in x, data))
with open(".env", "a") as f:
    f.write("\nCOS_CRN="+res[0].split("ID:")[-1].strip())
with open(".env", "a") as f:
    f.write("\nWML_CRN="+res[1].split("ID:")[-1].strip())