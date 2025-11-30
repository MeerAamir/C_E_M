# Deployment Guide: Competitive Exam Management System

This guide will walk you through deploying the backend to Render.com and updating the frontend.

## 📦 Step 1: Commit and Push Your Changes

First, commit all the configuration changes we just made:

```bash
git add .
git commit -m "Configure backend for Render deployment with PostgreSQL and CORS"
git push origin main
```

## 🚀 Step 2: Deploy Backend to Render.com

### Option A: Using Render Dashboard (Recommended)

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub (it's free)

2. **Create PostgreSQL Database**
   - Click "New +" → "PostgreSQL"
   - Name: `competitive-exam-db`
   - Region: Oregon (Free)
   - Plan: Free
   - Click "Create Database"
   - **Save the connection details** (you'll need them)

3. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Settings:
     - **Name:** `competitive-exam-backend`
     - **Region:** Oregon (Free)
     - **Branch:** main
     - **Root Directory:** `server`
     - **Runtime:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free

4. **Configure Environment Variables**
   Click "Environment" tab and add:
   ```
   NODE_ENV=production
   JWT_SECRET=<generate a random 32-character string>
   DB_DIALECT=postgres
   DB_NAME=<from PostgreSQL connection details>
   DB_USER=<from PostgreSQL connection details>
   DB_PASS=<from PostgreSQL connection details>
   DB_HOST=<from PostgreSQL connection details>
   ```

   **To generate JWT_SECRET:** Run this in your terminal:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - You'll get a URL like: `https://competitive-exam-backend.onrender.com`

6. **Verify Backend is Running**
   - Visit your Render URL in browser
   - You should see: "Competitive Exam System API is running"

### Option B: Using render.yaml (Automatic)

1. The `render.yaml` file is already configured
2. Go to Render dashboard → "Blueprints" → "New Blueprint Instance"
3. Connect your GitHub repository
4. Render will automatically create both database and web service
5. Add JWT_SECRET manually in the web service environment variables

## 🗄️ Step 3: Seed the Database

Once backend is deployed:

1. In Render Dashboard, go to your web service
2. Click "Shell" tab (top right)
3. Run:
   ```bash
   npm run seed
   ```
4. You should see "Database seeded successfully!"

## 🎨 Step 4: Update Frontend with Backend URL

1. **Get your backend URL** from Render (e.g., `https://competitive-exam-backend.onrender.com`)

2. **Update `.env.production` file:**
   ```bash
   # Open client/.env.production
   # Replace PLACEHOLDER_RENDER_URL with your actual Render URL
   REACT_APP_API_URL=https://competitive-exam-backend.onrender.com
   ```

3. **Commit the change:**
   ```bash
   git add client/.env.production
   git commit -m "Update production API URL to Render backend"
   git push origin main
   ```

## 🌐 Step 5: Deploy Frontend to GitHub Pages

From the project root directory:

```bash
npm run deploy
```

This will:
- Build the production frontend with the correct API URL
- Deploy to GitHub Pages at https://meeraamir.github.io/C_E_M/

**Wait 2-3 minutes** for GitHub Pages to update.

## ✅ Step 6: Test Online

1. **Visit:** https://meeraamir.github.io/C_E_M/

2. **Test Registration:**
   - Go to Register page
   - Create a new account
   - Open browser DevTools → Network tab
   - Verify API calls go to your Render URL (not localhost)

3. **Test Login:**
   - Login with your new account
   - Verify dashboard loads

4. **Test Exams:**
   - Navigate to available exams
   - Take an exam
   - Submit answers
   - Check results

5. **Check for Errors:**
   - Open browser Console (F12)
   - Should have NO CORS errors
   - Should have NO "Failed to fetch" errors

## 🎯 Final Deliverables

Once everything is working:

✅ **Backend URL:** `https://competitive-exam-backend.onrender.com`  
✅ **Frontend URL:** `https://meeraamir.github.io/C_E_M/`  
✅ **Registration:** Working online  
✅ **Login:** Working online  
✅ **Exams:** Working online  
✅ **Admin:** Working online  

## 🐛 Troubleshooting

### Issue: "Failed to fetch" errors
- Check backend is running on Render
- Verify `.env.production` has correct URL
- Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue: CORS errors
- Verify CORS configuration in `server/index.js`
- Make sure GitHub Pages URL is in the allowed origins
- Redeploy backend after CORS changes

### Issue: Database connection errors
- Check PostgreSQL is running on Render
- Verify environment variables are correct
- Check Render logs for detailed error messages

### Issue: 404 on GitHub Pages
- Make sure `homepage` in `client/package.json` is correct
- Run `npm run deploy` again
- Wait 2-3 minutes for propagation

## 📞 Need Help?

Check Render logs:
- Go to Render Dashboard → Your Web Service → Logs

Check GitHub Pages status:
- Go to GitHub repo → Settings → Pages

---

**Note:** Render free tier may **sleep after 15 minutes of inactivity**. First request after sleep takes ~30 seconds to wake up. This is normal for free tier.
