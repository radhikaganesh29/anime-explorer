import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';


export default function AnimeDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchAnime = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const data = await res.json();
        setAnime(data.data);
      } catch (err) {
        console.error('Error fetching anime:', err);
      }
    };
    fetchAnime();
  }, [id]);

  if (!anime) return <p className="text-center py-10">Loading...</p>;

  return (
    <>
  <Header />
    <main className="pt-28 px-4 py-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <Link href="/" className="text-pink-600 font-medium hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-pink-600 mb-6">{anime.title}</h1>

        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="rounded-xl w-full max-h-[500px] object-contain mb-6 shadow"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-6">
          <div className="bg-pink-100 text-pink-800 rounded-lg p-4 shadow">
            <p className="text-sm font-semibold">Episodes</p>
            <p className="text-lg font-medium">{anime.episodes || 'N/A'}</p>
          </div>
          <div className="bg-pink-100 text-pink-800 rounded-lg p-4 shadow">
            <p className="text-sm font-semibold">Score</p>
            <p className="text-lg font-medium">{anime.score || 'N/A'}</p>
          </div>
          <div className="bg-pink-100 text-pink-800 rounded-lg p-4 shadow">
            <p className="text-sm font-semibold">Status</p>
            <p className="text-lg font-medium">{anime.status || 'N/A'}</p>
          </div>
          <div className="bg-pink-100 text-pink-800 rounded-lg p-4 shadow">
            <p className="text-sm font-semibold">Rating</p>
            <p className="text-lg font-medium">{anime.rating || 'N/A'}</p>
          </div>
        </div>

        <div className="bg-pink-100 rounded-xl shadow p-6 my-6">
          <h3 className="text-lg font-semibold text-pink-800 mb-2">Synopsis</h3>
          <p className="text-pink-900 leading-relaxed text-justify">
            {anime.synopsis}
          </p>
        </div>

        {anime.trailer?.embed_url && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-pink-600 mb-2">Trailer:</h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={anime.trailer.embed_url}
                title="Anime Trailer"
                allowFullScreen
                className="w-full rounded-xl shadow"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </main>
    </>
  );
}
