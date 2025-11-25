"use client";

import { useState, useEffect } from "react";
import ImageCard from "@/components/ImageCard";
import Skeleton from "@/components/ui/Skeleton";

export default function TrendingCarousel() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts?sort=views&limit=10&status=published");
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error("Error fetching trending posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const scroll = (direction) => {
    const container = document.getElementById("trending-scroll");
    if (!container) return;
    const amount = 320;
    if (direction === "left") {
      container.scrollBy({ left: -amount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Trending</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-80 h-48 shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  if (!posts.length) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Trending</h2>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/3 z-10 bg-white dark:bg-zinc-900 rounded-full p-2 shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 -translate-x-6"
          aria-label="Scroll left"
        >
          ←
        </button>

        <div
          id="trending-scroll"
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          {posts.map(post => (
            <div key={post._id} className="w-80 shrink-0">
              <ImageCard post={post} size="large" />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/3 z-10 bg-white dark:bg-zinc-900 rounded-full p-2 shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 translate-x-6"
          aria-label="Scroll right"
        >
          →
        </button>
      </div>
    </div>
  );
}
