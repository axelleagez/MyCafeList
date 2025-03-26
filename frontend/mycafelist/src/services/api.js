import axios from "axios";

const API_URL = "http://localhost:5091/api";

const api = {



/**
 * Inscription d'un nouvel utilisateur
 * @param {Object} credentials - Contient les informations d'inscription (Nom, Email, MotDePasse)
 */
register: async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, credentials);

    if (response.data && response.data.id && !isNaN(parseInt(response.data.id))) {
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("userEmail", response.data.email);
      return response.data;
    } else {
      throw new Error("Identifiant utilisateur manquant dans la réponse de l'API");
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    throw error;
  }
},


  /**
   * connexion d'un utilisateur
   * @param {Object} credentials - ses identifiants (Email, MotDePasse)
   */
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, credentials);

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
   * déconnexion de l'utilisateur
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
        console.log("Données envoyées :", cafeData);
        await axios.post(`${API_URL}/cafes`,cafeAvecUtilisateur);
    } catch (error) {
        console.error("Erreur lors de l'ajout d'un café :", error);
        throw error;
    }
},

deleteCafe: async (id) => {
  try {
    await axios.delete(`${API_URL}/cafes/${id}`);
    console.log(`Café ${id} supprimé avec succès.`);
  } catch (error) {
    console.error("Erreur lors de la suppression du café :", error);
    throw error;
  }
},


deleteAccount: async () => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("Utilisateur non connecté");

    await axios.delete(`${API_URL}/users/${userId}`);

    localStorage.clear();
    window.location.href = "/";
  } catch (error) {
    console.error("Erreur lors de la suppression du compte :", error);
    throw error;
  }
},

getUserCafes: async () => {
  try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("Utilisateur non connecté");

      const response = await axios.get(`${API_URL}/cafes/user/${userId}`);
      return response.data;
  } catch (error) {
      console.error("Erreur lors de la récupération des cafés de l'utilisateur :", error);
      throw error;
  }
},

getCafeById: async (id) => {
  try {
    const response = await axios.get(`${API_URL}/cafes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails du café :", error);
    throw error;
  }
},

toggleFavorite: async (cafeId) => {
  try {
    const response = await axios.put(`${API_URL}/cafes/favorite/${cafeId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors du changement de statut favori :", error);
    throw error;
  }
},

updateCafe: async (id, cafeData) => {
  try {
    await axios.put(`${API_URL}/cafes/${id}`, cafeData);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du café :", error);
    throw error;
  }
},

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

updateUserMode: async (updatedUser) => {
  try {
    const response = await axios.put(`${API_URL}/users/${updatedUser.id}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    throw error;
  }
},

}


export default api;
