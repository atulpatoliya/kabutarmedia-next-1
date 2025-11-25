import Container from "@/components/ui/Container";
import LatestNewsList from "@/components/LatestNewsList";
import NewsletterBox from "@/components/NewsletterBox";

const categoryInfo = {
  india: { name: "India News", description: "Latest news and updates from India" },
  world: { name: "World News", description: "Breaking news from around the world" },
  politics: { name: "Politics", description: "Political news and analysis" },
  business: { name: "Business", description: "Business news and market updates" },
  sports: { name: "Sports", description: "Sports news and live updates" },
  tech: { name: "Technology", description: "Latest technology news and reviews" },
  lifestyle: { name: "Lifestyle", description: "Lifestyle, entertainment, and culture" },
  health: { name: "Health", description: "Health news and medical updates" },
  education: { name: "Education", description: "Education news and updates" },
  entertainment: { name: "Entertainment", description: "Entertainment and celebrity news" },
};

export default function CategoryPage({ params }) {
  const category = categoryInfo[params.slug];

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <Container className="py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
        <p className="text-zinc-600 dark:text-zinc-400">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <LatestNewsList category={category.name.split(" ")[0].toLowerCase()} />
        </div>

        <div className="space-y-6">
          <NewsletterBox />
        </div>
      </div>
    </Container>
  );
}

