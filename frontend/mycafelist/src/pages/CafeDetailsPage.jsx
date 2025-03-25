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
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "../services/api";
import { useFavorites } from "../contexts/FavoritesContext";

const CafeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [cafe, setCafe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCafeDetails = async () => {
      try {
        const { data } = await axios.get(`/api/cafes/${id}`);
        setCafe(data);
      } catch (error) {
        setError("Impossible de charger les détails du café.");
      } finally {
        setLoading(false);
      }
    };

    fetchCafeDetails();
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
  if (error) return <Typography color="error" sx={{ textAlign: "center", mt: 5 }}>{error}</Typography>;
  if (!cafe) return <Typography color="error" sx={{ textAlign: "center", mt: 5 }}>Café introuvable.</Typography>;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4" gutterBottom>{cafe.nom}</Typography>
          <IconButton onClick={() => toggleFavorite(cafe.id)} color={isFavorite(cafe.id) ? "error" : "default"}>
            <FavoriteIcon />
          </IconButton>
        </Box>

        <List>
          <ListItem><ListItemText primary="Adresse" secondary={cafe.adresse} /></ListItem>
          <ListItem><ListItemText primary="Ville" secondary={cafe.ville} /></ListItem>
          <ListItem><ListItemText primary="Pays" secondary={cafe.pays} /></ListItem>
          <ListItem><ListItemText primary="Description" secondary={cafe.description || "Aucune description disponible"} /></ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default CafeDetailsPage;
