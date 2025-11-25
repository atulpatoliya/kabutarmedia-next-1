/**
 * Utility functions for KabutarMedia
 */

export function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function calculateReadingTime(text) {
  if (!text) return 0;
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text, length = 150) {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

export function stripHtml(html) {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

export function getCategoryColor(category) {
  const colors = {
    india: "blue",
    world: "green",
    politics: "red",
    business: "purple",
    sports: "orange",
    tech: "cyan",
    lifestyle: "pink",
    health: "emerald",
    education: "yellow",
    entertainment: "rose",
  };
  return colors[category?.toLowerCase()] || "gray";
}

export function getShareUrl(platform, url, title) {
  const encoded = {
    url: encodeURIComponent(url),
    title: encodeURIComponent(title),
  };

  const shareUrls = {
    whatsapp: `https://wa.me/?text=${encoded.title}%20${encoded.url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encoded.url}`,
    twitter: `https://twitter.com/intent/tweet?text=${encoded.title}&url=${encoded.url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded.url}`,
    telegram: `https://t.me/share/url?url=${encoded.url}&text=${encoded.title}`,
  };

  return shareUrls[platform] || "";
}

export function generateMetaTags(post) {
  return {
    title: post.seo?.meta_title || post.title,
    description: post.seo?.meta_description || post.short_description,
    image: post.seo?.og_image || post.banner,
    url: `/news/${post.slug}`,
    author: post.author?.name,
    publishedDate: post.published_at,
  };
}

export function generateJsonLd(post) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    image: post.banner,
    description: post.short_description,
    datePublished: post.published_at,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author?.name,
    },
    publisher: {
      "@type": "Organization",
      name: "KabutarMedia",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
  };
}
