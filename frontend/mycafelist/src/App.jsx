import React, { useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import style from "./services/style";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import SharePage from "./pages/SharePage";
import CafeListPage from "./pages/CafeListPage";
import CafeDetailsPage from "./pages/CafeDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProfilPage from "./pages/ProfilPage";
import ConnectionPage from "./pages/ConnectionPage";
import OthersCafeDetailsPage from "./pages/OthersCafeDetailsPage";
import { Box } from "@mui/material";
import ScrollToTop from "./components/ScrollToTop";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? element : <Navigate to="/" />;
};

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          overflowY: "auto",
          pb: 10, // marge pour la navbar
        }}
      >
        <ThemeProvider theme={style}>
          <ScrollToTop/>
          {isAuthenticated && <Navbar />}
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/home" /> : <ConnectionPage />
              }
            />
            <Route
              path="/home"
              element={<PrivateRoute element={<HomePage />} />}
            />
            <Route
              path="/add"
              element={<PrivateRoute element={<AddPage />} />}
            />
            <Route
              path="/share"
              element={<PrivateRoute element={<SharePage />} />}
            />
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
            <Route
              path="/othersdetails/:id"
              element={<PrivateRoute element={<OthersCafeDetailsPage />} />}
            />
          </Routes>
        </ThemeProvider>
      </Box>
    </>
  );
}

export default App;
