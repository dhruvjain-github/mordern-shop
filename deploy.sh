#!/bin/bash
set -e

echo "Deploying MongoDB..."
kubectl apply -f k8s/01-mongodb.yaml

echo "Waiting for MongoDB to be ready..."
kubectl wait --for=condition=ready pod -l app=mongodb --timeout=300s

echo "Running data migration..."
kubectl apply -f k8s/02-migration.yaml

echo "Waiting for migration to complete..."
kubectl wait --for=condition=complete job/data-migration --timeout=300s

echo "Deploying application..."
kubectl apply -f k8s/03-deployment.yaml
kubectl apply -f k8s/04-service.yaml
kubectl apply -f k8s/05-ingress.yaml
kubectl apply -f k8s/06-hpa.yaml

echo "Waiting for app to be ready..."
kubectl wait --for=condition=ready pod -l app=shopping-app --timeout=300s

echo "Deployment complete!"
echo "Run: kubectl port-forward --address 0.0.0.0 service/shopping-service 8080:80"
echo "Then access: http://<EC2-PUBLIC-IP>:8080"
