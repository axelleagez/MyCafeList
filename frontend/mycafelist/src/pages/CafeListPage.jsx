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

const CafeListPage = () => {
  const { cafes, toggleFavorite, isLoading, fetchCafes } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCafes(); // chargement des cafés
  }, [fetchCafes]);

  if (isLoading) return <CircularProgress />;

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", pb: 10, pt: 4 }}>
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
              <ListItemButton
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onClick={() => navigate(`/details/${cafe.id}`)}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "#333" }}
                    >
                      {cafe.nom || "Nom inconnu"}
                    </Typography>
                  }
                  secondary={
                    <>
                      {`${cafe.adresse || "Adresse inconnue"}, ${
                        cafe.ville || "Ville inconnue"
                      }, ${cafe.pays || "Pays inconnu"}`}
                      <br />
                      {cafe.note && (
                        <Box sx={{ mt: 0.5 }}>
                          <Rating
                            value={cafe.note}
                            readOnly
                            precision={0.5}
                            size="small"
                          />
                        </Box>
                      )}
                    </>
                  }
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
        <Typography textAlign="center" sx={{ mt: 4 }}>
          Aucun café enregistré.
        </Typography>
      )}
    </Container>
  );
};

export default CafeListPage;
