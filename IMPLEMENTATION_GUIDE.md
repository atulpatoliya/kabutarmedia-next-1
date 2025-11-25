# 🚀 KabutarMedia - Full-Stack News Portal

A production-ready news portal built with **Next.js 14+**, **TailwindCSS**, and **MongoDB**.

## ✨ Features

✅ **Fully Responsive** - Mobile-first design  
✅ **Breaking News System** - Real-time breaking news ticker  
✅ **SEO Optimized** - Meta tags, Open Graph, JSON-LD schema  
✅ **Fast & Performant** - ISR, image optimization, lazy loading  
✅ **Multi-category** - India, World, Politics, Business, Sports, Tech, Lifestyle, Health, Education  
✅ **Videos Support** - YouTube/Vimeo embed integration  
✅ **Search Functionality** - Full-text search across all articles  
✅ **Comment-ready** - Architecture ready for comments integration  
✅ **Newsletter** - Subscription box for all pages  
✅ **Dark Mode** - Built-in dark mode support  

---

## 🏗️ Project Structure

```
app/
├── page.tsx                          # Home page with hero, trending, categories
├── layout.tsx                        # Root layout with header, footer
├── globals.css                       # Global styles
├── category/[slug]/page.jsx          # Category pages
├── news/[slug]/page.jsx              # Article detail page
├── videos/page.jsx                   # Videos listing
├── videos/[slug]/page.jsx            # Single video page
├── search/page.jsx                   # Search page
├── tags/[tag]/page.jsx               # Tag pages
├── about/page.jsx                    # About page
├── contact/page.jsx                  # Contact page
├── sitemap.ts                        # Dynamic sitemap
├── api/
│   ├── posts/route.js                # Posts API (GET, POST, sort, filter)
│   ├── posts/featured/route.js       # Featured posts
│   ├── posts/related/route.js        # Related posts
│   ├── breaking/active/route.js      # Active breaking news
│   ├── videos/route.js               # Videos API
│   ├── search/route.js               # Search API
│   ├── contact/route.js              # Contact form
│   ├── auth/login/route.js           # Auth endpoints
│   └── admin/create/route.js         # Admin endpoints

components/
├── Header.tsx                        # Fixed header with navigation
├── NavMenu.tsx                       # Desktop navigation
├── MobileMenu.tsx                    # Mobile menu
├── BreakingTicker.tsx                # Breaking news ticker
├── Footer.jsx                        # Footer component
├── HeroSection.jsx                   # Homepage hero (4 featured posts)
├── TrendingCarousel.jsx              # Horizontal scrolling trending
├── CategoryBlock.jsx                 # Category section component
├── LatestNewsList.jsx                # Latest news feed with pagination
├── ImageCard.jsx                     # News card component
├── VideoCard.jsx                     # Video grid component
├── RelatedPosts.jsx                  # Related articles sidebar
├── ShareButtons.jsx                  # Social share buttons
├── AuthorBox.jsx                     # Author info card
├── NewsletterBox.jsx                 # Newsletter subscription
├── ui/                               # Reusable UI components
│   ├── Card.jsx
│   ├── Badge.jsx
│   ├── Button.jsx
│   ├── Container.jsx
│   ├── Skeleton.jsx
│   └── Pagination.jsx

models/
├── Post.js                           # Post schema (articles, videos, breaking news)
└── User.js                           # User schema

lib/
└── mongodb.js                        # MongoDB connection

public/
├── robots.txt                        # SEO robots file
└── favicon.ico
```

---

## 🎯 Key Features Breakdown

### 1. **Home Page**
- Hero section with 1 featured + 3 trending stories
- Trending carousel (horizontal scroll)
- Latest news feed with pagination
- 8 category sections (India, World, Politics, Business, Sports, Tech, Lifestyle, Health)
- Video section
- Newsletter signup

### 2. **Article Page** (`/news/[slug]`)
- Full-width banner image
- Article header with metadata
- Social share buttons (WhatsApp, Facebook, X, LinkedIn, Telegram)
- Author box
- Rich text content with images, quotes, tables
- Related articles (4 in same category)
- SEO meta tags & JSON-LD schema

### 3. **Category Pages** (`/category/[slug]`)
- Category title & description
- Featured article
- Paginated list of articles
- Newsletter sidebar

### 4. **Videos** (`/videos`, `/videos/[slug]`)
- Video grid with filters
- Sort by recent/views
- Embed YouTube/Vimeo
- Recommended videos sidebar

### 5. **Search** (`/search?q=keyword`)
- Full-text search
- Paginated results
- Query highlighting

### 6. **Utilities**
- Tag pages (`/tags/[tag]`)
- About page (`/about`)
- Contact form (`/contact`)
- 404 handling

---

## 🔌 API Endpoints

### Posts API
```
GET  /api/posts                          # Get posts (with filters, sort, pagination)
     ?page=1&limit=10
     &category=india
     &sort=recent|views|featured
     &featured=true
     &status=published

POST /api/posts                          # Create post (admin)

GET  /api/posts/featured?limit=4         # Featured posts for hero
GET  /api/posts/related?category=india   # Related posts
```

### Videos API
```
GET  /api/videos                         # Get videos
     ?page=1&limit=12&sort=recent|views
     &category=sports
```

### Breaking News
```
GET  /api/breaking/active                # Active breaking news items
```

### Search
```
GET  /api/search?q=keyword&page=1        # Full-text search
```

### Contact
```
POST /api/contact                        # Submit contact form
     { name, email, subject, message }
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone & Install

```bash
git clone <repo>
cd kabutarmedia-next-1
npm install
```

### 2. Environment Variables

Create `.env.local`:

```bash
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/kabutarmedia
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email (for contact form - optional)
CONTACT_EMAIL=contact@kabutarmedia.com
SENDGRID_API_KEY=your_api_key

# Cloudinary (for image optimization)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Seed Sample Data (Optional)

Create a script to add sample posts:

```javascript
// scripts/seed.js
import Post from "@/models/Post";
import { connectDB } from "@/lib/mongodb";

const posts = [
  {
    title: "Breaking News: Major Event Happens",
    slug: "breaking-news-major-event",
    short_description: "This is a breaking news story",
    content: "<p>Full article content here</p>",
    category: "India",
    tags: ["breaking", "india"],
    status: "published",
    is_breaking: true,
    is_featured: true,
    views: 1000,
  },
  // ... more posts
];

async function main() {
  await connectDB();
  await Post.insertMany(posts);
  console.log("✅ Data seeded!");
}

main();
```

---

## 🏗️ Build & Deploy

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

**Environment variables in Vercel dashboard:**
- `MONGODB_URI`
- `NEXT_PUBLIC_SITE_URL`
- `CONTACT_EMAIL`

### Deploy to Other Platforms

**Netlify:**
```bash
netlify deploy --prod
```

**Docker:**
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

---

## 🎨 Customization

### Colors & Branding

Edit `app/globals.css` or TailwindCSS config:

```css
/* Primary color: blue-600 */
/* Secondary: red (for breaking news) */
/* Neutral: zinc-900 (dark mode) */
```

### Categories

Update in `components/NavMenu.tsx` and `app/category/[slug]/page.jsx`:

```javascript
const items = [
  { label: "India", href: "/category/india" },
  // Add more...
];
```

### Newsletter Integration

In `components/NewsletterBox.jsx`:

```javascript
// Replace TODO with actual email service
// Example: SendGrid, Mailchimp API
```

---

## 📊 Database Schema

### Post Collection

```javascript
{
  title: String,
  slug: String (unique),
  short_description: String (max 250),
  content: String (HTML),
  banner: String (URL),
  gallery: [String],
  category: String,
  tags: [String],
  author: {
    id: ObjectId,
    name: String,
    avatar: String
  },
  status: "draft" | "scheduled" | "published",
  published_at: Date,
  views: Number,
  is_featured: Boolean,
  is_breaking: Boolean,
  breaking_priority: Number (1-5),
  read_time: Number,
  seo: {
    meta_title: String,
    meta_description: String,
    og_image: String,
    canonical: String
  },
  video_embed: {
    type: "youtube" | "vimeo",
    url: String,
    duration: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## ⚡ Performance Optimization

### ISR (Incremental Static Regeneration)

```javascript
// app/page.tsx
export const revalidate = 30; // Revalidate every 30 seconds

// app/category/[slug]/page.jsx
export const revalidate = 60;

// app/news/[slug]/page.jsx
export const revalidate = 300;
```

### Image Optimization

```javascript
<Image
  src={post.banner}
  alt={post.title}
  width={800}
  height={400}
  priority={true}  // For above-fold images
/>
```

### Lazy Loading

Components use `next/dynamic` for code splitting:

```javascript
import dynamic from 'next/dynamic';

const RelatedPosts = dynamic(() => import('@/components/RelatedPosts'), {
  loading: () => <Skeleton />,
});
```

---

## 🧪 Testing

```bash
# Run tests
npm run test

# Build check
npm run build

# Lint
npm run lint
```

---

## 📱 Mobile Responsiveness

All components are built mobile-first using TailwindCSS breakpoints:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

---

## 🔒 Admin Features

Admin dashboard at `/admin`:
- Create/Edit/Delete posts
- Manage breaking news
- Upload images (Cloudinary)
- Rich text editor (TipTap)

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check connection string
# Make sure IP is whitelisted in MongoDB Atlas
```

### Images Not Loading
```bash
# Check NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
# Or use local images in /public folder
```

### Slow Page Load
```bash
# Check ISR revalidation times
# Optimize database queries with indexes
# Use CDN for images
```

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [MongoDB Docs](https://docs.mongodb.com)
- [Vercel Deployment](https://vercel.com/docs)

---

## 📄 License

MIT License - Free to use and modify

---

## 🤝 Contributing

Pull requests welcome! Please follow the code style and test thoroughly.

---

## 📧 Support

For issues or questions: [contact@kabutarmedia.com](mailto:contact@kabutarmedia.com)

---

**Built with ❤️ for news enthusiasts worldwide**
