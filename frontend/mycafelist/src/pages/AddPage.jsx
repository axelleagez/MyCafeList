//ce document définit la page d'ajout d'un café
//cette page permet à l'utilisateur de remplir un formulaire pour enregistrer un nouveau café dans sa liste

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

//création du composant AddPage
const AddPage = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  
  //déclaration de l'état initial du formulaire avec pré remplissage
  const [formData, setFormData] = useState({
    idUser: "",
    name: location.state?.name || "",
    adress: location.state?.adress || "",
    city: location.state?.city || "",
    country: location.state?.country || "",
    description: location.state?.description || "",
    note: "",
    comment: "",
    favStatus: false,
  });
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const [cafeAjoute, setCafeAjoute] = useState(false); 

  // fonction de gestion des changements du form
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" //si c'est une case à cocher
          ? checked
          : name === "note" //dans "note", on convertir la valeur en nombre
          ? value
            ? parseInt(value)
            : null
          : value,
    });
  };

  // fonction pour gérer l'envoi du forumulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      //récupération de l'ID pour associer le café à l'user connecté
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("Utilisateur non connecté");

      //préparation des données à envoyer
      const cafeData = {
        ...formData,
        idUser: parseInt(userId),
        note: formData.note ? parseInt(formData.note) : null,
      };
      await axios.addCafe(cafeData); //appel à API
      setCafeAjoute(true); //le cafe est bien enregistré
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", pb: 10 }}>
      {/*bouton retour*/}
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

      {/*en-tête de la page avec le titre*/}
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

      {/* si café ajouté, apparition d'un message de confirmation */}
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
            {/*bouton pour naviguer vers la liste des cafés*/}
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/list")}
            >
              Voir ma liste
            </Button>
            {/*bouton pour réinitialiser le formulaire et ajouter un autre café*/}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setCafeAjoute(false);
                setFormData({
                  name: "",
                  adress: "",
                  city: "",
                  country: "",
                  description: "",
                  note: null,
                  comment: "",
                  favStatus: false,
                });
              }}
            >
              Ajouter un autre café
            </Button>
          </Box>
        </Box>
      ) : (
        /* formulaire d'ajout */
        <Box
          component="form"
          onSubmit={handleSubmit} //appel à la fonction
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
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Adresse"
            name="adress"
            value={formData.adress}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Ville"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Pays"
            name="country"
            value={formData.country}
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
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            multiline
            rows={2}
            fullWidth
          />

          {/*case à cocher pour dire si le café doit etre ajouté aux favoris directement*/}
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.favStatus}
                onChange={handleChange}
                name="favStatus"
                color="primary"
              />
            }
            label="Ajouter aux favoris"
          />

          {/*message d'erreur si nécessaire*/}
          {error && (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          )}

          {/*bouton de soumission du form, il est désactivé pendant le chargement*/}
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
