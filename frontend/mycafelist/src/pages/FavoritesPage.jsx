import React, { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, List, ListItem, ListItemText, Paper, Divider } from "@mui/material";
import axios from "axios";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5091/api/cafes") // URL API
      .then(response => {
        // filtrage des cafés favoris
        const favCafes = response.data.filter(cafe => cafe.StatutFav === true);
        setFavorites(favCafes);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des cafés favoris :", error);
        setError("Impossible de récupérer la liste des favoris.");
        setLoading(false);
      });
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
