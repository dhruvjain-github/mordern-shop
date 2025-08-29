# Setup Kind on AWS EC2

## 1. Launch EC2 Instance
- Instance type: t3.medium or larger
- Ubuntu 22.04 LTS
- Security group: Allow SSH (22) and Custom TCP (8080)

## 2. Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install -y docker.io
sudo usermod -aG docker ubuntu
sudo systemctl enable docker
sudo systemctl start docker

# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Install Kind
[ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

# Logout and login again for docker group
exit
```

## 3. Create Kind Cluster

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

## 4. Install NGINX Ingress

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=300s
```

## 5. Deploy Application

```bash
# Clone your repository or upload files
git clone <your-repo>
cd k8s-shopping

# Deploy everything
./deploy.sh
```

## 6. Access Application

The app will be available at: `http://<EC2-PUBLIC-IP>:8080`
