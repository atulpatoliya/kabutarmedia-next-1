"use client";

import { useState, useEffect } from "react";
import ImageCard from "@/components/ImageCard";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";

export default function HeroSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts?featured=true&limit=5");
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error("Error fetching hero posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="mb-8">
        <Skeleton className="h-[500px] rounded-lg mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  if (!posts.length) return null;

  const [mainStory, ...secondaryStories] = posts;
  const mainImage = mainStory.image || "https://images.unsplash.com/photo-1552084898-4bd94cbb6d5e?w=1200&h=600&fit=crop";

  return (
    <div className="mb-12">
      {/* Main Featured Story - Full Width with Overlay */}
      <Link href={`/news/${mainStory.slug}`} className="group cursor-pointer block mb-6">
        <div className="relative h-[350px] md:h-[450px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
          <Image
            src={mainImage}
            alt={mainStory.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-red-600 text-white px-3 py-1 rounded text-xs font-black uppercase tracking-wider">
                {mainStory.category}
              </span>
              <span className="text-gray-300 text-xs font-medium">Now</span>
            </div>
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-black leading-tight mb-3 line-clamp-3">
              {mainStory.title}
            </h1>
            {mainStory.excerpt && (
              <p className="text-gray-200 text-sm md:text-base line-clamp-2">
                {mainStory.excerpt}
              </p>
            )}
          </div>
        </div>
      </Link>

      {/* 4 Secondary Stories Grid - Aaj Tak Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {secondaryStories.map((post) => {
          const cardImage = post.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop";
          return (
            <Link key={post._id} href={`/news/${post.slug}`} className="group cursor-pointer">
              <div className="flex flex-col h-full bg-white dark:bg-zinc-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-zinc-100 dark:border-zinc-700 hover:border-red-500 dark:hover:border-red-500">
                {/* Image Container */}
                <div className="relative w-full h-44 overflow-hidden bg-zinc-200 dark:bg-zinc-700">
                  <Image
                    src={cardImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold uppercase">
                    {post.category}
                  </div>
                </div>
                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-sm md:text-base font-bold text-zinc-900 dark:text-white line-clamp-3 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors mb-2 flex-grow">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {new Date(post.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
