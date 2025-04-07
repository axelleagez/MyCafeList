import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from '../services/api';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [cafes, setCafes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCafes = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await axios.getUserCafes();
      setCafes(data);
    } catch (error) {
      console.error("Erreur chargement cafés :", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCafes();
  }, [fetchCafes]);

  const toggleFavorite = async (id) => {
    const updatedCafe = await axios.toggleFavorite(id);
    setCafes((prevCafes) =>
      prevCafes.map((cafe) =>
        cafe.id === id ? { ...cafe, favStatus: updatedCafe.favStatus } : cafe
      )
    );
  };

  const isFavorite = (id) => cafes.some(c => c.id === id && c.favStatus);

  return (
    <FavoritesContext.Provider value={{ cafes, toggleFavorite, isFavorite, fetchCafes, isLoading }}>
      {children}
    </FavoritesContext.Provider>
  );
};
