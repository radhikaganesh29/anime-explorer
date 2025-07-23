import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toggleFavorite, getFavorites } from '../utils/favorites';
import Header from '../components/Header';


export default function FavoritesPage() {
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favIds = getFavorites();

    if (favIds.length === 0) {
      setAnimeData([]);
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const requests = favIds.map((id) =>
          fetch(`https://api.jikan.moe/v4/anime/${id}`).then((res) => res.json())
        );
        const responses = await Promise.all(requests);
        const animeList = responses.map((res) => res.data);
        setAnimeData(animeList);
      } catch (err) {
        console.error('Error fetching favorite anime:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <>
  
    <Header />
      <main className="pt-28 min-h-screen bg-gray-100 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-pink-600 mb-6">Your Favorite Anime</h1>
        <div className="text-center mb-10">
          <Link href="/" className="text-pink-500 hover:underline">
            ← Back to Home
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading favorites...</p>
        ) : animeData.length === 0 ? (
          <p className="text-center text-gray-500">You haven’t favorited any anime yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {animeData.map((anime) => (
  <div key={anime.mal_id} className="relative bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition cursor-pointer h-[350px] flex flex-col">
    <button
      onClick={() => {
        const updated = toggleFavorite(anime.mal_id);
        setAnimeData((prev) => prev.filter((a) => updated.includes(a.mal_id)));
      }}
      className="absolute top-2 right-2 text-2xl z-10"
    >
      ❤️
    </button>
    <Link href={`/anime/${anime.mal_id}`} className="flex-grow flex flex-col">
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-3 flex-grow flex flex-col justify-between">
        <h2 className="text-sm font-semibold leading-tight line-clamp-2">{anime.title}</h2>
        <p className="text-xs text-gray-500">Score: {anime.score}</p>
      </div>
    </Link>
  </div>
))}

          </div>
        )}
      </div>
    </main>
    </>
  );
}
