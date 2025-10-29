# 🎯 Final Setup Steps - You're 90% Done!

## ✅ What You've Completed:
- ✅ Google OAuth client created and saved
- ✅ Redirect URI configured: `http://localhost:3000/api/auth/callback/google`
- ✅ NEXTAUTH_SECRET generated

## 📝 What You Need to Do Now:

### Step 1: Get Your Google Credentials (2 minutes)

1. **In Google Cloud Console:**
   - If you see a popup with credentials → **COPY BOTH IMMEDIATELY**
   - OR go to "Credentials" in sidebar → Click "Web client 1"

2. **Copy these two values:**
   ```
   Client ID: [ends with .apps.googleusercontent.com]
   Client Secret: [starts with GOCSPX-]
   ```
   
   ⚠️ **IMPORTANT:** Client Secret is only shown once! Copy it NOW!

### Step 2: Create .env.local File (1 minute)

1. **Copy the template file:**
   - I've created `.env.local.template` for you
   - Copy it and rename to `.env.local` (remove `.template`)

2. **OR create manually:**
   - Create new file named `.env.local` in your project root
   - Copy this content:

```bash
# Database (for development)
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="MZj5dCiOdFTGqZW25sOsnmcqLtRQON/3vbbmWr6D670="

# Google OAuth Credentials
# ⚠️ REPLACE THESE WITH YOUR ACTUAL CREDENTIALS
GOOGLE_CLIENT_ID="[YOUR_CLIENT_ID]"
GOOGLE_CLIENT_SECRET="[YOUR_CLIENT_SECRET]"

# PhonePe Payment Gateway (Test - already working)
PHONEPE_MERCHANT_ID="PGTESTPAYUAT"
PHONEPE_SALT_KEY="099eb0cd-02cf-4e2a-8aca-3e6c6aff0399"
PHONEPE_SALT_INDEX="1"
PHONEPE_API_URL="https://api-preprod.phonepe.com/apis/pg-sandbox"
```

3. **Replace the placeholders:**
   - Replace `paste-your-client-id-here` with your actual Client ID
   - Replace `paste-your-client-secret-here` with your actual Client Secret

### Step 3: Restart Server & Test (2 minutes)

1. **Stop your current server** (if running):
   - Press `Ctrl+C` in terminal

2. **Start the server:**
   ```bash
   npm run dev
   ```

3. **Test Google Login:**
   - Open: http://localhost:3000/login
   - Click **"Sign in with Google"** button
   - Select your Google account
   - Click "Continue"
   - ✅ Should redirect you to homepage!

---

## ✅ Success Checklist

After completing these steps:
- [ ] Client ID copied from Google Console
- [ ] Client Secret copied from Google Console  
- [ ] `.env.local` file created in project root
- [ ] Client ID added to `.env.local`
- [ ] Client Secret added to `.env.local`
- [ ] Server restarted
- [ ] Google login tested successfully
- [ ] User created in database automatically
- [ ] Redirected to homepage after login

---

## 🚨 Troubleshooting

### "redirect_uri_mismatch" Error
- **Fix:** In Google Console, make sure redirect URI is exactly:
  - `http://localhost:3000/api/auth/callback/google`
  - No trailing slash, exact match!

### "Invalid client" Error
- **Fix:** Check that Client ID and Secret are correct
- Make sure no extra spaces in `.env.local`
- Restart server after updating `.env.local`

### Button Doesn't Work
- **Fix:** Check browser console (F12) for errors
- Verify `.env.local` file exists and has correct values
- Make sure server restarted after adding credentials

### Can't Find Client Secret
- **Fix:** If you lost it, create new OAuth client:
  1. Go to Credentials → Click three dots (⋮) next to client
  2. Delete or reset
  3. Create new OAuth client
  4. **Copy BOTH credentials immediately this time!**

---

## 🎉 You're Almost There!

Once you:
1. ✅ Copy credentials from Google Console
2. ✅ Add them to `.env.local`
3. ✅ Restart server

**Your Google authentication will be LIVE!** 🚀

**Let me know when you've added the credentials and we can test it together!**



