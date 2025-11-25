"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/components/ui/Pagination";
import Skeleton from "@/components/ui/Skeleton";

/**
 * @param {{category?: string, tag?: string, initialPage?: number}} props
 */
export default function LatestNewsList({ category, tag, initialPage = 1 }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(0);
  const [limit] = useState(12);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let url = `/api/posts?page=${page}&limit=${limit}&status=published`;
        if (category) url += `&category=${category}`;
        if (tag) url += `&tag=${tag}`;

        const res = await fetch(url);
        const data = await res.json();
        setPosts(data.posts || []);
        setTotal(data.pagination?.total || 0);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, category, tag, limit]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      {/* News Grid - Aaj Tak Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {loading
          ? [...Array(12)].map((_, i) => <Skeleton key={i} className="h-64" />)
          : posts.map(post => {
              const postImage = post.image || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop";
              return (
                <Link key={post._id} href={`/news/${post.slug}`} className="group cursor-pointer">
                  <article className="flex flex-col h-full bg-white dark:bg-zinc-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-zinc-100 dark:border-zinc-700 hover:border-red-500">
                    {/* Image */}
                    <div className="relative w-full h-48 overflow-hidden bg-zinc-200 dark:bg-zinc-700">
                      <Image
                        src={postImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded text-xs font-bold uppercase z-10">
                        {post.category}
                      </div>
                      {/* Hot Badge if featured */}
                      {post.featured && (
                        <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold uppercase">
                          HOT 🔥
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col grow">
                      {/* Title */}
                      <h3 className="text-base md:text-lg font-bold text-zinc-900 dark:text-white line-clamp-3 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors mb-3 grow">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-700 text-xs text-gray-500 dark:text-gray-400">
                        <span>{post.author || 'KabutarMedia'}</span>
                        <span>{new Date(post.createdAt).toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
