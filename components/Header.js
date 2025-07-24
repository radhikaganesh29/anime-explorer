// components/Header.js

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50 px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        {/* Anime Explorer centered on mobile, left on desktop */}
        <h1 className="text-2xl font-bold text-pink-600 text-center sm:text-left">
          Anime Explorer
        </h1>

        {/* Favorites link right on desktop, centered under title on mobile */}
        <Link
          href="/favorites"
          className="mt-2 sm:mt-0 text-pink-600 text-sm sm:text-base hover:underline"
        >
          ⭐ View Favorites
        </Link>
      </div>
    </header>
  );
}
