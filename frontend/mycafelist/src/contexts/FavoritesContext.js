// import { createContext, useContext, useState, useEffect } from 'react';
// import api from '../services/api';

// const FavoritesContext = createContext();

// export const useFavorites = () => useContext(FavoritesContext);

// export const FavoritesProvider = ({ children }) => {
//   const [cafes, setCafes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCafes = async () => {
//       try {
//         const data = await api.getUserCafes();
//         setCafes(data);
//       } catch (error) {
//         console.error("Erreur chargement cafés favoris", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchCafes();
//   }, []);

//   const toggleFavorite = async (id) => {
//     const updatedCafe = await api.toggleFavorite(id);
//     setCafes(prevCafes => prevCafes.map((cafe) => cafe.id === id ?  { ...cafe, statutFav: updatedCafe.statutFav } : cafe));
//   };

//   return (
//     <FavoritesContext.Provider value={{ cafes, toggleFavorite, isLoading }}>
//       {children}
//     </FavoritesContext.Provider>
//   );
// };
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [cafes, setCafes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCafes = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.getUserCafes();
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
    const updatedCafe = await api.toggleFavorite(id);
    setCafes((prevCafes) =>
      prevCafes.map((cafe) =>
        cafe.id === id ? { ...cafe, statutFav: updatedCafe.statutFav } : cafe
      )
    );
  };

  const isFavorite = (id) => cafes.some(c => c.id === id && c.statutFav);

  return (
    <FavoritesContext.Provider value={{ cafes, toggleFavorite, isFavorite, fetchCafes, isLoading }}>
      {children}
    </FavoritesContext.Provider>
  );
};
