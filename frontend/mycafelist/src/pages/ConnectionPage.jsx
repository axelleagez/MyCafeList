import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Box, Typography, Tab, Tabs, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConnectionPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0); // 0 = Connexion, 1 = Inscription
  const [formData, setFormData] = useState({
    Nom: "",
    Email: "",
    MotDePasse: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // si l'utilisateur est déjà connecté, redirection automatique vers HomePage
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      navigate("/");
    }
  }, [navigate]);

  // gestion des changements des champs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // soumission du formulaire (Connexion ou Inscription)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = tab === 0 ? "http://localhost:5091/api/users/login" : "http://localhost:5091/api/users/register";
      const response = await axios.post(url, formData);

      // stockage dans le localStorage de l'ID utilisateur
      localStorage.setItem("userId", response.data.Id);
      localStorage.setItem("userEmail", response.data.Email);

      setLoading(false);
      navigate("/"); // redirection vers page d'accueil
    } catch (err) {
      console.error("Erreur d'authentification :", err);
      setError("Échec de l'authentification. Vérifiez vos informations.");
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {tab === 0 ? "Connexion" : "Inscription"}
        </Typography>
      </Box>

      {/* onglets pour basculer entre Connexion et Inscription */}
      <Tabs value={tab} onChange={(event, newValue) => setTab(newValue)} centered>
        <Tab label="Se Connecter" />
        <Tab label="S'inscrire" />
      </Tabs>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {/* formulaire */}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        {tab === 1 && (
          <TextField label="Nom" name="Nom" value={formData.Nom} onChange={handleChange} required fullWidth />
        )}
        <TextField label="Email" name="Email" type="email" value={formData.Email} onChange={handleChange} required fullWidth />
        <TextField label="Mot de passe" name="MotDePasse" type="password" value={formData.MotDePasse} onChange={handleChange} required fullWidth />

        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? "En cours..." : tab === 0 ? "Se connecter" : "Créer un compte"}
        </Button>
      </Box>
    </Container>
  );
};

export default ConnectionPage;
