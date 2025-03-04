import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProfilPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4">Mon Profil</Typography>
      <Typography variant="body1">Email : {localStorage.getItem("userEmail")}</Typography>

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Se déconnecter
        </Button>
      </Box>
    </Container>
  );
};

export default ProfilPage;
