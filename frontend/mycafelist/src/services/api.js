//ce document définit l'objet api qui centralise tous les appels et qui interagit avec l'API

import axios from "axios";

const API_URL = "http://localhost:5091/api";

const api = {
  //inscription d'un nouvel utilisateur
  register: async (credentials) => {
    try {
      // envoi d'une requête POST
      const response = await axios.post(
        `${API_URL}/users/register`,
        credentials
      );

      // vérification que la réponse contient un id user valide puis stockage dans le localstorage
      if (
        response.data &&
        response.data.id &&
        !isNaN(parseInt(response.data.id))
      ) {
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("userEmail", response.data.email);
        return response.data;
      } else {
        throw new Error(
          "Identifiant utilisateur manquant dans la réponse de l'API"
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      throw error;
    }
  },

  //connexion d'un utilisateur
  login: async (credentials) => {
    try {
      //envoi d'une requête POST
      const response = await axios.post(`${API_URL}/users/login`, credentials);

      // vérification de la présence d'un id user valide puis stockage dans le localstorage
      if (
        response.data &&
        response.data.id &&
        !isNaN(parseInt(response.data.id))
      ) {
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("userEmail", response.data.email);
      } else {
        throw new Error(
          "Identifiant utilisateur manquant dans la réponse de l'API"
        );
      }
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      throw error;
    }
  },

  //déconnexion de l'utilisateur
  logout: () => {
    // vidage entier du localStorage puis redirection vers la page d'accueil après un court délai
    localStorage.clear();
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  },

  //ajout d'un café en associant l'id de l'utilisateur connecté
  addCafe: async (cafeData) => {
    try {
      // on récupère l'id de l'utilisateur dans le localstorage
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("Utilisateur non connecté");

      // on fusionne les données du café avec l'id de l'utilisateur sous forme d'entier
      const cafeAvecUtilisateur = { ...cafeData, IdUser: parseInt(userId) };
      console.log("Données envoyées :", cafeData);
      await axios.post(`${API_URL}/cafes`, cafeAvecUtilisateur);
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un café :", error);
      throw error;
    }
  },

  //suppression d'un café par son id
  deleteCafe: async (id) => {
    try {
      await axios.delete(`${API_URL}/cafes/${id}`);
      console.log(`Café ${id} supprimé avec succès.`);
    } catch (error) {
      console.error("Erreur lors de la suppression du café :", error);
      throw error;
    }
  },

  //suppression du compte utilisateur
  deleteAccount: async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("Utilisateur non connecté");

      await axios.delete(`${API_URL}/users/${userId}`);

      // vidage du localstorage et redirection vers la page d'accueil
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.error("Erreur lors de la suppression du compte :", error);
      throw error;
    }
  },

  //récupération des cafés de l'utilisateur connecté
  getUserCafes: async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("Utilisateur non connecté");

      const response = await axios.get(`${API_URL}/cafes/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des cafés de l'utilisateur :",
        error
      );
      throw error;
    }
  },

  //récupération des détails d'un café par son id
  getCafeById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/cafes/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du café :",
        error
      );
      throw error;
    }
  },

  //basculement du statut favori d'un café
  toggleFavorite: async (cafeId) => {
    try {
      // envoi d'une requête "put" à l'endpoint dédié pour basculer le statut favori de son café
      const response = await axios.put(`${API_URL}/cafes/favorite/${cafeId}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors du changement de statut favori :", error);
      throw error;
    }
  },

  //mise à jour des informations d'un café par son id
  updateCafe: async (id, cafeData) => {
    try {
      await axios.put(`${API_URL}/cafes/${id}`, cafeData);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du café :", error);
      throw error;
    }
  },

  //récupération du profil de l'utilisateur connecté
  getUserProfile: async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("Utilisateur non connecté");

      const response = await axios.get(`${API_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
      throw error;
    }
  },

  //mise à jour du mode privé de l'utilisateur
  updateUserMode: async (updatedUser) => {
    try {
      const response = await axios.put(
        `${API_URL}/users/${updatedUser.id}`,
        updatedUser
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      throw error;
    }
  },

  //récupération de la liste de tous les utilisateurs
  getUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      throw error;
    }
  },

  //récupération des favoris d'un utilisateur non connecté, en filtrant les cafés avec un favStatus à "true"
  getUserFavorites: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/cafes/user/${userId}`);
      const favoritesOnly = response.data.filter((cafe) => cafe.favStatus); // filtrage favoris
      return favoritesOnly;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des favoris de l'utilisateur :",
        error
      );
      throw error;
    }
  },
};

export default api;
