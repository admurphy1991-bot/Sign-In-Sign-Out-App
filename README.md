# Site Visitor Management System
**Sansoms @ Orams Refurbishment Project** 

A simple, multi-device visitor sign in/out system with QR code support.

## Features
- ✅ Multi-device access (tablets, phones, computers)
- ✅ QR code for easy sign-in
- ✅ Real-time visitor tracking
- ✅ CSV export for records
- ✅ No database required (uses JSON file)

## Quick Start

### Option 1: Run on Your Computer (Easiest for Testing)

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Choose the LTS version

2. **Extract these files** to a folder

3. **Open Terminal/Command Prompt** in that folder

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Start the server:**
   ```bash
   npm start
   ```

6. **Access the system:**
   - On the same computer: http://localhost:3000
   - From other devices: http://YOUR-COMPUTER-IP:3000
   
   To find your computer's IP address:
   - **Windows**: Open Command Prompt, type `ipconfig`, look for "IPv4 Address"
   - **Mac**: System Preferences → Network → look for IP address
   - **Linux**: Type `ip addr show` in terminal

## Accessing from Multiple Devices

Once the server is running:

1. **Find your server's IP address** (e.g., 192.168.1.100)
2. **On any device on the same WiFi network**, open a browser and go to:
   ```
   http://192.168.1.100:3000
   ```
3. **Print the QR code** (from the QR Code tab) and post it at the site entrance

## Option 2: Deploy to a Cloud Service (For Production Use)

For a more permanent solution, you can deploy this to a free cloud service:

### Deploy to Render (Free Tier Available)

1. Create a free account at https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository (upload these files to GitHub first)
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Deploy - you'll get a permanent URL like `https://your-app.onrender.com`

### Deploy to Railway (Free Tier Available)

1. Create account at https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Railway auto-detects Node.js and deploys
5. Get your permanent URL

## Files Included

- `server.js` - Node.js backend server
- `public/index.html` - Frontend web interface
- `package.json` - Dependencies
- `visitors.json` - Data storage (auto-created)

## Data Storage

All visitor data is stored in `visitors.json` in the same folder as the server. This file is automatically created and updated.

To backup your data, simply copy the `visitors.json` file.

## Security Notes

- This is designed for internal network use
- For internet-facing deployment, consider adding password protection
- Data is stored in plain text - suitable for visitor logs, not sensitive information

## Troubleshooting

**Can't access from other devices?**
- Make sure all devices are on the same WiFi network
- Check firewall settings allow port 3000
- Verify you're using the correct IP address

**Server won't start?**
- Make sure port 3000 isn't already in use
- Check Node.js is properly installed
- Run `npm install` again

**QR code not working?**
- Make sure the URL in the QR code matches your server's IP
- If you change networks, you'll need to regenerate the QR code

## Support

For issues or questions, contact your IT department or the person who set this up.

---
Built for Sansoms - Orams Refurbishment Project
