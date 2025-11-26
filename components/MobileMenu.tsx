"use client";
import Link from "next/link";
export default function MobileMenu({ isOpen, onClose, links }: { isOpen: boolean; onClose: () => void; links: { name: string; href: string }[] }) {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}>
      <div className={`absolute inset-0 bg-black/40 ${isOpen ? "" : "opacity-0"}`} onClick={onClose} />
      <div className={`absolute top-0 left-0 h-full w-80 bg-white p-6 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div className="text-xl font-bold text-red-600">MENU</div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">✕</button>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/" onClick={onClose} className="text-base font-medium py-2 px-4 hover:bg-gray-50 rounded-lg">
            Home
          </Link>
          {links.map(i => (
            <Link key={i.href} href={i.href} onClick={onClose} className="text-base font-medium py-2 px-4 hover:bg-gray-50 rounded-lg">
              {i.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

