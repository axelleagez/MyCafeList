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
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AddPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    idUser: "",
    nom: "",
    adresse: "",
    ville: "",
    pays: "",
    description: "",
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
      [name]: type === "checkbox" ? checked : name === "note" ? (value ? parseInt(value) : null) : value,
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
            note: formData.note ? parseInt(formData.note) : null 
        };
      await api.addCafe(cafeData);
      setCafeAjoute(true); // message de confirmation
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Ajouter un Café
        </Typography>
      </Box>

      {/* café ajouté => afficher le message de confirmation */}
      {cafeAjoute ? (
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="h6" color="success.main">
            Le café a bien été enregistré !
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/list")}
            >
              Aller voir ma liste
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
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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
              />
            }
            label="Ajouter aux favoris"
          />

          {error && <Typography color="error">{error}</Typography>}

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
