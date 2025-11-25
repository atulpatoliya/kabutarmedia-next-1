"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import NavMenu from "./NavMenu";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-zinc-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span>Welcome to KabutarMedia</span>
          <span className="hidden sm:inline">Premium News Portal</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-zinc-800 border-b-2 border-red-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Row: Logo + Search + Actions */}
          <div className="flex items-center justify-between py-3">
            {/* Logo & Branding */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg">
                K
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xl font-black text-red-600">KabutarMedia</span>
                <span className="text-xs text-gray-500">Breaking News</span>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xs mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-zinc-700 text-sm border border-gray-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchActive(!searchActive)}
                className="md:hidden text-gray-600 hover:text-red-600 dark:hover:text-red-500 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <button className="hidden sm:inline px-4 py-2 bg-red-600 text-white rounded-full text-xs font-bold hover:bg-red-700 transition-colors">
                LIVE TV
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden text-gray-600 hover:text-red-600 dark:hover:text-red-500 transition-colors"
              >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {searchActive && (
            <div className="md:hidden pb-3">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search news..."
                  autoFocus
                  className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-zinc-700 text-sm border border-gray-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
              </div>
            </div>
          )}

          {/* Navigation Menu */}
          <NavMenu />
        </div>
      </header>

      {/* Mobile Menu */}
      {open && <MobileMenu open={open} onClose={() => setOpen(false)} />}
    </>
  );
}

