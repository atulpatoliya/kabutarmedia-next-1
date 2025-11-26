"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Search, X, Bell, User } from "lucide-react";
import Container from "@/components/ui/Container";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "India", href: "/category/india" },
    { name: "World", href: "/category/world" },
    { name: "Video", href: "/videos" },
    { name: "Movie", href: "/category/entertainment" },
    { name: "Tech", href: "/category/tech" },
    { name: "Sports", href: "/category/sports" },
    { name: "Business", href: "/category/business" },
    { name: "Education", href: "/category/education" },
    { name: "Astrology", href: "/category/astrology" },
  ];

  return (
    <header className="flex flex-col w-full font-sans">
      {/* Top Bar - Black */}
      <div className="bg-black text-white text-xs py-1 hidden md:block">
        <Container className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="text-gray-400">|</span>
            <Link href="#" className="hover:text-red-500 transition-colors">Hindi</Link>
            <Link href="#" className="hover:text-red-500 transition-colors">English</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-red-500">App Download</Link>
            <div className="flex gap-2">
              {/* Social Icons placeholders */}
              <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
              <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
              <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Header - White */}
      <div className="bg-white py-4 border-b border-gray-100">
        <Container className="flex justify-between items-center h-[90px]">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-black text-white p-2 font-bold text-3xl tracking-tighter">
                AAJ<span className="text-red-600">TAK</span>
              </div>
            </Link>
          </div>

          {/* Ad Placeholder / Search */}
          <div className="hidden md:flex items-center gap-6">
            <div className="w-[728px] h-[90px] bg-gray-50 flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-200">
              Advertisement (728x90)
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            <Search className="w-5 h-5" />
            <Bell className="w-5 h-5" />
          </div>
        </Container>
      </div>

      {/* Navigation Bar - Red (Sticky) */}
      <div className={`bg-aajtak-red text-white transition-all duration-300 z-50 ${isScrolled ? 'fixed top-0 left-0 right-0 shadow-md' : 'relative'}`}>
        <Container>
          <nav className="flex items-center justify-between h-[50px]">
            <ul className="flex items-center gap-8 overflow-x-auto no-scrollbar h-full whitespace-nowrap text-sm font-bold">
              <li className="flex items-center h-full">
                <Link href="/" className="hover:bg-red-700 px-2 h-full flex items-center">Home</Link>
              </li>
              {navLinks.map((link) => (
                <li key={link.name} className="flex items-center h-full">
                  <Link href={link.href} className="hover:bg-red-700 px-2 h-full flex items-center uppercase tracking-wide">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden md:flex items-center gap-4 pl-4 border-l border-red-400 h-3/5 my-auto">
              <button className="hover:bg-red-700 p-2 rounded-full">
                <Search className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 bg-white text-red-600 px-4 py-1 rounded-full text-xs font-bold hover:bg-gray-100">
                <User className="w-3 h-3" />
                Login
              </button>
            </div>
          </nav>
        </Container>
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
      />
    </header>
  );
}
