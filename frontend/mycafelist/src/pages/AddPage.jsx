import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../services/api";

const AddPage = () => {
  const navigate = useNavigate(); // pour se déplacer
  const location = useLocation(); // pour récupérer les données de navigate

  const [formData, setFormData] = useState({
    idUser: "",
    nom: location.state?.nom ||"",
    adresse: location.state?.adresse||"",
    ville: location.state?.ville ||"",
    pays: location.state?.pays ||"",
    description: location.state?.description ||"",
    note: "",
    commentaire: "",
    statutFav: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cafeAjoute, setCafeAjoute] = useState(false); // Nouvel état pour confirmation

  // gestion des chgmts du form
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : name === "note"
          ? value
            ? parseInt(value)
            : null
          : value,
    });
  };

  // envoi
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("Utilisateur non connecté");

      const cafeData = {
        ...formData,
        idUser: parseInt(userId),
        note: formData.note ? parseInt(formData.note) : null,
      };
      await axios.addCafe(cafeData);
      setCafeAjoute(true); //le cafe est bien enregistré
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", pb: 10 }}>
      <Button
        onClick={() => navigate(-1)}
        sx={{
          color: "#095d40",
          textTransform: "none",
          fontWeight: 500,
          alignSelf: "start",
          "&:hover": {
            textDecoration: "underline",
            textDecorationColor: "#d8dbae",
          },
        }}
      >
        ← Retour
      </Button>

      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Modak, cursive",
            color: "#095d40",
            mb: 2,
          }}
        >
          Ajouter un Café
        </Typography>
      </Box>

      {/* café ajouté + message de confirmation */}
      {cafeAjoute ? (
        <Box
          sx={{
            mt: 4,
            textAlign: "center",
            p: 4,
            bgcolor: "#f8f8ec",
            border: "1px solid #d8dbae",
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Modak, cursive",
              color: "#55692d",
              mb: 2,
            }}
          >
            Café enregistré avec succès !
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Tu peux maintenant consulter ta liste ou ajouter un autre lieu.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/list")}
            >
              Voir ma liste
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setCafeAjoute(false);
                setFormData({
                  nom: "",
                  adresse: "",
                  ville: "",
                  pays: "",
                  description: "",
                  note: null,
                  commentaire: "",
                  statutFav: false,
                });
              }}
            >
              Ajouter un autre café
            </Button>
          </Box>
        </Box>
      ) : (
        /* form d'ajout */
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            bgcolor: "#f8f8ec",
            border: "1px solid #d8dbae",
            borderRadius: 4,
            p: 4,
            boxShadow: 0,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Nom du café"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Adresse"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Ville"
            name="ville"
            value={formData.ville}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Pays"
            name="pays"
            value={formData.pays}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />

          <TextField
            select
            label="Note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            fullWidth
          >
            {[1, 2, 3, 4, 5].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Commentaire"
            name="commentaire"
            value={formData.commentaire}
            onChange={handleChange}
            multiline
            rows={2}
            fullWidth
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.statutFav}
                onChange={handleChange}
                name="statutFav"
                color="primary"
              />
            }
            label="Ajouter aux favoris"
          />

          {error && (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? "Ajout en cours..." : "Ajouter le café"}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default AddPage;
