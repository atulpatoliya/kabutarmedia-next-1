import { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "About Us - KabutarMedia",
  description: "Learn more about KabutarMedia and our mission to deliver quality news.",
};

export default function AboutPage() {
  return (
    <Container className="py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About KabutarMedia</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            KabutarMedia is committed to bringing you the most accurate, timely, and comprehensive news coverage from India and around the world. We strive to be your trusted source for breaking news, in-depth analysis, and diverse perspectives on the issues that matter most to you.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Why Choose KabutarMedia?</h2>
          <ul className="space-y-4 text-zinc-700 dark:text-zinc-300">
            <li>✓ <strong>Real-time Updates:</strong> Breaking news as it happens</li>
            <li>✓ <strong>Comprehensive Coverage:</strong> India, world, politics, business, sports, and more</li>
            <li>✓ <strong>Quality Journalism:</strong> Fact-checked and well-researched articles</li>
            <li>✓ <strong>Multiple Formats:</strong> Articles, videos, and multimedia content</li>
            <li>✓ <strong>Easy Access:</strong> Mobile-friendly and accessible anywhere, anytime</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Our dedicated team of journalists, editors, and content creators work tirelessly to bring you the news that matters. With years of experience in journalism and media, we're committed to maintaining the highest standards of editorial integrity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Have feedback or want to get in touch? <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact us</a> and we'll get back to you as soon as possible.
          </p>
        </section>
      </div>
    </Container>
  );
}
