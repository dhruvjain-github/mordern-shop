# MongoDB Migration for E-commerce App

This migration image transfers data from JSON files to MongoDB for the e-commerce application.

## 🚀 Quick Start

### 1. Build and Push Migration Image
```bash
./build-migration.sh
```

### 2. Deploy to Kubernetes
```bash
# Deploy MongoDB and run migration
kubectl apply -f k8s/migration.yaml

# Check migration status
kubectl logs job/mongodb-migration
```

## 📦 What Gets Migrated

- **Products** (`data/products.json`) → `products` collection
- **Categories** (`data/categories.json`) → `categories` collection
- **Indexes** for optimal performance

## 🔧 Environment Variables

- `MONGODB_URI`: MongoDB connection string (default: `mongodb://localhost:27017`)
- `DATABASE_NAME`: Database name (default: `ecommerce`)

## 📊 Migration Details

The migration will:
1. Connect to MongoDB
2. Clear existing data
3. Insert products and categories
4. Create performance indexes
5. Report migration summary

## 🎯 For Freshers

This is a **Job** in Kubernetes - it runs once and completes:
- **Job**: Runs a task to completion (migration)
- **Deployment**: Runs MongoDB server continuously
- **Service**: Allows migration to connect to MongoDB

### Understanding the Flow:
1. MongoDB Deployment starts → MongoDB server runs
2. MongoDB Service exposes MongoDB → Migration can connect
3. Migration Job runs → Data gets transferred
4. Job completes → Migration finished

## 🐛 Troubleshooting

```bash
# Check if MongoDB is running
kubectl get pods -l app=mongodb

# Check migration job status
kubectl describe job mongodb-migration

# View migration logs
kubectl logs job/mongodb-migration

# Delete and retry migration
kubectl delete job mongodb-migration
kubectl apply -f k8s/migration.yaml
```
