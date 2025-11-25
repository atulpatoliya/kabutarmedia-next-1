"use client";
import Link from "next/link";
export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = [
    { label: "Home", href: "/" },
    { label: "India", href: "/category/india" },
    { label: "World", href: "/category/world" },
    { label: "Politics", href: "/category/politics" },
    { label: "Business", href: "/category/business" },
    { label: "Sports", href: "/category/sports" },
    { label: "Tech", href: "/category/technology" },
    { label: "Lifestyle", href: "/category/lifestyle" },
    { label: "Health", href: "/category/health" },
    { label: "Education", href: "/category/education" },
    { label: "Videos", href: "/videos" }
  ];
  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <div className={`absolute inset-0 bg-black/40 ${open ? "" : "opacity-0"}`} onClick={onClose} />
      <div className={`absolute top-0 right-0 h-full w-80 bg-white p-6 transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold">Menu</div>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="grid gap-3">
          {items.map(i => (
            <Link key={i.href} href={i.href} onClick={onClose} className="text-base">
              {i.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

