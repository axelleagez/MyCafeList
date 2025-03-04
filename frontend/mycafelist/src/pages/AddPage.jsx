import React, { useState } from "react";
import { Container, TextField, Button, Box, Typography, FormControlLabel, Checkbox, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddPage = () => {
  const navigate = useNavigate();

  // le formulaire
  const [formData, setFormData] = useState({
    Nom: "",
    Adresse: "",
    Ville: "",
    Pays: "",
    Description: "",
    Note: "",
    Commentaire: "",
    StatutFav: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // gestion des changements dans le formulaire
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // envoi du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      // envoi des données à l'API
      await axios.post("http://localhost:5091/api/cafes", formData);
      setLoading(false);
      navigate("/list"); // redirection vers la liste après l'ajout
    } catch (err) {
      console.error("Erreur lors de l'ajout du café :", err);
      setError("Une erreur s'est produite. Veuillez réessayer.");
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

      {/* formulaire d'ajout */}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Nom du café" name="Nom" value={formData.Nom} onChange={handleChange} required fullWidth />
        <TextField label="Adresse" name="Adresse" value={formData.Adresse} onChange={handleChange} required fullWidth />
        <TextField label="Ville" name="Ville" value={formData.Ville} onChange={handleChange} required fullWidth />
        <TextField label="Pays" name="Pays" value={formData.Pays} onChange={handleChange} required fullWidth />
        <TextField label="Description" name="Description" value={formData.Description} onChange={handleChange} multiline rows={3} fullWidth />
        
        {/* note (0 à 5) */}
        <TextField
          select
          label="Note"
          name="Note"
          value={formData.Note}
          onChange={handleChange}
          fullWidth
        >
          {[1, 2, 3, 4, 5].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {/* commentaire */}
        <TextField label="Commentaire" name="Commentaire" value={formData.Commentaire} onChange={handleChange} multiline rows={2} fullWidth />

        {/* favoris */}
        <FormControlLabel
          control={<Checkbox checked={formData.StatutFav} onChange={handleChange} name="StatutFav" />}
          label="Ajouter aux favoris"
        />

        {/* affichage des erreurs */}
        {error && <Typography color="error">{error}</Typography>}

        {/* bouton d'ajout */}
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? "Ajout en cours..." : "Ajouter le café"}
        </Button>
      </Box>
    </Container>
  );
};

export default AddPage;
