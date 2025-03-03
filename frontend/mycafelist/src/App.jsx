import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import CafeListPage from "./pages/CafeListPage";
import CafeDetailsPage from "./pages/CafeDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProfilPage from "./pages/ProfilPage";

function App() {
  return (
    <div>
    <h1>Hello World</h1>
      {/*<Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/list" element={<CafeListPage />} />
        <Route path="/details/:id" element={<CafeDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/profile" element={<ProfilPage />} />
      </Routes>*/}
    </div>
  );
}

export default App;
