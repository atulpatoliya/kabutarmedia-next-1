"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
type Post = { _id: string; title: string; slug: string; is_breaking?: boolean };
export default function BreakingTicker() {
  const [items, setItems] = useState<Post[]>([]);
  useEffect(() => {
    const run = async () => {
      const res = await fetch("/api/posts?status=published&limit=50", { cache: "no-store" });
      const data = await res.json();
      const breaking = (data?.posts || []).filter((p: Post) => p.is_breaking);
      setItems(breaking);
    };
    run();
    const t = setInterval(run, 10000);
    return () => clearInterval(t);
  }, []);
  if (!items.length) return null;
  return (
    <div className="fixed top-16 left-0 right-0 z-30 bg-red-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="whitespace-nowrap overflow-x-hidden">
          <div className="inline-flex gap-8 py-2 animate-[ticker_24s_linear_infinite]">
            {items.map(i => (
              <Link key={i._id} href={`/news/${i.slug}`} className="font-medium">
                {i.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <style>{"@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}"}</style>
    </div>
  );
}

