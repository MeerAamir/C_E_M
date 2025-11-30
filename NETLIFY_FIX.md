# Netlify Deployment Fix Guide

## ✅ Issues Identified and Fixed

### Problem
Netlify builds were failing with "Build script returned non-zero exit code: 2" even though the app works locally and on GitHub Pages.

### Root Cause
The `client/package.json` had `"homepage": "https://MeerAamir.github.io/C_E_M"` which is specific to GitHub Pages subdirectory deployment. Netlify serves from root, so this caused build path issues.

### Solutions Applied

1. **Updated `client/package.json`**:
   - Changed `"homepage"` from `"https://MeerAamir.github.io/C_E_M"` to `"."`  (relative path for Netlify)
   - Added `"engines": { "node": ">=18.0.0" }` to specify Node.js version

2. **Verified Existing Configuration**:
   - ✅ `netlify.toml` already correct with:
     - `base = "client"`
     - `command = "npm run build"`
     - `publish = "build"`
     - `NODE_VERSION = "18"`
   - ✅ `client/public/_redirects` exists with `/* /index.html 200` for SPA routing
   - ✅ `client/package.json` has correct build script: `"build": "react-scripts build"`
   - ✅ All dependencies are in correct sections
   - ✅ Local build test passed successfully

---

## 🚀 Deployment Instructions

### Step 1: Commit and Push Changes

```bash
git add .
git commit -m "Fix Netlify deployment: update homepage for root path deployment"
git push origin main
```

### Step 2: Deploy to Netlify

#### Option A: Automatic Deploy (if connected to GitHub)
Netlify will automatically detect the push and start a new deploy.

#### Option B: Manual Deploy via Netlify Dashboard
1. Go to your Netlify site dashboard
2. Click **"Deploys"** → **"Clear cache and deploy site"**
3. Wait for build to complete (~2-3 minutes)

### Step 3: Verify Environment Variables in Netlify

Go to **Site Settings** → **Build & deploy** → **Environment variables** and ensure:

| Variable | Value |
|----------|-------|
| `NODE_VERSION` | `18` |
| `REACT_APP_API_URL` | `<your-render-backend-url>` or `PLACEHOLDER_RENDER_URL` for now |

> **Note**: The `REACT_APP_API_URL` should be updated once you deploy the backend to Render.com

### Step 4: Check Build Logs

If the build succeeds, you should see:
```
Building static site...
Creating an optimized production build...
Compiled successfully.
Deploy succeeded!
```

---

## 📋 Complete Netlify Site Settings

Here's what your Netlify configuration should look like:

**Build Settings:**
- **Base directory:** `client`
- **Build command:** `npm run build`
- **Publish directory:** `client/build`
- **Branch:** `main`

**Environment Variables:**
```
NODE_VERSION=18
REACT_APP_API_URL=<your-backend-url-when-ready>
```

**Deploy Context:**
- **Production branch:** `main`

---

## ⚠️ Important Notes for Dual Deployment (GitHub Pages + Netlify)

Since you want to deploy to **both** GitHub Pages and Netlify, we've set the homepage to relative path (`.`). Here's what this means:

### For Netlify Deployment:
- ✅ Works perfectly with `"homepage": "."`
- ✅ Netlify serves from root domain (e.g., `https://your-site.netlify.app`)

### For GitHub Pages Deployment:
When deploying to GitHub Pages, you'll need to temporarily change the homepage:

**Before running `npm run deploy` for GitHub Pages:**
```bash
# Edit client/package.json
# Change: "homepage": "."
# To: "homepage": "https://MeerAamir.github.io/C_E_M"

npm run deploy

# Then change it back to "." and commit
```

**OR** create a GitHub Actions workflow to automate this (recommended for future).

---

## 🧪 Testing the Netlify Deployment

Once deployed, test these features:

1. **Direct URL Access**
   - Visit: `https://your-site.netlify.app`
   - Should load the homepage

2. **SPA Routing**
   - Visit: `https://your-site.netlify.app/register`
   - Should load registration page (not 404)
   - Refresh the page - should still work (tests `_redirects` file)

3. **API Calls** (after backend is deployed)
   - Register a new account
   - Login
   - Test exam functionality
   - Check browser console for CORS or API errors

4. **Environment Variables**
   - Go to Admin → Settings page
   - Check that "API Base URL" shows the correct backend URL

---

## 🐛 Troubleshooting

### Build Still Fails on Netlify

**Check these in order:**

1. **View Deploy Log**
   - Go to Deploys → Click failed deploy → View full log
   - Look for the **first error message**

2. **Common Errors:**

   **Error: "Module not found: Can't resolve 'X'"**
   ```bash
   # Run locally:
   npm install <missing-package> --prefix client --save
   git add . && git commit -m "Add missing dependency" && git push
   ```

   **Error: "Command failed with exit code 1"**
   - Check that Node version matches (18)
   - Clear Netlify cache and redeploy

   **Error: "Permission denied" or "EACCES"**
   - Clear Netlify cache
   - Check `.npmrc` if it exists

3. **Test Locally First**
   ```bash
   # Always test before pushing:
   npm run build --prefix client
   
   # Should show "Compiled successfully"
   ```

### Homepage Path Issues

If assets aren't loading (404 for CSS/JS):
- Verify `homepage` is `"."`  in `client/package.json`
- Check Netlify publish directory is `client/build`

### Redirects Not Working

If refreshing a route gives 404:
- Verify `client/public/_redirects` exists
- Content should be: `/*    /index.html   200`
- File should be copied to build folder automatically

---

## 📊 Expected Results

After successful deployment:

✅ **Netlify URL:** `https://your-site-name.netlify.app`  
✅ **Build Status:** Success (green checkmark)  
✅ **Homepage loads:** ✓  
✅ **Routes work:** ✓ (register, login, dashboard, etc.)  
✅ **Refresh works:** ✓ (SPA redirects working)  
✅ **API calls:** Will work once backend is deployed  

---

## 🔗 Next Steps

After Netlify deployment succeeds:

1. ✅ Netlify frontend is live
2. ⏳ Deploy backend to Render.com (see [DEPLOYMENT_GUIDE.md](file:///C:/Users/Meer%20Aamir/OneDrive/Desktop/Competitive%20Exam%20Management%20System/DEPLOYMENT_GUIDE.md))
3. ⏳ Update `client/.env.production` with Render backend URL
4. ⏳ Redeploy Netlify to use the backend URL
5. ⏳ Test end-to-end functionality

---

**Note:** The changes made are backward compatible. Local development (`npm start`) still works perfectly!
