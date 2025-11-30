# Antigravity — Deployment Fix To-Do Checklist

> **Purpose**: Unblock Netlify build, fix root causes, and make deployment stable.

---

## ✅ What Has Been Fixed (Already Done)

- ✅ **Homepage path** changed from `https://MeerAamir.github.io/C_E_M` to `"."` for Netlify root deployment
- ✅ **Node.js version** specified in `package.json` engines field (`>=18.0.0`)
- ✅ **`.nvmrc` file** created with Node 18
- ✅ **CORS configuration** updated for production (GitHub Pages + Netlify)
- ✅ **`_redirects` file** exists for SPA routing  
- ✅ **Build script** verified and working locally
- ✅ **Backend Render.com configuration** complete (needs manual deployment)
- ✅ **Local build test** passed successfully

---

## 🚩 High Priority - Netlify Admin Tasks

### Option 1: Quick Deploy (If Build Still Fails)

If Netlify build still fails, temporarily disable ESLint:

* [ ] Add environment variable in Netlify:
  - Go to: **Site settings → Build & deploy → Environment**
  - Add: `DISABLE_ESLINT_PLUGIN=true`
  - **Why**: This allows build to succeed while you fix code issues

* [ ] Verify Node version:
  - Ensure `NODE_VERSION=18` is set in Netlify environment
  - **Already configured** in `netlify.toml`

* [ ] Trigger deploy:
  - Go to: **Deploys** → **Clear cache and deploy site**

### Option 2: Recommended Deploy (Clean Build)

Since all code fixes are complete, just deploy:

* [ ] Push latest changes (if not already done):
  ```bash
  git push origin main
  ```

* [ ] Monitor Netlify auto-deploy or trigger manually:
  - **Deploys** → **Trigger deploy** or **Clear cache and deploy site**

---

## 🛠 Developer Tasks (Optional - Only If Build Still Fails)

### If Netlify Shows Missing Dependencies

* [ ] Reinstall dependencies locally:
  ```bash
  cd "C:\Users\Meer Aamir\OneDrive\Desktop\Competitive Exam Management System"
  rm -rf client/node_modules client/package-lock.json
  npm install --prefix client
  ```

* [ ] Test build:
  ```bash
  npm run build --prefix client
  ```

* [ ] If successful, commit updated lockfile:
  ```bash
  git add client/package-lock.json
  git commit -m "update client lockfile"
  git push origin main
  ```

### If Missing Webpack/Babel Loaders

* [ ] Install build dependencies (only if error shows):
  ```bash
  npm install --prefix client --save-dev babel-loader html-webpack-plugin webpack-dev-server
  git add client/package.json client/package-lock.json
  git commit -m "add missing webpack build deps"
  git push origin main
  ```

---

## 🔧 ESLint Fixes (If Warnings Appear)

**Note**: Our code review found no unused variables in the mentioned files. But if Netlify shows ESLint warnings:

### Common ESLint Patterns to Fix

**1. Unused Variables**
```js
// Before (error: 'loading' is assigned but never used)
const [loading, setLoading] = useState(false);

// Fix: Use underscore if you only need setter
const [, setLoading] = useState(false);
```

**2. React Hooks Dependencies**
```js
// Before (missing dependency 'search')
useEffect(() => {
  fetchData(search);
}, []); // eslint will complain

// Fix: Add all dependencies
useEffect(() => {
  fetchData(search);
}, [search]); // or wrap fetchData in useCallback
```

**3. Anchor without href**
```js
// Before (jsx-a11y/anchor-is-valid)
<a href="#" onClick={handleClick}>Click</a>

// Fix: Use button instead
<button onClick={handleClick} style={{color: '#4299e1', cursor: 'pointer', background: 'none', border: 'none'}}>
  Click
</button>
```

---

## 📋 Backend Deployment (Render.com)

The backend configuration is complete. Manual steps required:

* [ ] **Create Render account** at https://render.com
* [ ] **Create PostgreSQL database**
* [ ] **Create Web Service** from GitHub repository
* [ ] **Set environment variables** (see `server/.env.example`)
* [ ] **Deploy** and get backend URL
* [ ] **Seed database**: `npm run seed` in Render shell
* [ ] **Update frontend**: Edit `client/.env.production` with Render URL
* [ ] **Recommit and redeploy** frontend

**Full instructions**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 🧪 Testing Checklist

After Netlify deployment succeeds:

* [ ] **Homepage loads**: Visit `https://<your-site>.netlify.app`
* [ ] **Routing works**: Try `/register`, `/login` - should not 404
* [ ] **Refresh works**: Refresh on a route - should stay on that page
* [ ] **Check console**: Open browser DevTools - no CORS errors
* [ ] **API ready**: After backend deployed, test registration/login

---

## 📊 Success Criteria

- ✅ Netlify build succeeds (green checkmark)
- ✅ Site accessible at Netlify URL
- ✅ React Router navigation works
- ✅ Page refreshes don't cause 404
- ✅ No console errors (until backend is deployed)

---

## 🐛 If Build Still Fails - What to Send

If any errors occur, paste these outputs:

1. **Netlify deploy log** (copy the error section)
2. **Local build test** output:
   ```bash
   npm ci --prefix client
   npm run build --prefix client
   ```
3. **Specific error files** mentioned in logs

With these, I can provide exact line-by-line fixes.

---

## 📌 Key Files Modified

| File | Change |
|------|--------|
| `client/package.json` | Homepage: `"."`, Engines: Node >=18 |
| `client/.nvmrc` | Node version: `18` |
| `client/.env.production` | Production API URL placeholder |
| `client/src/pages/Admin/Settings.js` | Dynamic API URL display |
| `server/index.js` | CORS for production domains |
| `netlify.toml` | Build config (already correct) |
| `.gitignore` | Allow .env.production, .nvmrc |

---

## ⚡ Quick Commands Reference

**Test Locally:**
```bash
npm run build --prefix client
```

**Deploy to Netlify:**
```bash
git add .
git commit -m "deployment fixes"
git push origin main
# Netlify auto-deploys
```

**Check Netlify:**
- Dashboard → Deploys → View latest deploy log

**For GitHub Pages** (optional, later):
```bash
# Temporarily change homepage in package.json to:
# "homepage": "https://MeerAamir.github.io/C_E_M"
npm run deploy
# Then change back to "." for Netlify
```

---

## 🔗 Related Documentation

- **Netlify Deployment**: [NETLIFY_FIX.md](./NETLIFY_FIX.md)
- **Backend (Render.com)**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Backend Environment**: [server/.env.example](./server/.env.example)

---

## 💡 Pro Tips

1. **Cache Issues?** Always use "Clear cache and deploy" when testing fixes
2. **Dual Deployment?** Keep homepage as `"."` for Netlify; switch only when deploying to GitHub Pages
3. **Environment Variables**: Update `REACT_APP_API_URL` in Netlify after backend is deployed
4. **ESLint Disabled?** Remove `DISABLE_ESLINT_PLUGIN` from Netlify after code is clean

---

**Status**: Code is ready for deployment. Just push to GitHub and Netlify will deploy automatically! 🚀
