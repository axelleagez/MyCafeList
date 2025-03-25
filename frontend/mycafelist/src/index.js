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
