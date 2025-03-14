import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import CafeListPage from "./pages/CafeListPage";
import CafeDetailsPage from "./pages/CafeDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProfilPage from "./pages/ProfilPage";
import ConnectionPage from "./pages/ConnectionPage";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? element : <Navigate to="/" />;
};

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <ConnectionPage />
          }
        />
        <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
        <Route path="/add" element={<PrivateRoute element={<AddPage />} />} />
        <Route
          path="/list"
          element={<PrivateRoute element={<CafeListPage />} />}
        />
        <Route
          path="/details/:id"
          element={<PrivateRoute element={<CafeDetailsPage />} />}
        />
        <Route
          path="/favorites"
          element={<PrivateRoute element={<FavoritesPage />} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute element={<ProfilPage />} />}
        />
      </Routes>
    </>
  );
}

export default App;
