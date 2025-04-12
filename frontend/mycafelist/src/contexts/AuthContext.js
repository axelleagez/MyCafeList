//ce document crée un contexte d'authentification pour toute l'application
//l'objectif est de gérer les connexions sur l'application

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

//initialisation de l'état "isAuthenticated"
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("userId")
  );

  // useEffect pour mettre à jour l'état d'authentification si modification, on vérfiei si l'utilisateur est authentifié
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("userId"));
    };

    //on met un écouteur d'événement sur les chanfements de stockae 
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  //fonction pour connecter un utilisateur qui met à jour le localstorage
  const login = (userId) => {
    localStorage.setItem("userId", userId);
    setIsAuthenticated(true);
    window.dispatchEvent(new Event("storage"));
  };

  //fonction pour déconnecter l'utilisateur qui supprime l'id de l'utilisateur du localstorage
  const logout = () => {
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    window.dispatchEvent(new Event("storage"));
  };

  //on retourne le context à ses composants enfants
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
