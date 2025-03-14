import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, CircularProgress } from "@mui/material";
import api from "../services/api";

const CafeDetailsPage = () => {
  const { id } = useParams(); // Récupération de l'ID du café depuis l'URL
  const navigate = useNavigate();
  const [cafe, setCafe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCafeDetails = async () => {
      try {
        const cafeData = await api.getCafeById(id);
        setCafe(cafeData);
      } catch (error) {
        setError("Impossible de charger les détails du café.");
      } finally {
        setLoading(false);
      }
    };

    fetchCafeDetails();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4" gutterBottom>{cafe.Nom}</Typography>
        <Typography variant="body1">{cafe.Adresse}, {cafe.Ville}, {cafe.Pays}</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>{cafe.Description || "Aucune description disponible"}</Typography>
        {cafe.StatutFav && <Typography variant="body2" color="primary">❤️ Café Favori</Typography>}
        <Typography variant="h6" sx={{ mt: 2 }}>Note: {cafe.Note || "Non noté"}</Typography>
        <Typography variant="body2">{cafe.Commentaire || "Aucun commentaire"}</Typography>
      </Box>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>Retour</Button>
        <Button variant="contained" color="primary" onClick={() => navigate(`/edit/${cafe.Id}`)}>Modifier</Button>
      </Box>
    </Container>
  );
};

export default CafeDetailsPage;
