import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import CafeListPage from "./pages/CafeListPage";
import CafeDetailsPage from "./pages/CafeDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProfilPage from "./pages/ProfilPage";
import ConnectionPage from "./pages/ConnectionPage";

function App() {
  const isAuthenticated = localStorage.getItem("userId"); // vérification si l'utilisateur est connecté

  return (
    <>
      {isAuthenticated && <Navbar />} {/* affichage Navbar seulement si connecté */}
    
      <Routes>
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/add" element={isAuthenticated ? <AddPage /> : <Navigate to="/login" />} />
        <Route path="/list" element={isAuthenticated ? <CafeListPage /> : <Navigate to="/login" />} />
        <Route path="/details/:id" element={isAuthenticated ? <CafeDetailsPage /> : <Navigate to="/login" />} />
        <Route path="/favorites" element={isAuthenticated ? <FavoritesPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<ConnectionPage />} />
      </Routes>
    </>
  );
}

export default App;
