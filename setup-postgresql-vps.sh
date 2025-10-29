#!/bin/bash

# VPS PostgreSQL Setup Script
# This script helps you setup PostgreSQL on your VPS

echo "🗄️  PostgreSQL Setup for VPS"
echo "=============================="
echo ""

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then 
    echo "❌ Please run as root or with sudo"
    exit 1
fi

# Step 1: Install PostgreSQL
echo "📦 Step 1: Installing PostgreSQL..."
apt update
apt install postgresql postgresql-contrib -y

# Start and enable PostgreSQL
systemctl start postgresql
systemctl enable postgresql

echo "✅ PostgreSQL installed and started"
echo ""

# Step 2: Create database and user
echo "📝 Step 2: Creating database and user..."
echo ""
read -p "Enter database name (default: whizclub): " DB_NAME
DB_NAME=${DB_NAME:-whizclub}

read -p "Enter database user (default: whizuser): " DB_USER
DB_USER=${DB_USER:-whizuser}

read -sp "Enter database password: " DB_PASSWORD
echo ""

# Generate connection string
DB_URL="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}"

echo ""
echo "🔐 Creating database and user..."

# Create database and user via psql
sudo -u postgres psql <<EOF
CREATE DATABASE ${DB_NAME};
CREATE USER ${DB_USER} WITH ENCRYPTED PASSWORD '${DB_PASSWORD}';
GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};
\c ${DB_NAME}
GRANT ALL ON SCHEMA public TO ${DB_USER};
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ${DB_USER};
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ${DB_USER};
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ${DB_USER};
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO ${DB_USER};
\q
EOF

echo "✅ Database and user created"
echo ""

# Step 3: Configure firewall
echo "🛡️  Step 3: Configuring firewall..."
ufw allow 22/tcp   # SSH
ufw allow 80/tcp   # HTTP
ufw allow 443/tcp  # HTTPS
# Don't allow external access to PostgreSQL (security)
echo "✅ Firewall configured (PostgreSQL only accessible locally)"
echo ""

# Step 4: Display connection string
echo "✅ Setup Complete!"
echo ""
echo "📋 Your Database Connection String:"
echo "===================================="
echo "DATABASE_URL=\"${DB_URL}\""
echo ""
echo "💾 Save this to your .env file on your VPS:"
echo "echo 'DATABASE_URL=\"${DB_URL}\"' >> .env"
echo ""
echo "🔧 Next Steps:"
echo "1. Update prisma/schema.prisma to use PostgreSQL"
echo "2. Run: npx prisma generate"
echo "3. Run: npx prisma db push"
echo ""
echo "📚 For detailed instructions, see: VPS_POSTGRESQL_SETUP_GUIDE.md"

