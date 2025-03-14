import React, { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, List, ListItem, ListItemText, Paper, Divider } from "@mui/material";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const CafeListPage = () => {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserCafes = async () => {
        try {
            const userCafes = await api.getUserCafes();
            setCafes(userCafes);
        } catch (error) {
            setError("Impossible de récupérer la liste des cafés.");
        } finally {
            setLoading(false);
        }
    };
    fetchUserCafes();
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
              <ListItem button onClick={() => navigate(`/details/${cafe.Id}`)}>
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
