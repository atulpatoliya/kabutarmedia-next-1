"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import { Facebook, Twitter, Youtube, Instagram, Smartphone } from "lucide-react";

const footerLinks = {
  news: [
    { label: "India", href: "/category/india" },
    { label: "World", href: "/category/world" },
    { label: "Business", href: "/category/business" },
    { label: "Tech", href: "/category/tech" },
    { label: "Sports", href: "/category/sports" },
    { label: "Entertainment", href: "/category/entertainment" },
    { label: "Astrology", href: "/category/astrology" },
  ],
  trending: [
    { label: "Live TV", href: "/live-tv" },
    { label: "Latest News", href: "/latest-news" },
    { label: "Breaking News", href: "/breaking-news" },
    { label: "Videos", href: "/videos" },
    { label: "Photos", href: "/photos" },
  ],
  corporate: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Complaint Redressal", href: "/complaint" },
  ]
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white pt-12 pb-6 font-sans">
      <Container>
        {/* Top Section: App Download & Social */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-8 mb-8 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-gray-800 p-3 rounded-full">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Download App</h4>
              <p className="text-gray-400 text-sm">Get latest news updates on your mobile</p>
            </div>
          </div>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Main Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h5 className="text-red-500 font-bold mb-4 uppercase tracking-wider text-sm">News</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              {footerLinks.news.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-red-500 font-bold mb-4 uppercase tracking-wider text-sm">Trending</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              {footerLinks.trending.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-red-500 font-bold mb-4 uppercase tracking-wider text-sm">Corporate</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              {footerLinks.corporate.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-red-500 font-bold mb-4 uppercase tracking-wider text-sm">Partner Sites</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">India Today</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Business Today</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cosmopolitan</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">The Lallantop</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p className="mb-2">Copyright © {currentYear} Living Media India Limited. For reprint rights: Syndications Today</p>
          <div className="flex justify-center gap-4 text-xs">
            <Link href="#" className="hover:text-gray-300">Privacy Policy</Link>
            <span>|</span>
            <Link href="#" className="hover:text-gray-300">Terms & Conditions</Link>
            <span>|</span>
            <Link href="#" className="hover:text-gray-300">Correction Policy</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
