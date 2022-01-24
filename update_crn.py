with open("services-data.txt", "r") as f :
  filedata = f.read()
data = filedata.split('\n')
res = list(filter(lambda x: "ID" in x, data))
print(res)