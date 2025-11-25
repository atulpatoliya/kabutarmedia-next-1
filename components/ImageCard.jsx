"use client";

import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ImageCard({ post, size = "small" }) {
  if (!post) return null;

  if (size === "large") {
    return (
      <Card className="overflow-hidden">
        <Link href={`/news/${post.slug}`} className="block relative h-64 bg-zinc-200 dark:bg-zinc-700">
          {post.banner && (
            <Image
              src={post.banner}
              alt={post.title}
              fill
              className="object-cover hover:scale-105 transition-transform"
            />
          )}
          {post.is_breaking && (
            <div className="absolute top-4 left-4">
              <Badge variant="red">LIVE</Badge>
            </div>
          )}
        </Link>
        <div className="p-4">
          <Link href={`/category/${post.category?.toLowerCase()}`}>
            <Badge>{post.category}</Badge>
          </Link>
          <Link href={`/news/${post.slug}`}>
            <h3 className="text-xl font-bold mt-3 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400">
              {post.title}
            </h3>
          </Link>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2 line-clamp-2">
            {post.short_description}
          </p>
          <div className="flex items-center justify-between mt-3 text-xs text-zinc-500">
            <span>{formatDate(post.published_at)}</span>
            {post.read_time && <span>{post.read_time} min read</span>}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex gap-4 p-4">
      <Link href={`/news/${post.slug}`} className="relative w-24 h-24 shrink-0 bg-zinc-200 dark:bg-zinc-700 rounded">
        {post.banner && (
          <Image
            src={post.banner}
            alt={post.title}
            fill
            className="object-cover rounded hover:scale-105 transition-transform"
          />
        )}
      </Link>
      <div className="flex-1">
        <Link href={`/category/${post.category?.toLowerCase()}`}>
          <Badge variant="blue">{post.category}</Badge>
        </Link>
        <Link href={`/news/${post.slug}`}>
          <h3 className="text-lg font-bold mt-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400">
            {post.title}
          </h3>
        </Link>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1 line-clamp-1">
          {post.short_description}
        </p>
        <div className="flex items-center gap-2 mt-2 text-xs text-zinc-500">
          <span>{formatDate(post.published_at)}</span>
          {post.read_time && <span>•</span>}
          {post.read_time && <span>{post.read_time} min read</span>}
        </div>
      </div>
    </Card>
  );
}
