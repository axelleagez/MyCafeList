//ce document définit la page de détails des cafés des autres
//elle permet à un utilisateur de consulter les détails d'un café appartenant à un autre utilisateur et de l'ajouter à sa propre liste
//elle est différente de CafeDetailsPage parce qu'elle concerne les cafés des utilisateurs que l'on regarde, pas nos cafés

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
  Textfield,
  Paper,
  Button,
} from "@mui/material";
import axios from "../services/api";

//composants de la page
const OthersCafeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cafe, setCafe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect pour charger les détails du café
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

  // fonction pour rediriger l'utilisateur vers la page d'ajout et pré-remplir le formulaire avec les détails du café
  const handleAddToMyCafes = async () => {
    try {
      navigate("/add", {
        state: {
          name: cafe.name,
          adress: cafe.adress,
          city: cafe.city,
          country: cafe.country,
          description: cafe.description,
        },
      });
    } catch (err) {
      setError("Erreur lors de l'ajout du café.");
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
      {/* bouton pour revenir à la page précédente */}
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
        {/* en-tête avec le nom du café */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            variant="h5"
            sx={{ fontFamily: "Modak, cursive", color: "#095d40" }}
          >
            {cafe.name}
          </Typography>
        </Box>

        {/* liste des infos détaillées du café */}
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
              <ListItemText
                primary={field.charAt(0).toUpperCase() + field.slice(1)}
                secondary={cafe[field] || "Non renseigné"}
              />
            </ListItem>
          ))}
        </List>

        {/* bouton pour ajouter le café de l'autre user à sa propre liste de cafés */}
        <Box mt={3}>
          <Button variant="contained" fullWidth onClick={handleAddToMyCafes}>
            Ajouter à mes cafés
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OthersCafeDetailsPage;
