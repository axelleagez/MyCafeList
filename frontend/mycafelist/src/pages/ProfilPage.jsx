import { Container, Typography, Button, Box, Switch } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";

const ProfilPage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await axios.getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations utilisateur :",
          error
        );
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
      )
    ) {
      try {
        await axios.deleteAccount();
      } catch (error) {
        console.error("Erreur lors de la suppression du compte :", error);
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4">Mon Profil</Typography>

      {user ? (
        <>
          <Typography variant="body1">
            <strong>Nom :</strong> {user.nom}
          </Typography>
          <Typography variant="body1">
            <strong>Email :</strong> {user.email}
          </Typography>
          <Typography variant="body1">
            <strong>Mode privé :</strong>{" "}
            <Switch checked={user.modePrive} disabled />
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Se déconnecter
            </Button>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteAccount}
            >
              Supprimer mon compte
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="body1">Chargement des informations...</Typography>
      )}
    </Container>
  );
};

export default ProfilPage;
