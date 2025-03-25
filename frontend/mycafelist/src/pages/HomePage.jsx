import React, { useState, useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      {/*texte de présentation*/}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          minHeight: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">
          Bienvenue sur MyCaféList ! Une application dédiée aux amateurs de
          cafés pour enregistrer, organiser et partager leurs lieux favoris.
        </Typography>
      </Box>

      <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
        {" "}
        {/*deux boutons*/}
        <Button
          variant="contained"
          size="large"
          sx={{ padding: 2 }}
          onClick={() => navigate("/add")}
        >
          Ajouter un café à ma liste
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{ padding: 2 }}
          onClick={() => navigate("/list")}
        >
          Voir la liste de cafés à visiter
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
