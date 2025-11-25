"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

export default function VideoCard({ video, size = "default" }) {
  if (!video) return null;

  if (size === "grid") {
    return (
      <Card className="overflow-hidden">
        <Link href={`/videos/${video.slug}`}>
          <div className="relative w-full aspect-video bg-zinc-200 dark:bg-zinc-700 hover:opacity-80 transition-opacity">
            {video.banner && (
              <Image
                src={video.banner}
                alt={video.title}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-600 rounded-full p-3 opacity-80 hover:opacity-100">
                <span className="text-white text-xl">▶</span>
              </div>
            </div>
            {video.video_embed?.duration && (
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                {video.video_embed.duration}
              </div>
            )}
          </div>
        </Link>
        <div className="p-3">
          <Link href={`/videos/${video.slug}`}>
            <h3 className="font-bold line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400">
              {video.title}
            </h3>
          </Link>
          <p className="text-xs text-zinc-500 mt-1">{video.views} views</p>
        </div>
      </Card>
    );
  }

  return <div>Video: {video.title}</div>;
}
