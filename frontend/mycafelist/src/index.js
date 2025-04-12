//ce document est le point d'entrée de l'app React
//il monte l'ensemble de l'application en enveloppant le composan App dans les providers et le router

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; 
import { FavoritesProvider } from "./contexts/FavoritesContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FavoritesProvider>
    </AuthProvider>
  </React.StrictMode>
);
