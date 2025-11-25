# 🚀 Deployment Guide - KabutarMedia

## Option 1: Deploy to Vercel (Recommended)

Vercel is the fastest and easiest way to deploy Next.js apps.

### Steps:

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/kabutarmedia-next-1
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the project

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add the following from `.env.local`:
     ```
     MONGODB_URI = your_mongodb_connection_string
     NEXT_PUBLIC_SITE_URL = https://yourdomain.com
     CONTACT_EMAIL = your@email.com
     ```

4. **Deploy**
   - Click "Deploy"
   - Your site is live! 🎉

### Auto-Deploy on Push
After connecting to GitHub, every push to `main` automatically deploys.

---

## Option 2: Deploy to Netlify

### Steps:

1. **Push code to GitHub** (same as above)

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select GitHub repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Add Environment Variables**
   - Go to Site settings → Build & deploy → Environment
   - Add your variables

5. **Deploy**
   - Click "Deploy site"

---

## Option 3: Deploy to AWS

### Using AWS Amplify

1. **Connect AWS Amplify**
   - Go to AWS Amplify console
   - Click "New app" → "Host web app"
   - Select GitHub and connect

2. **Configure Build Settings**
   ```yaml
   version: 1
   env:
     MONGODB_URI: $MONGODB_URI
     NEXT_PUBLIC_SITE_URL: $NEXT_PUBLIC_SITE_URL
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
       postBuild:
         commands: []
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Set Environment Variables**
   - App settings → Environment variables
   - Add your variables

---

## Option 4: Deploy with Docker to Google Cloud Run

### 1. Create Dockerfile

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### 2. Build & Push Docker Image

```bash
docker build -t gcr.io/your-project/kabutarmedia:latest .
docker push gcr.io/your-project/kabutarmedia:latest
```

### 3. Deploy to Cloud Run

```bash
gcloud run deploy kabutarmedia \
  --image gcr.io/your-project/kabutarmedia:latest \
  --platform managed \
  --region us-central1 \
  --set-env-vars MONGODB_URI=$MONGODB_URI,NEXT_PUBLIC_SITE_URL=$SITE_URL
```

---

## Option 5: Deploy to DigitalOcean App Platform

### 1. Push to GitHub

```bash
git push origin main
```

### 2. Create DigitalOcean App

- Go to [digitalocean.com](https://digitalocean.com)
- Click "Create" → "App"
- Select GitHub repository
- Choose `main` branch

### 3. Configure Build Settings

- Build command: `npm run build`
- Run command: `npm start`
- HTTP Port: `3000`

### 4. Add Environment Variables

- Add all variables from `.env.local`

### 5. Deploy

Click "Deploy"

---

## Option 6: Self-Hosted (VPS/Dedicated Server)

### Using Ubuntu Server with Nginx & PM2

1. **SSH into your server**

```bash
ssh root@your-server-ip
```

2. **Install Node.js & npm**

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install MongoDB** (optional if using MongoDB Atlas)

```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

4. **Clone Repository**

```bash
cd /var/www
git clone https://github.com/yourusername/kabutarmedia-next-1.git
cd kabutarmedia-next-1
```

5. **Install Dependencies**

```bash
npm install
```

6. **Create .env.local**

```bash
cat > .env.local << EOF
MONGODB_URI=your_mongodb_uri
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
CONTACT_EMAIL=your@email.com
EOF
```

7. **Build Application**

```bash
npm run build
```

8. **Install PM2** (process manager)

```bash
sudo npm install -g pm2
pm2 start npm --name "kabutarmedia" -- start
pm2 startup
pm2 save
```

9. **Configure Nginx**

```bash
sudo apt-get install -y nginx

cat > /etc/nginx/sites-available/kabutarmedia << EOF
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/kabutarmedia /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

10. **Setup SSL with Let's Encrypt**

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Performance Optimization

### 1. Enable Caching

Add to `next.config.ts`:

```javascript
headers: async () => [
  {
    source: '/(.*)',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    ],
  },
],
```

### 2. Use CDN (CloudFlare)

- Add your domain to CloudFlare
- Enable caching rules
- Set TTL to 24 hours for static assets

### 3. Image Optimization

Use Cloudinary for image transformations:

```javascript
const cloudinaryUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/w_800,h_400,c_fill,f_auto/${imageUrl}`;
```

---

## Monitoring & Analytics

### Google Analytics

1. Add to `app/layout.tsx`:

```jsx
import Script from "next/script";

<Script
  strategy="afterInteractive"
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
/>
<Script
  id="google-analytics"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
    `,
  }}
/>
```

### Sentry Error Tracking

1. Install Sentry:
   ```bash
   npm install @sentry/nextjs
   ```

2. Add `.env.local`:
   ```
   SENTRY_AUTH_TOKEN=your_token
   ```

3. Initialize in `next.config.ts`

---

## Maintenance

### Update Dependencies

```bash
npm update
npm audit fix
```

### Backup Database

```bash
# MongoDB Atlas automatically backs up
# For self-hosted MongoDB:
mongodump --out /backups/kabutarmedia-$(date +%Y%m%d)
```

### Monitor Logs

```bash
# PM2 logs
pm2 logs kabutarmedia

# Nginx logs
tail -f /var/log/nginx/error.log
```

---

## Troubleshooting Deployment

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Database Connection Error
```bash
# Check MongoDB URI
# Verify IP whitelist in MongoDB Atlas
# Test connection: npm run test:db
```

### Memory Issues
```bash
# Increase Node memory
node --max-old-space-size=4096 server.js
```

---

## Post-Deployment Checklist

- [ ] Domain points to deployment URL
- [ ] SSL certificate installed
- [ ] Environment variables set
- [ ] Database backup configured
- [ ] Analytics tracking working
- [ ] Error monitoring active
- [ ] Performance metrics monitored
- [ ] CDN cache configured
- [ ] Admin panel working
- [ ] Contact form sending emails

---

## Support

Need help? Contact: [support@kabutarmedia.com](mailto:support@kabutarmedia.com)
