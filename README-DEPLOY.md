# K8s Shopping App

Simple e-commerce app with MongoDB migration for Kind on AWS EC2.

## Images
- `dhruvjaindocker/k8s-shopping:latest` - Main app
- `dhruvjaindocker/ecommerce-migration:latest` - Data migration

## Prerequisites (AWS EC2 with Kind)

1. Install Docker, Kind, and kubectl on EC2
2. Create Kind cluster:
```bash
kind create cluster --name shopping-app
```

3. Install NGINX Ingress:
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

## Deploy

1. Deploy MongoDB:
```bash
kubectl apply -f k8s/01-mongodb.yaml
```

2. Wait for MongoDB to be ready:
```bash
kubectl wait --for=condition=ready pod -l app=mongodb --timeout=300s
```

3. Run migration:
```bash
kubectl apply -f k8s/02-migration.yaml
```

4. Deploy app:
```bash
kubectl apply -f k8s/03-deployment.yaml
kubectl apply -f k8s/04-service.yaml
kubectl apply -f k8s/05-ingress.yaml
kubectl apply -f k8s/06-hpa.yaml
```

## Access App

Forward port to access from outside EC2:
```bash
kubectl port-forward --address 0.0.0.0 service/shopping-service 8080:80
```

Then access via: `http://<EC2-PUBLIC-IP>:8080`

## Check Status
```bash
kubectl get pods
kubectl logs job/data-migration
kubectl get ingress
```
