# eval $(minikube docker-env)
# eval $(crc oc-env)

# python ../build_services.py -t latest -r sinny777 -P
# python ../build_services.py -t latest

# kubectl create -f namespaces/namespace-dev.json
# kubectl config set-context dev --namespace=virtual-agent \
#   --cluster=docker-desktop \
#   --user=docker-desktop

# kubectl config use-context dev

# kubectl delete -f web.yaml
# kubectl delete -f va-deployment.yaml
# kubectl delete -f app-secrets.yaml
# kubectl delete -f app-config.yaml


kubectl apply -f app-config.yaml
kubectl apply -f app-secrets.yaml
kubectl apply -f va-deployment.yaml
kubectl apply -f services/web.yaml




sleep 5

# open https://minikube.info

# kubectl describe pods
