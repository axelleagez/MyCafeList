import React, { useState, useEffect } from "react";
import { Box, Button, Container, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupération des cafés depuis l'API
  useEffect(() => {
    axios.get("http://localhost:5000/api/cafes") // 🔥 Mets l'URL de ton API
      .then(response => {
        setCafes(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des cafés :", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>{/*texte de présentation*/}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          minHeight: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">
          Bienvenue sur MyCaféList ! 
          Une application dédiée aux amateurs de cafés pour enregistrer, organiser et partager leurs lieux favoris.
        </Typography>
      </Box>

      <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}> {/*deux boutons*/}
        <Button
          variant="contained"
          size="large"
          sx={{ padding: 2 }}
          onClick={() => navigate("/add")}
        >
          Ajouter un café à ma liste
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{ padding: 2 }}
          onClick={() => navigate("/list")}
        >
          Voir la liste de cafés à visiter
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
