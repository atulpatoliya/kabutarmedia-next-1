import { Metadata } from "next";
import Container from "@/components/ui/Container";
import HeroSection from "@/components/HeroSection";
import TrendingCarousel from "@/components/TrendingCarousel";
import CategoryBlock from "@/components/CategoryBlock";
import LatestNewsList from "@/components/LatestNewsList";
import BreakingTicker from "@/components/BreakingTicker";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Aaj Tak - Latest News, Breaking News & Videos",
  description: "Get breaking news from India and around the world. Stay updated with the latest news on India, Politics, Business, Sports, Technology, and more.",
  openGraph: {
    title: "Aaj Tak - Latest News",
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
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-6 bg-red-600"></div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white uppercase">Trending Now</h2>
          </div>
          <TrendingCarousel />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Left Content - 3 columns */}
          <div className="lg:col-span-3">
            {/* Latest News Header */}
            <div className="flex items-center gap-2 mb-6 border-b border-zinc-200 dark:border-zinc-700 pb-2">
              <span className="bg-red-600 text-white px-2 py-1 text-sm font-bold uppercase">Latest News</span>
            </div>

            {/* News Grid */}
            <LatestNewsList />
          </div>

          {/* Right Sidebar - 1 column */}
          <div className="lg:col-span-1">
            <Sidebar />
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
