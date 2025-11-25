"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ImageCard from "@/components/ImageCard";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";

export default function CategoryBlock({ categoryName, slug }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts?category=${categoryName}&limit=4&status=published`);
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error("Error fetching category posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">{categoryName}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  if (!posts.length) return null;

  const [main, ...others] = posts;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{categoryName}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
        <div className="lg:col-span-2">
          <ImageCard post={main} size="large" />
        </div>
        <div className="lg:col-span-2 space-y-4">
          {others.map(post => (
            <ImageCard key={post._id} post={post} size="small" />
          ))}
        </div>
      </div>
      <Link href={`/category/${slug}`}>
        <Button>View All</Button>
      </Link>
    </div>
  );
}
