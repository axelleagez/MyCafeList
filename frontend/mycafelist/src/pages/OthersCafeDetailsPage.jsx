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

const OthersCafeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cafe, setCafe] = useState(null);
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
          <Typography
            variant="h5"
            sx={{ fontFamily: "Modak, cursive", color: "#095d40" }}
          >
            {cafe.name}
          </Typography>
        </Box>

        <List>
          {[
            "adress",
            "city",
            "country",
            "description",
            "note",
            "comment",
          ].map((field) => (
            <ListItem key={field}>
              <ListItemText
                primary={field.charAt(0).toUpperCase() + field.slice(1)}
                secondary={cafe[field] || "Non renseigné"}
              />
            </ListItem>
          ))}
        </List>

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
