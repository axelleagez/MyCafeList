import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "../services/api";
import { useFavorites } from "../contexts/FavoritesContext";

const CafeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [cafe, setCafe] = useState(null);
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCafeDetails = async () => {
      try {
        const data = await axios.getCafeById(id);
        setCafe(data);
      } catch (error) {
        setError("Impossible de charger les détails du café.");
      } finally {
        setLoading(false);
      }
    };

    fetchCafeDetails();
  }, [id]);

  const handleEditToggle = () => {
    setEditable(!editable);
  };

  const handleChange = (e) => {
    setCafe({ ...cafe, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.updateCafe(cafe.id, cafe);
      setEditable(false);
    } catch (err) {
      setError("Erreur lors de la mise à jour du café.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Supprimer ce café ? Cette action est irréversible.")) {
      try {
        await axios.deleteCafe(cafe.id);
        navigate("/list");
      } catch (err) {
        setError("Erreur lors de la suppression du café.");
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error || !cafe)
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 5 }}>
        {error || "Café introuvable."}
      </Typography>
    );

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", pb: 10 }}>
      <Button
        onClick={() => navigate(-1)}
        sx={{
          mb: 2,
          color: "primary",
          textTransform: "none",
          fontWeight: 500,
          alignSelf: "start",
          "&:hover": {
            textDecoration: "underline",
            textDecorationColor: "#d8dbae", // vert clair
          },
        }}
      >
        ← Retour
      </Button>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
          backgroundColor: "#f8f8ec",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          {editable ? (
            <TextField
              fullWidth
              label="Nom"
              name="nom"
              value={cafe.nom}
              onChange={handleChange}
            />
          ) : (
            <Typography
              variant="h5"
              sx={{ fontFamily: "Modak, cursive", color: "#095d40" }}
            >
              {cafe.nom}
            </Typography>
          )}
          <IconButton
            onClick={() => toggleFavorite(cafe.id)}
            color={isFavorite(cafe.id) ? "error" : "default"}
          >
            <FavoriteIcon />
          </IconButton>
        </Box>

        <List>
          {[
            "adresse",
            "ville",
            "pays",
            "description",
            "note",
            "commentaire",
          ].map((field) => (
            <ListItem key={field}>
              {editable ? (
                <TextField
                  fullWidth
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  value={cafe[field] || ""}
                  onChange={handleChange}
                  multiline={["description", "commentaire"].includes(field)}
                />
              ) : (
                <ListItemText
                  primary={field.charAt(0).toUpperCase() + field.slice(1)}
                  secondary={cafe[field] || "Non renseigné"}
                />
              )}
            </ListItem>
          ))}
        </List>

        <Box mt={3}>
          {editable ? (
            <Button variant="contained" fullWidth onClick={handleSave}>
              Enregistrer
            </Button>
          ) : (
            <Button variant="outlined" fullWidth onClick={handleEditToggle}>
              Modifier
            </Button>
          )}
        </Box>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleDelete}
        >
          Supprimer ce café
        </Button>
      </Paper>
    </Container>
  );
};

export default CafeDetailsPage;
