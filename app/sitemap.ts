import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const categories = [
    'india',
    'world',
    'politics',
    'business',
    'sports',
    'tech',
    'lifestyle',
    'health',
    'education',
    'entertainment'
  ]

  const pages = [
    '',
    'about',
    'contact',
    'videos',
    ...categories.map(cat => `category/${cat}`),
  ]

  return pages.map(page => ({
    url: `${baseUrl}/${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'hourly' : page.startsWith('category') ? 'daily' : 'weekly',
    priority: page === '' ? 1 : page.startsWith('category') ? 0.8 : 0.5,
  })) as MetadataRoute.Sitemap
}
