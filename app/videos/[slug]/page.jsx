"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/ui/Container";
import VideoCard from "@/components/VideoCard";
import Skeleton from "@/components/ui/Skeleton";

export default function VideoDetailPage({ params }) {
  const [video, setVideo] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        // Fetch video by slug
        const res = await fetch(`/api/videos?search=${params.slug}`, { cache: "no-store" });
        const data = await res.json();
        const foundVideo = data.videos?.find(v => v.slug === params.slug);

        if (!foundVideo) {
          notFound();
        }

        setVideo(foundVideo);

        // Fetch recommended videos
        const recRes = await fetch(`/api/videos?category=${foundVideo.category}&limit=6`);
        const recData = await recRes.json();
        setRecommended(recData.videos?.filter(v => v._id !== foundVideo._id) || []);
      } catch (error) {
        console.error("Error fetching video:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [params.slug]);

  if (loading) {
    return (
      <Container className="py-8">
        <Skeleton className="w-full aspect-video mb-4" />
        <Skeleton className="h-12 mb-4" />
      </Container>
    );
  }

  if (!video) {
    notFound();
  }

  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="bg-black rounded-lg overflow-hidden mb-6">
            {video.video_embed?.url ? (
              <iframe
                src={video.video_embed.url}
                title={video.title}
                width="100%"
                height="500"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="w-full"
              />
            ) : (
              <div className="w-full h-96 bg-zinc-700 flex items-center justify-center">
                <p className="text-white">Video not available</p>
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            {video.views} views • {new Date(video.published_at).toLocaleDateString()}
          </p>
        </div>

        {/* Recommended Videos */}
        <div>
          <h3 className="text-lg font-bold mb-4">Recommended Videos</h3>
          <div className="space-y-4">
            {recommended.map(vid => (
              <VideoCard key={vid._id} video={vid} size="grid" />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
