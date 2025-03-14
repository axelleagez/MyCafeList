import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilPage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4">Mon Profil</Typography>
      <Typography variant="body1">
        Email : {localStorage.getItem("userEmail")}
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Se déconnecter
        </Button>
      </Box>
    </Container>
  );
};

export default ProfilPage;
