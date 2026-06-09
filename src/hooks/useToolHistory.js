import { useState, useEffect, useCallback } from "react";

const RECENT_KEY = "toolkit_recent";
const FAVS_KEY = "toolkit_favorites";
const MAX_RECENT = 5;

export function useToolHistory() {
  const [recent, setRecent] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const r = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
      const f = JSON.parse(localStorage.getItem(FAVS_KEY) || "[]");
      setRecent(r);
      setFavorites(f);
    } catch {}
  }, []);

  const addRecent = useCallback((tool) => {
    setRecent(prev => {
      const filtered = prev.filter(t => t.path !== tool.path);
      const updated = [tool, ...filtered].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleFavorite = useCallback((tool) => {
    setFavorites(prev => {
      const isFav = prev.some(t => t.path === tool.path);
      const updated = isFav
        ? prev.filter(t => t.path !== tool.path)
        : [...prev, tool];
      localStorage.setItem(FAVS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isFavorite = useCallback((path) => {
    return favorites.some(t => t.path === path);
  }, [favorites]);

  return { recent, favorites, addRecent, toggleFavorite, isFavorite };
}