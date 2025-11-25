"use client";

import Link from "next/link";
import NewsletterBox from "@/components/NewsletterBox";
import Container from "@/components/ui/Container";

const categories = [
  { label: "Home", href: "/" },
  { label: "India", href: "/category/india" },
  { label: "World", href: "/category/world" },
  { label: "Politics", href: "/category/politics" },
  { label: "Business", href: "/category/business" },
  { label: "Sports", href: "/category/sports" },
  { label: "Tech", href: "/category/tech" },
  { label: "Videos", href: "/videos" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Twitter", url: "https://twitter.com" },
  { label: "Facebook", url: "https://facebook.com" },
  { label: "YouTube", url: "https://youtube.com" },
  { label: "Instagram", url: "https://instagram.com" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 text-white mt-16">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="font-bold text-lg mb-4">KabutarMedia</h4>
            <p className="text-zinc-400 text-sm mb-4">
              Your trusted source for breaking news, in-depth analysis, and comprehensive coverage of events from India and around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <nav className="space-y-2 text-sm">
              {categories.slice(0, 5).map(cat => (
                <Link key={cat.href} href={cat.href} className="block text-zinc-400 hover:text-white transition">
                  {cat.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-bold mb-4">More</h4>
            <nav className="space-y-2 text-sm">
              {categories.slice(5).map(cat => (
                <Link key={cat.href} href={cat.href} className="block text-zinc-400 hover:text-white transition">
                  {cat.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <NewsletterBox />
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-zinc-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex gap-4">
              {socialLinks.map(link => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition"
                  title={link.label}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="text-sm text-zinc-500">
              <p>© {currentYear} KabutarMedia. All rights reserved.</p>
              <p>Powered by Kabutarmedia</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
