#!/bin/bash  
demo_name=$1
meta_data=$2
sandbox_username=$3

# TODO GIT Creds logic
github_url=https://github.com/IBM/ibmtechzone-demo-artifacts
project_name=ibmtechzone-demo-artifacts 
username=IBM
git_token=Z2hwX0lReDhlZHFnS3BpNVBYTXdYTWhRNk01d0diUHFzRjQxdGIzdQ==
# Logic
cd /projects/techzone-demo/sandbox
rm -rf $project_name
if [ ! -d "$project_name" ]; then
  git clone --sparse $github_url
fi
# TODO
# Update the actual url
cd /projects/techzone-demo/sandbox/$project_name

git checkout -b $demo_name
git remote add upstream $github_url
git sparse-checkout set $demo_name
if [ -d "$demo_name" ]; then
  # Control will enter here if $DIRECTORY doesn't exist.
  echo "This name is Already Taken, please give other namea!"
  exit 2
fi
gtd=`echo $git_token | base64 -d`
mkdir $demo_name
git sparse-checkout set $demo_name
# TODO
# Add the meta_data and files to demo_name variable
# ......
echo $meta_data > $demo_name/readme.json
# add the required files
cp /projects/techzone-demo/sandbox/governance_artifacts.zip $demo_name/
cp /projects/techzone-demo/sandbox/users.csv $demo_name/
cp /projects/techzone-demo/sandbox/data_protection_rules.json $demo_name/
cp /projects/techzone-demo/sandbox/project_assets.zip $demo_name/


git add .
git commit -am "sandbox demo commit by '$sandbox_username'"
git push https://user_name:$gtd@github.com/$username/$project_name.git 

curl \
  -X POST \
  -H 'Authorization: token '${gtd}'' \
  https://api.github.com/repos/${username}/${project_name}/pulls \
  -d '{"title":"Sandbox Demo by '$sandbox_username'","body":"Sandbox demo description!","head":"'$demo_name'","base":"main"}'


echo "Pull Request created successfully!"   