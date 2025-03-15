import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
} from "@mui/material";
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
        setError(
          error.response?.data || "Impossible de récupérer la liste des cafés."
        );
      } finally {
        setLoading(false);
      }
    };

    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchUserCafes();
    } else {
      setLoading(false);
      setError("Veuillez vous connecter pour voir vos cafés.");
    }
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
            <Paper key={cafe.id} sx={{ mb: 2, p: 2, boxShadow: 3 }}>
              <ListItem
                component="button"
                onClick={() => navigate(`/details/${cafe.id}`)}
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid #ddd",
                  padding: "10px",
                }}
              >
                <ListItemText
                  primary={cafe.nom || "Nom inconnu"}
                  secondary={`${cafe.adresse || "Adresse inconnue"}, ${
                    cafe.ville || "Ville inconnue"
                  }, ${cafe.pays || "Pays inconnu"}`}
                />
              </ListItem>
              <Divider />
              <Typography variant="body2" color="textSecondary">
                {cafe.description || "Aucune description disponible"}
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
