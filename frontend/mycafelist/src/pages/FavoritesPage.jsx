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

const FavoritesPage = () => {
  const { cafes, toggleFavorite, isLoading } = useFavorites();
  const navigate = useNavigate();
  const favorites = cafes.filter((c) => c.statutFav);

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
        Mes Cafés Favoris
      </Typography>

      {favorites.length ? (
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
                      }`}
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
                  color="error"
                >
                  <FavoriteIcon />
                </IconButton>
              </ListItemButton>
            </Paper>
          ))}
        </List>
      ) : (
        <Typography textAlign="center" sx={{ mt: 4 }}>
          Aucun café en favori.
        </Typography>
      )}
    </Container>
  );
};

export default FavoritesPage;
