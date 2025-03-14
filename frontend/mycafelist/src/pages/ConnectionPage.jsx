import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Tab,
  Tabs,
  Alert,
} from "@mui/material";

const ConnectionPage = () => {
  const [tab, setTab] = useState(0); // 0 = Connexion, 1 = Inscription
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ Email: "", MotDePasse: "" });
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = isLoginMode
        ? await api.login(formData)
        : await api.register(formData);
      console.log(response);
      if (response.id) {
        login(response.id);
        console.log(response);
        navigate("/home");
      } else {
        setError("Échec de l'authentification.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors de l'authentification."
      );
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
      <Tabs
        value={tab}
        onChange={(event, newValue) => setTab(newValue)}
        centered
      >
        <Tab label="Se Connecter" />
        <Tab label="S'inscrire" />
      </Tabs>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* formulaire */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
      >
        {tab === 1 && (
          <TextField
            label="Nom"
            name="Nom"
            value={formData.Nom}
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
          name="MotDePasse"
          type="password"
          value={formData.MotDePasse}
          onChange={handleChange}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          {tab === 0 ? "Se connecter" : "Créer un compte"}
        </Button>
      </Box>
    </Container>
  );
};

export default ConnectionPage;
