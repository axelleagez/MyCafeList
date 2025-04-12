//ce document définit la page de connexion et d'inscription
//elle permet à l'utilisateur de se connecter ou de créer un compte via un formulaire

import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Tab,
  Tabs,
  Alert,
  Paper,
} from "@mui/material";

//composants de la page
const ConnectionPage = () => {
  const [tab, setTab] = useState(0); // 0 = Connexion, 1 = Inscription
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState("");

  //fonction pour mettre à jour le formulaire à chaque changement d'un champ
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //fonction pour changer d'onglet et choisir entre connexion et inscription
  const handleTab = (value) => {
    setTab(value);
    setIsLoginMode(!isLoginMode);
  };

  //fonction pour gérer l'envoi du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      //plusieurs appels selon le mode connexion ou inscription
      const response = isLoginMode
        ? await axios.login(formData)
        : await axios.register(formData);
      if (response.id) {
        login(response.id);
        navigate("/home");
      } else {
        setError("Échec de l'authentification.");
      }
    } catch (err) {
      setError(err.response?.data || "Erreur lors de l'authentification.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", pt: 4, pb: 10 }}>
      {/* affichage du logo */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 4 }}>
        <img
          src="logo.png"
          alt="Logo MyCafeList"
          style={{
            maxWidth: "150px",
            height: "auto",
          }}
        />
      </Box>

      {/* titre dynamique en fonction de l'onglet actif */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Modak, cursive",
          color: "#095d40",
          textAlign: "center",
          mb: 2,
        }}
      >
        {tab === 0 ? "Connexion" : "Inscription"}
      </Typography>

      {/* onglets pour basculer entre connexion et inscription */}
      <Tabs
        value={tab}
        onChange={(event, newValue) => handleTab(newValue)}
        centered
        textColor="primary"
        indicatorColor="primary"
        sx={{
          mb: 3,
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 500,
          },
        }}
      >
        <Tab label="Se Connecter" />
        <Tab label="S'inscrire" />
      </Tabs>

      {/* affichage d'un message d'erreur si besoin */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* formulaire de connexion / inscription */}
      <Paper
        elevation={1}
        sx={{
          p: 4,
          borderRadius: 4,
          backgroundColor: "#f8f8ec",
          border: "1px solid #d8dbae",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* champ "nom" affiché uniquement en mode inscription */}
          {tab === 1 && (
            <TextField
              label="Nom"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              required
              fullWidth
            />
          )}
          <TextField
            label="Email"
            name="Email"
            type="email"
            value={formData.Email}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Mot de passe"
            name="Password"
            type="password"
            value={formData.Password}
            onChange={handleChange}
            required
            fullWidth
          />

          {/* bouton de soumission avec un libellé différent selon le mode */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {tab === 0 ? "Se connecter" : "Créer un compte"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ConnectionPage;
