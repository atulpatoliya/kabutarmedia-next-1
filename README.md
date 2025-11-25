# 🐦 KabutarMedia - News Portal

**A production-ready, full-stack news portal built with Next.js 14+, React 19, and MongoDB.**

[![Next.js](https://img.shields.io/badge/Next.js-14%2B-000000?style=flat-square&logo=vercel)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-00ED64?style=flat-square&logo=mongodb)](https://mongodb.com/)

---

## ✨ Features

- 🚀 **Production Ready** - Fully functional, tested, and optimized
- 📱 **Fully Responsive** - Mobile-first design
- 🔍 **SEO Optimized** - Meta tags, sitemap, robots.txt
- ⚡ **High Performance** - ISR, image optimization
- 🎨 **Beautiful UI** - TailwindCSS with dark mode
- 📰 **Multi-category** - 10 categories included
- 🎬 **Video Support** - YouTube/Vimeo embeds
- 🔔 **Breaking News** - Real-time ticker
- 🔍 **Full Search** - Text search with pagination
- 📧 **Newsletter** - Email subscription ready

---

## 🎯 Quick Links

- [Quick Start (5 minutes)](./QUICK_START.md)
- [Complete Setup Guide](./IMPLEMENTATION_GUIDE.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Feature Checklist](./IMPLEMENTATION_CHECKLIST.md)
- [What's Included](./IMPLEMENTATION_SUMMARY.md)

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local
cp .env.example .env.local

# 3. Add MongoDB URI to .env.local
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/kabutarmedia

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**See [QUICK_START.md](./QUICK_START.md) for detailed setup with screenshots.**

---

## 📦 What's Included

✅ **50+ React components** - Pre-built and production-ready  
✅ **9 complete pages** - Home, articles, videos, search, and more  
✅ **6+ API endpoints** - Posts, videos, search, breaking news  
✅ **SEO optimization** - Meta tags, sitemap, JSON-LD schema  
✅ **Mobile responsive** - 100% mobile-first design  
✅ **Dark mode** - Built-in theme switcher  
✅ **Admin structure** - Ready for admin dashboard  

---

## 📚 Documentation

1. **[QUICK_START.md](./QUICK_START.md)** - Setup in 5 minutes
2. **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Complete guide
3. **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - 6 deployment options
4. **[IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md)** - Feature list
5. **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - What's included

---

## 🚀 Deploy

### Vercel (Recommended)
```bash
npm i -g vercel && vercel
```

### Netlify
```bash
netlify deploy --prod
```

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for 4 more options.

---

## 🎯 Pages

| Route | Purpose |
|-------|---------|
| `/` | Home with hero, trending, categories |
| `/news/[slug]` | Article page with SEO |
| `/category/[slug]` | Category listing |
| `/videos` | Video gallery |
| `/search` | Full-text search |
| `/about` | About page |
| `/contact` | Contact form |

---

## 📞 Support

Need help? Check the [documentation](./IMPLEMENTATION_GUIDE.md) or [quick start guide](./QUICK_START.md).

---

**Built with ❤️ - Ready to launch your news portal in minutes! 🚀**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
