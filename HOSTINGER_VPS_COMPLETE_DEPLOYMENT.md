# 🚀 Complete Hostinger VPS Deployment Guide

## ✅ Your Current Setup

- **VPS**: Hostinger KVM 1 Plan
- **OS**: AlmaLinux 10 (RHEL-based)
- **SSH**: `ssh root@212.38.94.112`
- **SSL Certificate**: ✅ Already activated
- **Domain**: ✅ Already pointed to VPS
- **Status**: Ready for deployment

---

## 📋 Complete Deployment Checklist

### Phase 1: Server Setup (30-45 minutes)
- [ ] Connect to VPS via SSH
- [ ] Update system packages
- [ ] Install Node.js 18+
- [ ] Install PostgreSQL
- [ ] Install PM2 (Process Manager)
- [ ] Install Nginx (Reverse Proxy)
- [ ] Configure Firewall
- [ ] Setup automatic backups

### Phase 2: Database Setup (15 minutes)
- [ ] Create PostgreSQL database
- [ ] Create database user
- [ ] Test database connection
- [ ] Configure Prisma for PostgreSQL

### Phase 3: Application Deployment (30 minutes)
- [ ] Clone your repository
- [ ] Install dependencies
- [ ] Configure environment variables
- [ ] Build Next.js application
- [ ] Run database migrations
- [ ] Start application with PM2

### Phase 4: Nginx Configuration (20 minutes)
- [ ] Configure Nginx reverse proxy
- [ ] Setup SSL (already done, just verify)
- [ ] Configure domain
- [ ] Test website access

### Phase 5: Final Configuration (15 minutes)
- [ ] Setup monitoring
- [ ] Configure automatic restarts
- [ ] Test payment webhooks
- [ ] Verify Google OAuth
- [ ] Final security checks

---

## 🔧 Phase 1: Server Setup

### Step 1: Connect to Your VPS

```bash
ssh root@212.38.94.112
# Enter your root password when prompted
```

### Step 2: Update System Packages

**Note:** AlmaLinux uses `dnf` (not `apt`)

```bash
# Update package list
dnf update -y

# Install essential tools
dnf install -y curl wget git nano
```

### Step 3: Install Node.js 18+

```bash
# Install Node.js 18.x using NodeSource repository
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
dnf install -y nodejs

# Verify installation
node --version  # Should show v18.x or higher
npm --version
```

### Step 4: Install PostgreSQL

```bash
# Install PostgreSQL 15 (or latest available)
dnf install -y postgresql15-server postgresql15

# Initialize PostgreSQL database
postgresql-15-setup initdb

# Start PostgreSQL service
systemctl start postgresql-15
systemctl enable postgresql-15

# Verify it's running
systemctl status postgresql-15
```

### Step 5: Install PM2 (Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Setup PM2 to start on boot
pm2 startup systemd
# Run the command that PM2 provides

# Save PM2 configuration
pm2 save
```

### Step 6: Install and Configure Nginx

```bash
# Install Nginx
dnf install -y nginx

# Start and enable Nginx
systemctl start nginx
systemctl enable nginx

# Check status
systemctl status nginx
```

### Step 7: Configure Firewall

```bash
# Check if firewalld is installed (it should be)
systemctl status firewalld

# Allow necessary ports
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --permanent --add-service=ssh
firewall-cmd --reload

# Verify firewall rules
firewall-cmd --list-all
```

---

## 🗄️ Phase 2: Database Setup

### Step 1: Create PostgreSQL Database

```bash
# Switch to postgres user
su - postgres

# Access PostgreSQL
psql
```

In PostgreSQL prompt, run:

```sql
-- Create database
CREATE DATABASE whizclub;

-- Create user
CREATE USER whizuser WITH ENCRYPTED PASSWORD 'CREATE_STRONG_PASSWORD_HERE';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE whizclub TO whizuser;

-- Connect to database and grant schema privileges
\c whizclub
GRANT ALL ON SCHEMA public TO whizuser;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO whizuser;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO whizuser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO whizuser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO whizuser;

-- Exit PostgreSQL
\q

-- Exit postgres user
exit
```

**Generate a strong password:**
```bash
openssl rand -base64 32
```

**Save this password!** You'll need it for your `.env` file.

### Step 2: Configure PostgreSQL Access

Edit PostgreSQL configuration for localhost access:

```bash
# Edit pg_hba.conf (use your PostgreSQL version)
nano /var/lib/pgsql/15/data/pg_hba.conf
```

Find and ensure this line exists:
```
host    whizclub    whizuser    127.0.0.1/32    md5
```

Restart PostgreSQL:
```bash
systemctl restart postgresql-15
```

### Step 3: Test Database Connection

```bash
# Test connection (use your password)
psql -h localhost -U whizuser -d whizclub

# If successful, you'll see: whizclub=>
# Type \q to exit
```

---

## 📦 Phase 3: Application Deployment

### Step 1: Clone Your Repository

```bash
# Navigate to web directory
cd /var/www
# or create your preferred directory
mkdir -p /var/www
cd /var/www

# Clone your repository
git clone https://github.com/whizclub/whiz-git.git whizclub

cd whizclub
```

### Step 2: Install Dependencies

```bash
# Install npm packages
npm install

# This may take a few minutes
```

### Step 3: Create Environment File

```bash
# Create .env file
nano .env
```

Add all your environment variables:

```env
# Database - PostgreSQL on VPS
DATABASE_URL="postgresql://whizuser:YOUR_PASSWORD@localhost:5432/whizclub"

# NextAuth Configuration
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# PhonePe Payment Gateway (Production)
PHONEPE_MERCHANT_ID="your-production-merchant-id"
PHONEPE_SALT_KEY="your-production-salt-key"
PHONEPE_SALT_INDEX="1"
PHONEPE_API_URL="https://api.phonepe.com/apis/hermes"

# Node Environment
NODE_ENV="production"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Step 4: Update Prisma Schema

Edit `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")  // Changed from "file:./dev.db"
}

// ... rest of your models stay the same ...
```

### Step 5: Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to PostgreSQL (creates all tables)
npx prisma db push

# OR use migrations for production (recommended)
npx prisma migrate deploy
```

### Step 6: Build Application

```bash
# Build Next.js for production
npm run build
```

### Step 7: Start Application with PM2

```bash
# Start with PM2
pm2 start npm --name "whizclub" -- start

# Or create ecosystem file for better control
nano ecosystem.config.js
```

Add this content:

```javascript
module.exports = {
  apps: [{
    name: 'whizclub',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/whizclub',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
```

Then:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

Check status:
```bash
pm2 status
pm2 logs whizclub
```

---

## 🌐 Phase 4: Nginx Configuration

### Step 1: Configure Nginx Reverse Proxy

```bash
# Create Nginx configuration
nano /etc/nginx/conf.d/whizclub.conf
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Configuration (Hostinger usually configures this)
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    
    # SSL Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to Next.js app
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Increase timeouts for API calls
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
```

**Find your SSL certificate path:**
```bash
# Check Hostinger SSL certificate location
ls -la /etc/ssl/certs/ | grep your-domain
# or check Hostinger control panel for SSL certificate paths
```

### Step 2: Test Nginx Configuration

```bash
# Test Nginx configuration
nginx -t

# If successful, reload Nginx
systemctl reload nginx
```

### Step 3: Verify Website Access

```bash
# Test locally
curl http://localhost:3000

# Check Nginx is serving
curl http://localhost
```

---

## 🔒 Phase 5: Security & Final Configuration

### Step 1: Setup Automatic Backups

Create backup script:

```bash
# Create backup directory
mkdir -p /root/backups

# Create backup script
nano /root/backup-db.sh
```

Add:

```bash
#!/bin/bash
BACKUP_DIR="/root/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/whizclub_backup_$TIMESTAMP.sql"

# Create database backup
sudo -u postgres pg_dump whizclub > $BACKUP_FILE

# Compress backup
gzip $BACKUP_FILE

# Delete backups older than 7 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete

echo "Backup completed: $BACKUP_FILE.gz"
```

Make executable:
```bash
chmod +x /root/backup-db.sh
```

Add to crontab:
```bash
crontab -e
```

Add:
```
0 2 * * * /root/backup-db.sh >> /root/backup.log 2>&1
```

### Step 2: Configure PM2 Auto-Restart

```bash
# Already configured via pm2 startup, but verify
pm2 startup
pm2 save
```

### Step 3: Update Google OAuth Redirect URLs

Go to [Google Cloud Console](https://console.cloud.google.com/):
- Add `https://your-domain.com/api/auth/callback/google` to authorized redirect URIs

### Step 4: Update PhonePe Settings

In PhonePe Merchant Dashboard:
- **Webhook URL**: `https://your-domain.com/api/payment/webhook`
- **Callback URL**: `https://your-domain.com/api/payment/callback`
- Use **Production** credentials (not sandbox)

### Step 5: Final Security Checks

```bash
# Check running services
systemctl status firewalld
systemctl status postgresql-15
systemctl status nginx
pm2 status

# Check open ports
ss -tlnp | grep -E ':(80|443|22|3000|5432)'

# Verify firewall
firewall-cmd --list-all
```

---

## ✅ Verification Checklist

Test everything:

- [ ] Website loads: `https://your-domain.com`
- [ ] SSL certificate valid (green lock in browser)
- [ ] Database connection working (check app logs)
- [ ] User registration works
- [ ] Google OAuth login works
- [ ] Payment flow works (test with sandbox first)
- [ ] Admin panel accessible
- [ ] PM2 keeps app running
- [ ] Nginx serves correctly
- [ ] Database backups working

---

## 🛠️ Useful Commands

### PM2 Management
```bash
pm2 status                 # Check app status
pm2 logs whizclub          # View logs
pm2 restart whizclub       # Restart app
pm2 stop whizclub          # Stop app
pm2 monit                  # Monitor resources
```

### Database Management
```bash
# Connect to database
psql -h localhost -U whizuser -d whizclub

# Backup database
sudo -u postgres pg_dump whizclub > backup.sql

# Check database size
sudo -u postgres psql -c "SELECT pg_size_pretty(pg_database_size('whizclub'));"
```

### Nginx Management
```bash
systemctl status nginx     # Check status
systemctl restart nginx    # Restart
nginx -t                   # Test config
tail -f /var/log/nginx/error.log  # View logs
```

### Application Logs
```bash
pm2 logs whizclub                    # PM2 logs
tail -f /var/www/whizclub/logs/*.log # Custom logs
journalctl -u nginx -f              # Nginx system logs
```

---

## 🚨 Troubleshooting

### App Not Starting
```bash
# Check logs
pm2 logs whizclub

# Check if port 3000 is in use
ss -tlnp | grep 3000

# Restart app
pm2 restart whizclub
```

### Database Connection Issues
```bash
# Check PostgreSQL is running
systemctl status postgresql-15

# Check connection
psql -h localhost -U whizuser -d whizclub

# Check PostgreSQL logs
tail -f /var/lib/pgsql/15/data/log/postgresql-*.log
```

### Nginx 502 Bad Gateway
```bash
# Check if app is running
pm2 status

# Check app logs
pm2 logs whizclub

# Test app directly
curl http://localhost:3000

# Check Nginx error logs
tail -f /var/log/nginx/error.log
```

### SSL Certificate Issues
```bash
# Verify certificate
openssl x509 -in /path/to/certificate.crt -text -noout

# Check certificate expiration
openssl x509 -in /path/to/certificate.crt -noout -dates
```

---

## 📝 Post-Deployment Tasks

1. **Monitor for 24-48 hours** - Watch logs, CPU, memory usage
2. **Test all features** - User flow, payments, OAuth
3. **Setup monitoring** - Consider PM2 Plus or custom monitoring
4. **Document credentials** - Save passwords securely
5. **Regular backups** - Verify backups are working
6. **Security updates** - Schedule regular system updates

---

## 🎉 You're Done!

Your application should now be live at `https://your-domain.com`

**Summary:**
- ✅ VPS configured and secured
- ✅ PostgreSQL database setup
- ✅ Application deployed and running
- ✅ Nginx reverse proxy configured
- ✅ SSL certificate active
- ✅ Automatic backups configured

**Next Steps:**
1. Test all features thoroughly
2. Monitor server resources
3. Setup alerts for downtime
4. Regular maintenance (updates, backups)

Need help? Check the troubleshooting section or the logs!

