"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // TODO: Integrate with your email service
    console.log("Newsletter signup:", email);
    setEmail("");
    setMessage("Thanks for subscribing!");
    setTimeout(() => setMessage(""), 3000);
    setLoading(false);
  };

  return (
    <div className="bg-blue-600 text-white p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-2">Subscribe to Newsletter</h3>
      <p className="text-sm text-blue-100 mb-4">Get the latest news delivered to your inbox</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded bg-blue-500 placeholder-blue-200 text-white focus:outline-none focus:bg-blue-400"
          required
        />
        <Button variant="secondary" type="submit" disabled={loading} className="w-full">
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
      {message && <p className="text-sm text-green-200 mt-2">{message}</p>}
    </div>
  );
}
