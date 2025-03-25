//import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  //Divider,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFavorites } from "../contexts/FavoritesContext";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const { cafes, toggleFavorite, isLoading } = useFavorites();
  const navigate = useNavigate();
  const favorites = cafes.filter(c => c.statutFav);

  if (isLoading) return <CircularProgress />;

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4">Mes Cafés Favoris</Typography>
      {favorites.length ? (
        <List>
          {favorites.map((cafe) => (
            <Paper key={cafe.id} sx={{ mb: 2, p: 2 }}>
              <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
                <ListItemText primary={cafe.nom} secondary={`${cafe.adresse}, ${cafe.ville}`} onClick={() => navigate(`/details/${cafe.id}`)} />
                <IconButton onClick={() => toggleFavorite(cafe.id)} color="error">
                  <FavoriteIcon />
                </IconButton>
              </ListItem>
            </Paper>
          ))}
        </List>
      ) : <Typography>Aucun café en favori.</Typography>}
    </Container>
  );
};

export default FavoritesPage;