import {
  Container,
  Typography,
  Button,
  Box,
} from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const ProfilPage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      try {
        await api.deleteAccount();
      } catch (error) {
        console.error("Erreur lors de la suppression du compte :", error);
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4">Mon Profil</Typography>
      <Typography variant="body1">
        Email : {localStorage.getItem("userEmail")}
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Se déconnecter
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="error" onClick={handleDeleteAccount}>
          Supprimer mon compte
        </Button>
      </Box>
    </Container>
  );
};

export default ProfilPage;
