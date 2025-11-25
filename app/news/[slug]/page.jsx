"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import LatestNewsList from "@/components/LatestNewsList";
import RelatedPosts from "@/components/RelatedPosts";
import ShareButtons from "@/components/ShareButtons";
import AuthorBox from "@/components/AuthorBox";
import Badge from "@/components/ui/Badge";
import Skeleton from "@/components/ui/Skeleton";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticlePage({ params: rawParams }) {
  const params = rawParams;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const slug = typeof params.slug === "string" ? params.slug : params.slug[0];
        
        // In production, fetch from API using the slug
        // For now, using mock data approach through API
        const res = await fetch(`/api/posts?search=${slug}`, { cache: "no-store" });
        const data = await res.json();
        
        // Find post by slug
        const foundPost = data.posts?.find(p => p.slug === slug);
        
        if (!foundPost) {
          notFound();
        }
        
        setPost(foundPost);
      } catch (error) {
        console.error("Error fetching post:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params]);

  if (loading) {
    return (
      <Container className="py-8">
        <Skeleton className="h-12 mb-4" />
        <Skeleton className="h-96 mb-8" />
        <Skeleton className="h-32 mb-4" />
      </Container>
    );
  }

  if (!post) {
    notFound();
  }

  const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/news/${post.slug}`;

  return (
    <div>
      {/* Article Header */}
      <Container className="py-8">
        <div className="mb-4">
          <Link href={`/category/${post.category?.toLowerCase()}`}>
            <Badge variant="blue">{post.category}</Badge>
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <AuthorBox author={post.author} publishDate={post.published_at} readTime={post.read_time} />

        <ShareButtons url={articleUrl} title={post.title} />
      </Container>

      {/* Banner Image */}
      {post.banner && (
        <div className="relative w-full h-96 bg-zinc-200 dark:bg-zinc-700 mb-8">
          <Image
            src={post.banner}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article Content */}
      <Container className="py-8 max-w-3xl">
        <div className="prose dark:prose-invert max-w-none mb-8">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 pt-8 border-t">
            {post.tags.map(tag => (
              <Link key={tag} href={`/tags/${tag}`} className="hover:text-blue-600">
                <Badge>#{tag}</Badge>
              </Link>
            ))}
          </div>
        )}

        {/* Share Again */}
        <div className="border-t pt-8 mb-8">
          <h3 className="font-bold mb-4">Share This Article</h3>
          <ShareButtons url={articleUrl} title={post.title} />
        </div>
      </Container>

      {/* Related Posts */}
      <Container className="py-8">
        <RelatedPosts category={post.category} exclude={post._id} />
      </Container>
    </div>
  );
}
