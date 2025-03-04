import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Home, AddCircle, List, Favorite, AccountCircle } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 

  // pour avoir l'url de la page sur laquelle on est
  const getActiveTab = () => { 
    switch (location.pathname) {
      case "/":
        return "/";
      case "/add":
        return "/add";
      case "/list":
        return "/list";
      case "/favorites":
        return "/favorites";
      case "/profile":
        return "/profile";
      default:
        return "/";
    }
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: "100%",
      }}
      elevation={3}
    >
      <BottomNavigation
        value={getActiveTab()} // mise à jour selon la page actuelle
        onChange={(event, newValue) => navigate(newValue)}
        showLabels={false} // suppression des labels sous les icônes
        sx={{
          height: "60px", // ajustement de la hauteur
        }}
      >
        <BottomNavigationAction icon={<Home fontSize="large" />} value="/" />
        <BottomNavigationAction icon={<AddCircle fontSize="large" />} value="/add" />
        <BottomNavigationAction icon={<List fontSize="large" />} value="/list" />
        <BottomNavigationAction icon={<Favorite fontSize="large" />} value="/favorites" />
        <BottomNavigationAction icon={<AccountCircle fontSize="large" />} value="/profile" />
      </BottomNavigation>
    </Paper>
  );
}
