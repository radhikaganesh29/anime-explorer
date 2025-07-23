const FAVORITES_KEY = 'anime_favorites';

export function getFavorites() {
  if (typeof window === 'undefined') return [];
  const favs = localStorage.getItem(FAVORITES_KEY);
  return favs ? JSON.parse(favs) : [];
}

export function saveFavorites(favs) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}

export function toggleFavorite(id) {
  const favs = getFavorites();
  const isFav = favs.includes(id);
  const updated = isFav ? favs.filter(f => f !== id) : [...favs, id];
  saveFavorites(updated);
  return updated;
}
