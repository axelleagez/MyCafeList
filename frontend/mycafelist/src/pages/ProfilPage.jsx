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
    <Container maxWidth="sm" sx={{ minHeight: "100vh", pt: 4, pb: 10 }}>
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
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Nom :</strong> {user.nom}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email :</strong> {user.email}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            <strong>Mode privé :</strong>{" "}
            <Switch
              checked={user.modePrive}
              onChange={async () => {
                try {
                  const updatedUser = {
                    ...user,
                    modePrive: !user.modePrive,
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
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Se déconnecter
            </Button>
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
