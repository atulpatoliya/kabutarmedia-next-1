"use client";

import Link from "next/link";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AuthorBox({ author, publishDate, readTime }) {
  if (!author) return null;

  return (
    <div className="border-t border-b py-4 my-6">
      <div className="flex items-start gap-4">
        {author.avatar && (
          <img
            src={author.avatar}
            alt={author.name}
            className="w-16 h-16 rounded-full"
          />
        )}
        <div className="flex-1">
          <h4 className="font-bold text-lg">{author.name}</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {publishDate && `Published ${formatDate(publishDate)}`}
            {readTime && ` • ${readTime} min read`}
          </p>
          <p className="text-sm mt-1">Contributing Writer</p>
        </div>
      </div>
    </div>
  );
}
