# ✅ Google OAuth Setup Checklist

Use this checklist to set up Google authentication for WhizClub:

## 📋 Pre-Setup
- [ ] You have a Google account
- [ ] Your development server is running (`npm run dev`)

---

## 🔧 Setup Steps

### 1. Google Cloud Console Setup
- [ ] Go to https://console.cloud.google.com
- [ ] Create new project named "WhizClub"
- [ ] Enable Google+ API or Google Identity Services

### 2. OAuth Consent Screen
- [ ] Click "OAuth consent screen" in sidebar
- [ ] Select "External"
- [ ] Fill in App name: "WhizClub"
- [ ] Add your email as user support
- [ ] Add scopes: `email`, `profile`, `openid`
- [ ] Add yourself as test user

### 3. Create Credentials
- [ ] Click "Credentials" in sidebar
- [ ] Click "+ CREATE CREDENTIALS"
- [ ] Select "OAuth client ID"
- [ ] Application type: "Web application"
- [ ] Add JavaScript origin: `http://localhost:3000`
- [ ] Add redirect URI: `http://localhost:3000/api/auth/callback/google`
- [ ] Click "CREATE"
- [ ] **COPY** your Client ID
- [ ] **COPY** your Client Secret

### 4. Configure Your Project
- [ ] Create `.env.local` file in project root
- [ ] Paste this content:
  ```bash
  NEXTAUTH_URL="http://localhost:3000"
  NEXTAUTH_SECRET="whizclub-secret-key-2024"
  GOOGLE_CLIENT_ID="[YOUR_CLIENT_ID]"
  GOOGLE_CLIENT_SECRET="[YOUR_CLIENT_SECRET]"
  ```
- [ ] Replace `[YOUR_CLIENT_ID]` with actual Client ID
- [ ] Replace `[YOUR_CLIENT_SECRET]` with actual Client Secret
- [ ] Save the file

### 5. Restart Server
- [ ] Stop server (Ctrl+C in terminal)
- [ ] Start server: `npm run dev`
- [ ] Wait for "Ready in X.Xs" message

### 6. Test Login
- [ ] Open browser: http://localhost:3000/login
- [ ] Click "Sign in with Google"
- [ ] Select your Google account
- [ ] Grant permissions
- [ ] Verify you're redirected to dashboard

### 7. Make Yourself Admin (Optional)
- [ ] Run: `npx prisma studio`
- [ ] Open "User" table
- [ ] Find your email
- [ ] Change `role` from "USER" to "ADMIN"
- [ ] Save
- [ ] Logout and login again
- [ ] Verify you can access `/admin`

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ Login page shows Google Sign-In button
- ✅ Clicking it opens Google's consent screen
- ✅ After approving, you're redirected to dashboard
- ✅ Your profile picture shows in header
- ✅ No error messages in browser console

---

## 🚨 If Something Goes Wrong

### Error: "redirect_uri_mismatch"
**Fix:** Check redirect URI is exactly `http://localhost:3000/api/auth/callback/google`

### Error: "Access blocked"
**Fix:** Add yourself as test user in Google Console

### Error: "OAuthAccountNotLinked"
**Fix:** Check `.env.local` has correct credentials and restart server

### Login button does nothing
**Fix:** Check browser console for errors, verify credentials in `.env.local`

---

## 📚 Need More Help?

- **Detailed guide:** See `HOW_TO_GET_GOOGLE_OAUTH.md`
- **Full documentation:** See `GOOGLE_OAUTH_COMPLETE.md`
- **Quick start:** See `QUICK_START_GOOGLE_AUTH.md`

---

## ✨ What You Get

After setup:
- 🔐 Secure Google authentication
- 👤 Automatic user creation
- 🖼️ Profile pictures from Google
- 📧 Email verification (via Google)
- 🚀 No password management needed
- ✅ One-click login for returning users

**Good luck! You've got this!** 🎉

