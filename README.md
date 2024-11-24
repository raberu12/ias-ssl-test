# Express.js HTTPS Docker Development Environment

This project sets up a secure HTTPS development environment using Express.js, Docker, and locally-trusted SSL certificates generated with mkcert.

## Prerequisites Installation

### 1. Install Docker Desktop

#### Windows
1. Download Docker Desktop from [Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-windows/)
2. Run the installer
3. Follow the installation wizard
4. Start Docker Desktop from the Start menu

#### macOS
1. Download Docker Desktop from [Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-mac/)
2. Drag Docker to your Applications folder
3. Start Docker Desktop from Applications

#### Linux (Ubuntu/Debian)
```bash
# Remove old versions
sudo apt remove docker docker-engine docker.io containerd runc

# Update package index
sudo apt update

# Install required packages
sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Set up stable repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add your user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker
```

### 2. Install mkcert

#### Windows (with Chocolatey)
```bash
choco install mkcert
```

#### macOS (with Homebrew)
```bash
brew install mkcert
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt install libnss3-tools
curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
chmod +x mkcert-v*-linux-amd64
sudo cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert
```

## Project Setup

### 1. Clone the Repository
```bash
git clone [repository-url]
cd [repository-name]
```

### 2. Generate SSL Certificates
```bash
# Install the local CA
mkcert -install

# Generate certificates
cd certs
chmod +x generate-cert.sh
./generate-cert.sh
```

Verify that the following files are created in the `certs` directory:
- `localhost+1.pem`
- `localhost+1-key.pem`

### 3. Build and Run the Container
```bash
# Build and start the container
docker compose up --build
```

### 4. Access the Application
Open your web browser and navigate to:
```
https://localhost
```

You should see:
- A valid SSL certificate
- The example web page

## Development

### File Structure
```
.
├── Dockerfile
├── docker-compose.yml
├── package.json
├── src
│   ├── index.js
│   └── public
│       └── index.html
└── certs
    └── generate-cert.sh
```

### Making Changes
1. Edit files in the `src` directory
2. Changes will be reflected immediately due to volume mounting
3. If you modify `package.json`, rebuild the container:

```bash
docker compose down
docker compose up --build
```

## Notes
- Certificates are valid for 825 days
- Each developer needs to run `mkcert -install` on their machine
- Firefox may require manual CA import through the certificate manager
- This setup is for development only, not for production use