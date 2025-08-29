# Modern Shopping E-commerce Application

A production-ready e-commerce platform built with Next.js and deployed on Kubernetes using KIND (Kubernetes in Docker).

## Application Overview

This is a modern, scalable shopping application featuring:

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with Material-UI components
- **Authentication**: NextAuth.js
- **Database**: MongoDB
- **Deployment**: Kubernetes with KIND
- **Features**:
  - Product catalog with categories
  - Shopping cart functionality
  - User authentication and accounts
  - Order management
  - Wishlist
  - Responsive design with dark/light theme support

## Architecture

The application follows a cloud-native architecture:

- **Frontend**: Next.js application serving both UI and API routes
- **Database**: MongoDB for data persistence
- **Orchestration**: Kubernetes for container orchestration
- **Load Balancing**: Kubernetes services and ingress
- **Auto-scaling**: Horizontal Pod Autoscaler (HPA)

## Prerequisites

Before setting up the application, ensure you have:

- Docker installed and running
- kubectl CLI tool
- KIND (Kubernetes in Docker)
- Git

## KIND Setup Instructions

### 1. Install Dependencies

For Ubuntu/Debian systems:

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install -y docker.io
sudo usermod -aG docker $USER
sudo systemctl enable docker
sudo systemctl start docker

# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Install KIND
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

# Log out and log back in to apply docker group changes
```

### 2. Create KIND Cluster

Create a KIND cluster with ingress support:

```bash
kind create cluster --name shopping-app --config - <<EOF
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  kubeadmConfigPatches:
  - |
    kind: InitConfiguration
    nodeRegistration:
      kubeletExtraArgs:
        node-labels: "ingress-ready=true"
  extraPortMappings:
  - containerPort: 80
    hostPort: 8080
    protocol: TCP
  - containerPort: 443
    hostPort: 8443
    protocol: TCP
EOF
```

### 3. Install NGINX Ingress Controller

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

# Wait for ingress controller to be ready
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s
```

## Deployment Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd k8s-shoping
```

### 2. Deploy the Application

Use the provided deployment script for automated deployment:

```bash
chmod +x deploy.sh
./deploy.sh
```

### Manual Deployment (Alternative)

If you prefer manual deployment, apply the Kubernetes manifests in order:

```bash
# Create namespace
kubectl apply -f k8s/01-namespace.yaml

# Deploy MongoDB
kubectl apply -f k8s/02-mongodb.yaml

# Wait for MongoDB to be ready
kubectl wait --for=condition=ready pod -l app=mongodb --timeout=300s

# Run data migration
kubectl apply -f k8s/03-migration.yaml

# Wait for migration to complete
kubectl wait --for=condition=complete job/data-migration --timeout=300s

# Deploy application components
kubectl apply -f k8s/04-deployment.yaml
kubectl apply -f k8s/05-service.yaml
kubectl apply -f k8s/06-ingress.yaml
kubectl apply -f k8s/07-hpa.yaml
```

### 3. Access the Application

After deployment, access the application using port forwarding:

```bash
kubectl port-forward --address 0.0.0.0 service/shopping-service 8080:80 -n shopping-app
```

Then open your browser and navigate to:
- Local access: `http://localhost:8080`
- Remote access: `http://<your-ip>:8080`

## Monitoring and Management

### Check Deployment Status

```bash
# Check all pods
kubectl get pods -n shopping-app

# Check services
kubectl get services -n shopping-app

# Check ingress
kubectl get ingress -n shopping-app

# View logs
kubectl logs -f deployment/shopping-app -n shopping-app
```

### Scaling the Application

The application includes Horizontal Pod Autoscaler (HPA) configuration. You can also manually scale:

```bash
# Scale to 5 replicas
kubectl scale deployment shopping-app --replicas=5 -n shopping-app

# Check HPA status
kubectl get hpa -n shopping-app
```

## Development

### Local Development Setup

For local development without Kubernetes:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

The application uses the following environment variables:

- `NODE_ENV`: Application environment (production/development)
- `PORT`: Application port (default: 3000)
- `MONGODB_URI`: MongoDB connection string

## Database Schema

The application uses MongoDB with the following collections:

- **products**: Product catalog data
- **categories**: Product categories
- **users**: User accounts and authentication data
- **orders**: Order history and tracking
- **carts**: Shopping cart data

## Health Checks

The application includes health check endpoints:

- `/api/health`: Application health status
- Kubernetes liveness probe: Checks application responsiveness
- Kubernetes readiness probe: Checks if application is ready to serve traffic

## Troubleshooting

### Common Issues

1. **Pod not starting**: Check logs using `kubectl logs <pod-name> -n shopping-app`
2. **Database connection issues**: Ensure MongoDB pod is running and accessible
3. **Ingress not working**: Verify NGINX ingress controller is installed and running
4. **Port forwarding issues**: Ensure no other services are using port 8080

### Cleanup

To remove the entire deployment:

```bash
# Delete all resources
kubectl delete namespace shopping-app

# Delete KIND cluster
kind delete cluster --name shopping-app
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please create an issue in the repository or contact the development team.