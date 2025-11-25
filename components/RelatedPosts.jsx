"use client";

import { useState, useEffect } from "react";
import ImageCard from "@/components/ImageCard";
import Skeleton from "@/components/ui/Skeleton";

export default function RelatedPosts({ category, exclude }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = `/api/posts/related?category=${category}&limit=4`;
        if (exclude) url += `&exclude=${exclude}`;

        const res = await fetch(url);
        const data = await res.json();
        setPosts(data || []);
      } catch (error) {
        console.error("Error fetching related posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category, exclude]);

  if (loading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  if (!posts.length) return null;

  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map(post => (
          <ImageCard key={post._id} post={post} size="large" />
        ))}
      </div>
    </div>
  );
}
