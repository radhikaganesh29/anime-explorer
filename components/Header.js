import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-4 sm:px-8 py-4">
      <div className="relative flex items-center justify-center">
        {/* Centered Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-pink-600 text-center">
          Anime Explorer
        </h1>

        {/* Right-aligned link */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <Link
            href="/favorites"
            className="text-pink-600 font-medium hover:underline text-lg"
          >
            ⭐ View Favorites
          </Link>
        </div>
      </div>
    </header>
  );
}
