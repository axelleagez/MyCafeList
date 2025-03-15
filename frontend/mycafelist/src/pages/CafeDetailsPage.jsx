import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import api from "../services/api";

const CafeDetailsPage = () => {
  const { id } = useParams(); // recup id depuis url
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
        setError(
          error.response?.data || "Impossible de charger les détails du café."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCafeDetails();
  }, [id]);

  if (loading)
    return (
      <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />
    );
  if (error)
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 5 }}>
        {error}
      </Typography>
    );

  if (!cafe) {
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 5 }}>
        Café introuvable.
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold", mt:3 }}>
          {cafe.nom}
        </Typography>

        <List>
        <ListItem><ListItemText primary="Adresse" secondary={cafe.adresse} /></ListItem>
          <ListItem><ListItemText primary="Ville" secondary={cafe.ville} /></ListItem>
          <ListItem><ListItemText primary="Pays" secondary={cafe.pays} /></ListItem>
          <ListItem><ListItemText primary="Description" secondary={cafe.description || "Aucune description disponible"} /></ListItem>
          <ListItem><ListItemText primary="Note" secondary={cafe.note || "Non noté"} /></ListItem>
          <ListItem><ListItemText primary="Commentaire" secondary={cafe.commentaire || "Aucun commentaire"} /></ListItem>
          <ListItem><ListItemText primary="Statut Favori" secondary={cafe.statutFav ? "❤️ Oui" : "❌ Non"} /></ListItem>
        </List>
      </Paper>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>Retour</Button>
        <Button variant="contained" color="primary" onClick={() => navigate(`/edit/${cafe.Id}`)}>Modifier</Button>
      </Box>
    </Container>
  );
};

export default CafeDetailsPage;
