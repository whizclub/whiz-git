# ⚡ Hostinger VPS Quick Start (AlmaLinux 10)

## 🎯 Fast Deployment Commands

Your VPS: `ssh root@212.38.94.112`
OS: AlmaLinux 10 (uses `dnf`, not `apt`)

---

## 📦 Step 1: Install Everything (15 minutes)

```bash
# 1. Update system
dnf update -y
dnf install -y curl wget git nano

# 2. Install Node.js 18
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
dnf install -y nodejs

# 3. Install PostgreSQL
dnf install -y postgresql15-server postgresql15
postgresql-15-setup initdb
systemctl start postgresql-15
systemctl enable postgresql-15

# 4. Install PM2
npm install -g pm2

# 5. Install Nginx
dnf install -y nginx
systemctl start nginx
systemctl enable nginx

# 6. Configure Firewall
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --permanent --add-service=ssh
firewall-cmd --reload
```

---

## 🗄️ Step 2: Setup Database (5 minutes)

```bash
# Create database and user
su - postgres
psql
```

In PostgreSQL:
```sql
CREATE DATABASE whizclub;
CREATE USER whizuser WITH ENCRYPTED PASSWORD 'YOUR_STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE whizclub TO whizuser;
\c whizclub
GRANT ALL ON SCHEMA public TO whizuser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO whizuser;
\q
exit
```

**Generate password:**
```bash
openssl rand -base64 32
```

---

## 📱 Step 3: Deploy Application (10 minutes)

```bash
# Navigate to web directory
cd /var/www
git clone https://github.com/whizclub/whiz-git.git whizclub
cd whizclub

# Install dependencies
npm install

# Create .env file
nano .env
```

**Add to .env:**
```env
DATABASE_URL="postgresql://whizuser:YOUR_PASSWORD@localhost:5432/whizclub"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NODE_ENV="production"
# Add all other env vars...
```

**Continue:**
```bash
# Update prisma/schema.prisma to use PostgreSQL
nano prisma/schema.prisma
# Change: provider = "postgresql"

# Setup database
npx prisma generate
npx prisma db push

# Build app
npm run build

# Start with PM2
pm2 start npm --name "whizclub" -- start
pm2 save
pm2 startup
```

---

## 🌐 Step 4: Configure Nginx (5 minutes)

```bash
nano /etc/nginx/conf.d/whizclub.conf
```

**Add:**
```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL (Hostinger configures this - check your certificate paths)
    ssl_certificate /etc/ssl/certs/your-cert.crt;
    ssl_certificate_key /etc/ssl/private/your-key.key;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
nginx -t
systemctl reload nginx
```

---

## ✅ Done!

Your app should be live at `https://your-domain.com`

**Check status:**
```bash
pm2 status
systemctl status nginx
systemctl status postgresql-15
```

**View logs:**
```bash
pm2 logs whizclub
```

---

📖 **For detailed instructions**, see: `HOSTINGER_VPS_COMPLETE_DEPLOYMENT.md`

