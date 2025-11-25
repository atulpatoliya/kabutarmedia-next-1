"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";

export default function ShareButtons({ url, title }) {
  const encodedUrl = encodeURIComponent(url || "");
  const encodedTitle = encodeURIComponent(title || "");

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-medium">Share:</span>
      <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" title="Share on WhatsApp">
        <Button variant="secondary" className="px-3 py-1 text-sm">💬 WhatsApp</Button>
      </a>
      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" title="Share on Facebook">
        <Button variant="secondary" className="px-3 py-1 text-sm">f Facebook</Button>
      </a>
      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" title="Share on X">
        <Button variant="secondary" className="px-3 py-1 text-sm">𝕏 X</Button>
      </a>
      <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" title="Share on LinkedIn">
        <Button variant="secondary" className="px-3 py-1 text-sm">in LinkedIn</Button>
      </a>
      <a href={shareLinks.telegram} target="_blank" rel="noopener noreferrer" title="Share on Telegram">
        <Button variant="secondary" className="px-3 py-1 text-sm">✈ Telegram</Button>
      </a>
    </div>
  );
}
