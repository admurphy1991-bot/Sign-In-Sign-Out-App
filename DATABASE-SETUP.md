# DATABASE SETUP INSTRUCTIONS

## IMPORTANT: Follow these steps to enable permanent data storage!

Your visitor data will now be stored in a PostgreSQL database instead of a file. This means **data will persist even when you update the code**.

---

## Step 1: Upload the New Code to GitHub

1. Download the ZIP file: `site-visitor-system-database.zip`
2. Extract it
3. Go to: https://github.com/admurphy1991-bot/Sign-In-Sign-Out-App
4. Click "Add file" → "Upload files"
5. Drag all files (server.js, package.json, public folder, README.md)
6. Commit changes

---

## Step 2: Add PostgreSQL Database to Railway

1. Go to your Railway dashboard: https://railway.app/dashboard
2. Click on your project: "Sign-In-Sign-Out-App"
3. Click the **"+ New"** button
4. Select **"Database"**
5. Choose **"Add PostgreSQL"**
6. Railway will create a database (takes 30 seconds)

---

## Step 3: Connect Database to Your App

Railway should automatically connect them, but to verify:

1. Click on your **"Sign-In-Sign-Out-App"** service (not the database)
2. Go to the **"Variables"** tab
3. You should see a variable called **DATABASE_URL** - this was auto-added by Railway
4. If you don't see it, Railway will add it automatically when it detects the PostgreSQL dependency

---

## Step 4: Redeploy

Railway will automatically redeploy your app when it detects the new code from GitHub. This takes 2-3 minutes.

Watch the deploy logs - you should see: "✅ Database table initialized"

---

## Step 5: Test It!

1. Go to your site: https://sign-in-sign-out-app-production.up.railway.app
2. Sign in a test visitor
3. Check the register - the visitor should be there
4. Now, to test persistence: Go back to GitHub and make a tiny change (like changing the header color)
5. Upload the change to GitHub
6. Railway will redeploy
7. Check your site again - **the test visitor should still be there!**

---

## What's Changed?

✅ **Before:** Data stored in `visitors.json` file → wiped on every deploy
✅ **After:** Data stored in PostgreSQL database → persists forever

---

## Cost Impact

PostgreSQL on Railway's free tier includes:
- 512MB storage (plenty for thousands of visitor records)
- Included in your $5/month free credit

You won't see additional charges unless you exceed the free tier limits.

---

## Backup Recommendation

Even with database persistence, still download CSV exports monthly as a backup!

---

## Troubleshooting

**App won't start after adding database?**
- Check Railway deploy logs for errors
- Make sure DATABASE_URL variable exists in your service

**Can't see DATABASE_URL variable?**
- Railway auto-adds it when you add PostgreSQL to the project
- If missing, you can manually add it from the PostgreSQL service settings

**Need help?**
Take a screenshot of your Railway dashboard and share it!
