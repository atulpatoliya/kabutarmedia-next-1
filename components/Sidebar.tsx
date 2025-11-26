"use client";

import Link from "next/link";
import { Play, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
    const liveUpdates = [
        { time: "10:30 AM", text: "Sensex jumps 500 points in early trade" },
        { time: "10:15 AM", text: "PM Modi to address the nation today" },
        { time: "09:45 AM", text: "Heavy rains predicted in Mumbai" },
        { time: "09:30 AM", text: "India wins cricket match against Australia" },
    ];

    return (
        <div className="space-y-8">
            {/* Live TV Widget */}
            <div className="bg-black text-white p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
                        Live TV
                    </h3>
                    <Link href="/live-tv" className="text-xs text-gray-400 hover:text-white">View All</Link>
                </div>
                <div className="relative aspect-video bg-zinc-800 rounded overflow-hidden mb-3 group cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 text-white fill-current" />
                        </div>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 font-bold uppercase">Live</div>
                </div>
                <p className="text-sm font-medium">Watch Aaj Tak Live 24x7</p>
            </div>

            {/* Live Updates */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                <div className="bg-red-600 text-white p-3 font-bold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Live Updates
                </div>
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {liveUpdates.map((update, i) => (
                        <div key={i} className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                            <span className="text-red-600 text-xs font-bold block mb-1">{update.time}</span>
                            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{update.text}</p>
                        </div>
                    ))}
                </div>
                <div className="p-3 text-center border-t border-zinc-100 dark:border-zinc-800">
                    <Link href="/live-updates" className="text-sm text-red-600 font-bold hover:underline">Read More</Link>
                </div>
            </div>

            {/* Ad Placeholder */}
            <div className="bg-zinc-100 dark:bg-zinc-800 h-[250px] flex items-center justify-center border border-dashed border-zinc-300 dark:border-zinc-600 text-zinc-400 text-sm">
                Advertisement (300x250)
            </div>
        </div>
    );
}
