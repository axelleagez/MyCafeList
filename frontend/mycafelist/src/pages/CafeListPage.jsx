import React, { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, List, ListItem, ListItemText, Paper, Divider } from "@mui/material";
import axios from "axios";

const CafeListPage = () => {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/cafes") // URL API
      .then(response => {
        // mettre que les cafés de l'utilisateur 1 pour faire un test
        const userCafes = response.data.filter(cafe => cafe.IdUser === 1);
        setCafes(userCafes);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des cafés :", error);
        setError("Impossible de récupérer la liste des cafés.");
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Ma Liste de Cafés 
      </Typography>

      {/* gestion du chargement et des erreurs */}
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {/* affichage cafés */}
      {!loading && cafes.length > 0 ? (
        <List>
          {cafes.map((cafe) => (
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
              {cafe.StatutFav && (
                <Typography variant="body2" color="primary">
                  ❤️ Favori
                </Typography>
              )}
            </Paper>
          ))}
        </List>
      ) : (
        !loading && <Typography>Aucun café enregistré.</Typography>
      )}
    </Container>
  );
};

export default CafeListPage;
