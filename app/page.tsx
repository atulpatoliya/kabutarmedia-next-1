import { Metadata } from "next";
import Container from "@/components/ui/Container";
import HeroSection from "@/components/HeroSection";
import TrendingCarousel from "@/components/TrendingCarousel";
import CategoryBlock from "@/components/CategoryBlock";
import LatestNewsList from "@/components/LatestNewsList";
import NewsletterBox from "@/components/NewsletterBox";
import BreakingTicker from "@/components/BreakingTicker";

export const metadata: Metadata = {
  title: "KabutarMedia - Latest News, Breaking News & Videos",
  description: "Get breaking news from India and around the world. Stay updated with the latest news on India, Politics, Business, Sports, Technology, and more.",
  openGraph: {
    title: "KabutarMedia - Latest News",
    description: "Breaking news and latest updates from India and the world",
    type: "website",
  },
};

const categories = [
  { name: "India", slug: "india" },
  { name: "World", slug: "world" },
  { name: "Politics", slug: "politics" },
  { name: "Business", slug: "business" },
  { name: "Sports", slug: "sports" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "Technology", slug: "tech" },
  { name: "Health", slug: "health" },
];

export default function Home() {
  return (
    <>
      {/* Breaking Ticker */}
      <BreakingTicker />

      <Container className="py-6 md:py-8">
        {/* Hero Section - Featured Stories */}
        <HeroSection />

        {/* Trending Carousel */}
        <div className="mb-12">
          <h2 className="text-2xl font-black mb-6 text-zinc-900 dark:text-white">🔥 Trending Now</h2>
          <TrendingCarousel />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {/* Left Content - 3 columns */}
          <div className="lg:col-span-3">
            {/* Latest News Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-red-600"></div>
              <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white\">Latest News</h2>
            </div>

            {/* News Grid */}
            <LatestNewsList />
          </div>

          {/* Right Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Newsletter Box */}
            <div className="sticky top-20 space-y-6">
              <NewsletterBox />
              
              {/* Sidebar Ad Space */}
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6 border-2 border-dashed border-zinc-300 dark:border-zinc-600 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Advertisement</p>
                <p className="text-xs text-gray-400 mt-2">300x250</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Category Sections - Full Width */}
      <div className="bg-zinc-50 dark:bg-zinc-900 py-12 border-t border-zinc-200 dark:border-zinc-800">
        <Container>
          {categories.map((cat, idx) => (
            <div key={cat.slug} className={idx > 0 ? 'mt-12 pt-12 border-t border-zinc-200 dark:border-zinc-800' : ''}>
              <CategoryBlock categoryName={cat.name} slug={cat.slug} />
            </div>
          ))}
        </Container>
      </div>
    </>
  );
}
