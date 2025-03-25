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
  Paper,
} from "@mui/material";

const ConnectionPage = () => {
  const [tab, setTab] = useState(0); // 0 = Connexion, 1 = Inscription
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Nom: "",
    Email: "",
    MotDePasse: "",
  });
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTab = (value) => {
    setTab(value);
    setIsLoginMode(!isLoginMode);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = isLoginMode
        ? await api.login(formData)
        : await api.register(formData);
      if (response.id) {
        login(response.id);
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
    <Container maxWidth="sm" sx={{ minHeight: "100vh", pt: 4, pb: 10 }}>
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

      {/* onglets pour basculer entre Connexion et Inscription */}
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

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* formulaire */}
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
      </Paper>
    </Container>
  );
};

export default ConnectionPage;
