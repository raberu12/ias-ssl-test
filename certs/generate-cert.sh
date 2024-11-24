#!/bin/bash

# Install mkcert if not already installed
if ! command -v mkcert &> /dev/null; then
    echo "mkcert not found. Please install it."
    exit 1
fi

# Generate and install local CA if not already done
mkcert -install

# Generate certificates for localhost and host.docker.internal
mkcert localhost host.docker.internal
