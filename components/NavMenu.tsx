"use client";
import Link from "next/link";
const items = [
  { label: "India", href: "/category/india" },
  { label: "World", href: "/category/world" },
  { label: "Politics", href: "/category/politics" },
  { label: "Business", href: "/category/business" },
  { label: "Sports", href: "/category/sports" },
  { label: "Tech", href: "/category/tech" },
  { label: "Lifestyle", href: "/category/lifestyle" },
  { label: "Health", href: "/category/health" },
  { label: "Education", href: "/category/education" }
];
export default function NavMenu() {
  return (
    <nav className="hidden lg:flex items-center gap-6">
      {items.map((i) => (
        <Link key={i.href} href={i.href} className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition">
          {i.label}
        </Link>
      ))}
      <Link href="/videos" className="text-sm font-semibold text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-600 transition">
        Videos
      </Link>
    </nav>
  );
}

