import axios from "axios";

const API_URL = "http://localhost:5091/api/users";

const api = {
  /**
   * Inscription d'un utilisateur
   * @param {Object} userData - Données de l'utilisateur (Nom, Email, MotDePasse)
   */
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      localStorage.setItem("userId", response.data.Id);
      localStorage.setItem("userEmail", response.data.Email);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      throw error;
    }
  },

  /**
   * Connexion d'un utilisateur
   * @param {Object} credentials - Identifiants (Email, MotDePasse)
   */
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);

      if (response.data && response.data.id && !isNaN(parseInt(response.data.id))) {
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("userEmail", response.data.email);
    } else {
        throw new Error("Identifiant utilisateur manquant dans la réponse de l'API");
    }

      //localStorage.setItem("userId", response.data.Id);
      //localStorage.setItem("userEmail", response.data.Email);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      throw error;
    }
  },

  /**
   * Déconnexion de l'utilisateur
   */
  logout: () => {
    localStorage.clear(); //je vide le localstorage entièrement
    setTimeout(() => {
        window.location.href = "/";
    }, 100); //ajout d'un délai pcq peut etre que ça bug pcq il manque de temps
  },

  //ajout d'un café en prenant bien en compte l'id de l'utilisateur qui ajoute le café
  addCafe: async (cafeData) => {
    try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("Utilisateur non connecté");

        const cafeAvecUtilisateur = { ...cafeData, IdUser: parseInt(userId) };

        await axios.post(`${API_URL}/cafes`, cafeAvecUtilisateur);
    } catch (error) {
        console.error("Erreur lors de l'ajout d'un café :", error);
        throw error;
    }
},

  getUserCafes: async () => {
    try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("Utilisateur non connecté");

        const response = await axios.get(`${API_URL}/cafes`);
        return response.data.filter(cafe => cafe.IdUser === parseInt(userId));
    } catch (error) {
        console.error("Erreur lors de la récupération des cafés de l'utilisateur :", error);
        throw error;
    }
},

getUserFavorites: async () => {
    try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("Utilisateur non connecté");

        const response = await axios.get(`${API_URL}/cafes`);
        return response.data.filter(cafe => cafe.IdUser === parseInt(userId) && cafe.StatutFav === true);
    } catch (error) {
        console.error("Erreur lors de la récupération des favoris de l'utilisateur :", error);
        throw error;
    }
},

getCafeById: async (cafeId) => {
    try {
        const response = await axios.get(`${API_URL}/cafes/${cafeId}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération du café :", error);
        throw error;
    }
},

getUserProfile: async () => {
    try {
        const userId = localStorage.getItem("userId");

        if (!userId || userId === "undefined" || userId === "null") {
            console.error("Erreur : userId invalide ou utilisateur non connecté.");
            return null; // stop la requête si id invalide
        }

        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data; // Retourne les infos utilisateur
    } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
        throw error;
    }
},
}


export default api;
