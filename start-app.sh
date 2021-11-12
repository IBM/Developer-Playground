echo "*********** STARTING APPLICATION **************"


function run_local_cloudant {
    name='cloudant-developer'
    echo "*********** MAKE SURE CLOUDANT CONTAINER IS RUNNING LOCALLY $name ************ "
    # docker run -ti -v /var/run/docker.sock:/var/run/docker.sock docker
    # [[ $(docker ps --filter "name=^/$name$" --format '{{.Names}}') == $name ]] ||
    # docker run --detach --volume cloudant:/srv --name cloudant-developer --network my-network --publish 8888:80 --hostname cloudant.dev ibmcom/cloudant-developer
}

function create_datasources {
    echo "*********** CREATING DATASOURCES IN LOCAL CLOUDANT CONTAINER ************ "
    export CLOUDANT_URL="http://admin:pass@cloudant-developer:80"
    curl -X PUT "$CLOUDANT_URL/accounts"
    curl -X PUT "$CLOUDANT_URL/identities"
    curl -X PUT "$CLOUDANT_URL/mappings"
    curl -X PUT "$CLOUDANT_URL/conversations"
    curl -X PUT "$CLOUDANT_URL/roles"
    curl -X PUT "$CLOUDANT_URL/rolemappings"
}

# run_local_cloudant
# create_datasources

cd app

DEBUG="" npm start
