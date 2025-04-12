//ce document définit une page qui affiche la liste des cafés enregistrés par l'user
//elle permet de consulter les détails des cafés, d'ajouter un nv café et de mettre ses cafés en favori

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
  Box,
  Button,
  Rating,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";

//composants de la page
const CafeListPage = () => {
  const { cafes, toggleFavorite, isLoading, fetchCafes } = useFavorites();
  const navigate = useNavigate();

  //useEffect pour charger les cafés via l'API
  useEffect(() => {
    fetchCafes(); 
  }, [fetchCafes]);

  if (isLoading) return <CircularProgress />;

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", pb: 10, pt: 4 }}>
       {/* en-tête de la page avec le titre */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Modak, cursive",
          color: "#095d40",
          textAlign: "center",
          mb: 3,
        }}
      >
        Ma Liste de Cafés
      </Typography>

      {/* bouton pour naviguer vers la page d'ajout d'un nouveau café */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/add")}
          sx={{
            textTransform: "none",
            fontWeight: 500,
            borderRadius: "20px",
            px: 3,
          }}
        >
          Ajouter un café
        </Button>
      </Box>

      {/* si des cafés existent, affichage de la liste sinon un message d'information */}
      {cafes.length ? (
        <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {cafes.map((cafe) => (
            <Paper
              key={cafe.id}
              elevation={1}
              sx={{
                p: 2,
                borderRadius: 3,
                backgroundColor: "#f8f8ec",
              }}
            >
               {/* bouton liste qui dirige vers les détails du café */}
              <ListItemButton
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onClick={() => navigate(`/details/${cafe.id}`)}
              >
                 {/* affichage des infos principales du café */}
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "#333" }}
                    >
                      {cafe.name || "Nom inconnu"}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                    >
                      {`${cafe.adress || "Adresse inconnue"}, ${
                        cafe.city || "Ville inconnue"
                      }, ${cafe.country || "Pays inconnu"}`}
                      {cafe.note && (
                        // composant Rating si le café possède une note 
                        <Box sx={{ mt: 0.5 }}>
                          <Rating
                            value={cafe.note}
                            readOnly
                            precision={0.5}
                            size="small"
                          />
                        </Box>
                      )}
                    </Typography>
                  }
                />
                {/* bouton pour basculer le statut favori du café */}
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(cafe.id);
                  }}
                  color={cafe.favStatus ? "error" : "default"}
                >
                  {cafe.favStatus ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </ListItemButton>
            </Paper>
          ))}
        </List>
      ) : (
        //message si aucun café n'est enregistré
        <Typography textAlign="center" sx={{ mt: 4 }}>
          Aucun café enregistré.
        </Typography>
      )}
    </Container>
  );
};

export default CafeListPage;
