import React, { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, List, ListItem, ListItemText, Paper, Divider } from "@mui/material";
import api from "../services/api";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserFavorites = async () => {
        try {
            const favCafes = await api.getUserFavorites();
            setFavorites(favCafes);
        } catch (error) {
            setError("Impossible de récupérer la liste des favoris.");
        } finally {
            setLoading(false);
        }
    };
    fetchUserFavorites();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mes Cafés Favoris ❤️
      </Typography>

      {/* gestion du chargement et des erreurs */}
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {/* affichage des cafés favoris */}
      {!loading && favorites.length > 0 ? (
        <List>
          {favorites.map((cafe) => (
            <Paper key={cafe.Id} sx={{ mb: 2, p: 2, boxShadow: 3 }}>
              <ListItem>
                <ListItemText
                  primary={cafe.Nom}
                  secondary={`${cafe.Adresse}, ${cafe.Ville}, ${cafe.Pays}`}
                />
              </ListItem>
              <Divider />
              <Typography variant="body2" color="textSecondary">
                {cafe.Description || "Aucune description disponible"}
              </Typography>
            </Paper>
          ))}
        </List>
      ) : (
        !loading && <Typography>Aucun café favori enregistré pour le moment.</Typography>
      )}
    </Container>
  );
};

export default FavoritesPage;
