//le document définit la page qui affiche la liste des cafés favoris
//elle permet également d'accéder aux détails des cafés et de modifier le statut favori

import {
  Container,
  Typography,
  CircularProgress,
  List,
  Paper,
  ListItemButton,
  ListItemText,
  IconButton,
  Box,
  Rating,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFavorites } from "../contexts/FavoritesContext";
import { useNavigate } from "react-router-dom";

//composants de la page
const FavoritesPage = () => {
  const { cafes, toggleFavorite, isLoading } = useFavorites();
  const navigate = useNavigate();
  const favorites = cafes.filter((c) => c.favStatus);

  if (isLoading) return <CircularProgress />;

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", pb: 10, pt: 4 }}>
      {/* titre de la page */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Modak, cursive",
          color: "#095d40",
          textAlign: "center",
          mb: 3,
        }}
      >
        Mes Cafés Favoris
      </Typography>

      {favorites.length ? (
        // si au moins un café favori est présent, on affiche la liste
        <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {favorites.map((cafe) => (
            <Paper
              key={cafe.id}
              elevation={1}
              sx={{
                p: 2,
                borderRadius: 3,
                backgroundColor: "#f8f8ec",
              }}
            >
              {/* bouton liste qui redirige vers les détails du café quand on clique dessus */}
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
                    // Affichage du nom du café
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "#333" }}
                    >
                      {cafe.name || "Nom inconnu"}
                    </Typography>
                  }
                  secondary={
                    // Affichage des informations secondaires
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                    >
                      {`${cafe.adress || "Adresse inconnue"}, ${
                        cafe.city || "Ville inconnue"
                      }, ${cafe.country || "Pays inconnu"}`}
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
                    </Typography>
                  }
                />
                {/* bouton favori qui permet de basculer le statut */}
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(cafe.id);
                  }}
                  color="error"
                >
                  <FavoriteIcon />
                </IconButton>
              </ListItemButton>
            </Paper>
          ))}
        </List>
      ) : (
        // affichage d'un message si aucun café n'est favori
        <Typography textAlign="center" sx={{ mt: 4 }}>
          Aucun café en favori.
        </Typography>
      )}
    </Container>
  );
};

export default FavoritesPage;
