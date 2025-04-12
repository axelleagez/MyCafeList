//ce document crée un contexte pour les cafés favoris
//l'objectif est de  gérer et partager l'état des cafés favoris et les fonctions nécessaires

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from '../services/api';

//création du contexte
const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

//détails des composants, stockage liste des cafés et indicateur de chargement
export const FavoritesProvider = ({ children }) => {
  const [cafes, setCafes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //fonction pour récupérer les cafés de l'utilisateur
  const fetchCafes = useCallback(async () => {
    // pour éviter une erreur de console, d'abord on vérifie si l'utilisateur est connecté, sinon on retourne une liste vide
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setCafes([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const data = await axios.getUserCafes(); // appel à API
      setCafes(data);
    } catch (error) {
      console.error("Erreur chargement cafés :", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  
  // useEffect qui appelle la fonction fetchCafes au montage ou quand celle-ci change
  useEffect(() => {
    fetchCafes();
  }, [fetchCafes]);

  //fonction pour basculer le statut favori d'un café
  const toggleFavorite = async (id) => {
    const updatedCafe = await axios.toggleFavorite(id); //appel à API
    setCafes((prevCafes) =>
      prevCafes.map((cafe) =>
        cafe.id === id ? { ...cafe, favStatus: updatedCafe.favStatus } : cafe
      )
    );
  };

  //fonction pour vérifier si un café est favori
  const isFavorite = (id) => cafes.some(c => c.id === id && c.favStatus);
  
  //on retourne le context à ses composants enfants
  return (
    <FavoritesContext.Provider value={{ cafes, toggleFavorite, isFavorite, fetchCafes, isLoading }}>
      {children}
    </FavoritesContext.Provider>
  );
};
