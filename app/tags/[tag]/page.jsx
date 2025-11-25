"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function TagPage({ params }) {
  const [loading, setLoading] = useState(false);

  // TODO: Fetch posts by tag from API
  
  return (
    <Container className="py-8">
      <h1 className="text-4xl font-bold mb-4">Tag: #{params.tag}</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-8">Posts tagged with "{params.tag}"</p>
      
      {/* List posts tagged with this tag */}
      <div className="space-y-4">
        {/* Posts will be displayed here */}
        <p className="text-center text-zinc-500">Tag feature coming soon</p>
      </div>
    </Container>
  );
}
