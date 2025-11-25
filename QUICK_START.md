# 🚀 Quick Start Guide - KabutarMedia

Get your news portal up and running in 5 minutes!

## Step 1: Clone & Install (1 minute)

```bash
cd d:\Learning\kabutarmedia-next-1
npm install
```

## Step 2: Setup MongoDB (1 minute)

### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster
4. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/kabutarmedia`
5. Add to `.env.local`:

```bash
MONGODB_URI=mongodb+srv://your-user:your-pass@cluster.mongodb.net/kabutarmedia
```

### Option B: Local MongoDB

```bash
# Install MongoDB on your system
# macOS:
brew tap mongodb/brew
brew install mongodb-community

# Windows: Download from mongodb.com/download/community

# Start MongoDB
mongod
```

Then in `.env.local`:
```bash
MONGODB_URI=mongodb://localhost:27017/kabutarmedia
```

## Step 3: Create .env.local (1 minute)

```bash
# Copy template
cp .env.example .env.local

# Edit and add your values
```

**Minimal setup:**
```bash
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/kabutarmedia
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CONTACT_EMAIL=your@email.com
```

## Step 4: Add Sample Data (1 minute)

Create a post in MongoDB using any of these methods:

### Using MongoDB Compass (GUI):
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect with your MONGODB_URI
3. Create database: `kabutarmedia`
4. Create collection: `posts`
5. Insert document (click Add Document):

```json
{
  "title": "Breaking: Major Event Happens",
  "slug": "breaking-major-event",
  "short_description": "This is a breaking news story",
  "content": "<p>Full article content here</p>",
  "banner": "https://via.placeholder.com/800x400",
  "category": "India",
  "tags": ["breaking", "india"],
  "status": "published",
  "is_breaking": true,
  "is_featured": true,
  "views": 1000,
  "published_at": new Date(),
  "author": {
    "name": "John Doe"
  },
  "read_time": 5
}
```

### Using MongoDB Shell:
```bash
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/kabutarmedia"

# Switch to kabutarmedia database
use kabutarmedia

# Insert a post
db.posts.insertOne({
  title: "Breaking: Major Event",
  slug: "breaking-major-event",
  short_description: "This is a breaking news story",
  content: "<p>Full article content</p>",
  banner: "https://via.placeholder.com/800x400",
  category: "India",
  status: "published",
  is_breaking: true,
  is_featured: true,
  views: 1000,
  published_at: new Date(),
  author: { name: "John Doe" },
  read_time: 5
})
```

## Step 5: Run Development Server (1 minute)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

🎉 **You're live!**

---

## 📝 Create More Posts

### Using MongoDB Compass:
1. Navigate to `kabutarmedia` → `posts`
2. Click "Add Document" for each new article
3. Fill in the fields (see schema below)

### Sample Article Template:

```json
{
  "title": "Your Article Title",
  "slug": "your-article-title",
  "short_description": "Brief 1-2 line summary",
  "content": "<h2>Heading</h2><p>Your article content here</p>",
  "banner": "https://your-image-url.jpg",
  "category": "India",
  "tags": ["tag1", "tag2"],
  "status": "published",
  "is_featured": false,
  "is_breaking": false,
  "views": 0,
  "published_at": new Date(),
  "author": {
    "name": "Author Name"
  },
  "read_time": 5
}
```

### Required Fields:
- `title` - Article headline
- `slug` - URL-friendly name (auto-generated from title)
- `content` - HTML content
- `category` - One of: India, World, Politics, Business, Sports, Tech, Lifestyle, Health, Education, Entertainment
- `status` - "published" or "draft"

### Optional Fields:
- `short_description` - Summary text
- `banner` - Thumbnail image URL
- `tags` - Array of tags
- `is_featured` - Show in hero section
- `is_breaking` - Show in breaking ticker
- `views` - View count

---

## 🎨 Customization

### Change Site Name
Edit `components/Header.tsx`:
```jsx
<Link href="/" className="text-2xl font-bold text-blue-600">
  YourSiteName  {/* Change here */}
</Link>
```

### Change Categories
Edit `components/NavMenu.tsx`:
```javascript
const items = [
  { label: "Your Category", href: "/category/your-category" },
  // ...
];
```

### Change Colors
Edit `app/globals.css` or components use `bg-blue-600` (change to your color)

---

## 🌍 Deploy to Production

### Easiest: Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Follow the prompts and your site is live! See `DEPLOYMENT_GUIDE.md` for other options.

---

## 🔧 Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Check your MONGODB_URI in .env.local
# For Atlas: Whitelist your IP in Security → Network Access
# For local: Make sure mongod is running
```

### "Page shows no articles"
```bash
# Check if posts exist in database
# Make sure status is "published"
# Check the category name matches exactly
```

### "Images not showing"
```bash
# Use absolute URLs (https://...)
# Placeholder: https://via.placeholder.com/800x400
# Or upload to Cloudinary
```

### Port 3000 already in use
```bash
npm run dev -- -p 3001
# Open http://localhost:3001
```

---

## 📚 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [MongoDB Docs](https://docs.mongodb.com)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

---

## 💡 Pro Tips

1. **Use placeholder images while testing:**
   ```
   https://via.placeholder.com/800x400
   ```

2. **Generate slug automatically:**
   Title: "Breaking News" → slug: "breaking-news"

3. **Rich text content:**
   Use your favorite HTML editor and paste the HTML

4. **View count tracking:**
   Increment on each page view in production

5. **Schedule posts:**
   Set `status: "scheduled"` and `scheduled_at: Date`

---

## 📞 Need Help?

- Check `IMPLEMENTATION_GUIDE.md` for detailed docs
- Check `DEPLOYMENT_GUIDE.md` for deployment options
- Review `IMPLEMENTATION_CHECKLIST.md` for feature list

---

**Happy news publishing! 🎉**
