import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getFavorites,
  toggleFavorite,
} from '../utils/favorites';
import Header from '../components/Header';

export default function Home() {
  const [anime, setAnime] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const fetchAnime = async (search = '', pageNum = 1) => {
    try {
      setLoading(true);
      const res = await fetch(
        search
          ? `https://api.jikan.moe/v4/anime?q=${search}&page=${pageNum}`
          : `https://api.jikan.moe/v4/top/anime?page=${pageNum}`
      );
      const data = await res.json();

      if (!data.data || data.data.length === 0) {
        setHasMore(false);
        return;
      }

      if (pageNum === 1) {
        setAnime(data.data);
      } else {
        setAnime((prev) => [...prev, ...data.data]);
      }
    } catch (err) {
      console.error('Error fetching anime:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime('', 1);
    setFavorites(getFavorites());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentQuery = query.trim();
    setPage(1);
    setHasMore(true);
    setAnime([]);
    fetchAnime(currentQuery, 1);
  };

  const handleFavoriteClick = (id) => {
    const updated = toggleFavorite(id);
    setFavorites(updated);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        !loading &&
        hasMore
      ) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchAnime(query.trim(), nextPage);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, loading, hasMore, query]);

  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen bg-gradient-to-br from-gray-100 to-pink-100 px-4 py-6">
        <div className="max-w-7xl mx-auto">

          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto mb-10 flex flex-col sm:flex-row gap-2 sm:gap-0 shadow-md rounded-lg overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search anime..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="p-3 text-lg outline-none flex-grow"
            />
            <button
              type="submit"
              className="bg-pink-600 text-white px-6 py-3 text-lg hover:bg-pink-700 transition sm:rounded-l-none"
            >
              Search
            </button>
          </form>

          {loading && anime.length === 0 ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {anime.map((item) => (
                <Link href={`/anime/${item.mal_id}`} key={item.mal_id}>
                  <div className="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition w-full h-[370px] flex flex-col">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleFavoriteClick(item.mal_id);
                      }}
                      className="absolute top-2 right-2 text-2xl z-10"
                    >
                      {favorites.includes(item.mal_id) ? '❤️' : '🤍'}
                    </button>
                    <img
                      src={item.images.jpg.image_url}
                      alt={item.title}
                      className="w-full h-48 sm:h-56 object-cover"
                    />
                    <div className="p-3 flex-grow flex flex-col justify-between">
                      <h2 className="text-sm sm:text-base font-semibold leading-tight line-clamp-2">{item.title}</h2>
                      <p className="text-xs text-gray-500">Score: {item.score}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {loading && anime.length > 0 && (
            <p className="text-center text-gray-500 mt-4">Loading more...</p>
          )}
        </div>
      </main>
    </>
  );
}
