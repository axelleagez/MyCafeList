import React, { useEffect } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";

const CafeListPage = () => {
  const { cafes, toggleFavorite, isLoading, fetchCafes } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCafes(); // Charge les cafés au montage
  }, [fetchCafes]);

  if (isLoading) return <CircularProgress />;

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4">Ma Liste de Cafés</Typography>
      {cafes.length ? (
        <List>
          {cafes.map((cafe) => (
            <Paper key={cafe.id} sx={{ mb: 2, p: 2 }}>
              <ListItemButton
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onClick={() => navigate(`/details/${cafe.id}`)}
              >
                <ListItemText
                  primary={cafe.nom || "Nom inconnu"}
                  secondary={`${cafe.adresse || "Adresse inconnue"}, ${
                    cafe.ville || "Ville inconnue"
                  }, ${cafe.pays || "Pays inconnu"}`}
                />
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(cafe.id);
                  }}
                  color={cafe.statutFav ? "error" : "default"}
                >
                  {cafe.statutFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </ListItemButton>
            </Paper>
          ))}
        </List>
      ) : (
        <Typography>Aucun café enregistré.</Typography>
      )}
    </Container>
  );
};

export default CafeListPage;
