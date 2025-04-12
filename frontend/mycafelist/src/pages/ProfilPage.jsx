//ce document définit la page de profil
//elle permet d'afficher les infos du profil, de se déconnecter, de changer le mode privé ou de supprimer le compte

import {
  Container,
  Typography,
  Button,
  Box,
  Switch,
  Paper,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";

//composants de la page
const ProfilPage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // useEffect pour récupérer les infos du profil
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

  // fonction pour déconnecter l'utilisateur et le rediriger vers la page d'accueil
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // fonction pour supprimer le compte après confirmation utilisateur
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
    <Container maxWidth="sm" sx={{ minHeight: "100vh", pt: 4, pb: 10 }}>
      {/* titre de la page de profil */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Modak, cursive",
          color: "#095d40",
          textAlign: "center",
          mb: 3,
        }}
      >
        Mon Profil
      </Typography>

      {/* affichage conditionnel ie donner les données sinon etre en chargement */}
      {user ? (
        <Paper
          elevation={1}
          sx={{
            backgroundColor: "#f8f8ec",
            border: "1px solid #d8dbae",
            borderRadius: 4,
            p: 4,
            textAlign: "left",
          }}
        >
          {/* affichage des infos de l'utilisateur */}
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Nom :</strong> {user.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email :</strong> {user.email}
          </Typography>
          {/* affichage du mode privé avec un interrupteur pour le changer */}
          <Typography variant="body1" sx={{ mb: 3 }}>
            <strong>Mode privé :</strong>{" "}
            <Switch
              checked={user.privateMode}
              onChange={async () => {
                try {
                  // pour inverser le mode privé et mettre à jour l'user via l'API
                  const updatedUser = {
                    ...user,
                    privateMode: !user.privateMode,
                  };
                  await axios.updateUserMode(updatedUser);
                  setUser(updatedUser);
                } catch (error) {
                  console.error(
                    "Erreur lors du changement de mode privé :",
                    error
                  );
                }
              }}
            />
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* bouton pour se déconnecter */}
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Se déconnecter
            </Button>
            {/* bouton pour supprimer son compte */}
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteAccount}
            >
              Supprimer mon compte
            </Button>
          </Box>
        </Paper>
      ) : (
        <Typography textAlign="center">
          Chargement des informations...
        </Typography>
      )}
      {/* logo affiché en bas de page */}
      <Box
        sx={{
          position: "fixed",
          bottom: 150,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="logo.png"
          alt="Logo bas de page"
          style={{ maxWidth: "120px" }}
        />
      </Box>
    </Container>
  );
};

export default ProfilPage;
