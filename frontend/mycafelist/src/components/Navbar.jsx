//ce document définit un composant Navbar qui affiche une barre de navigation fixe en bas de l'écran

import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Box,
} from "@mui/material";
import {
  Home,
  HomeOutlined,
  Share,
  ShareOutlined,
  LocalCafe,
  LocalCafeOutlined,
  Favorite,
  FavoriteBorder,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate(); //pour changer de page
  const location = useLocation(); //pour récupérer le chemin actuel

  //fonction pour déterminer l'onglet actuellement actif
  const currentTab = () => {
    switch (location.pathname) {
      case "/home":
        return "/home";
      case "/share":
        return "/share";
      case "/list":
        return "/list";
      case "/favorites":
        return "/favorites";
      case "/profile":
        return "/profile";
      default:
        return "/home"; // si l'url n'est pas reconnue, on revient à l'accueil
    }
  };

  return (
    //la navbar est fixée en bas 
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <Paper 
        sx={{
          borderRadius: "50px",
          px: 2,
          width: "90%",
          maxWidth: 500,
          backgroundColor: "#2F5233", // vert foncé
        }}
      >
       {/*on prend l'onglet actif et on navigue au clic*/}
        <BottomNavigation 
          value={currentTab()} 
          onChange={(event, newValue) => navigate(newValue)} 
          showLabels={false}
          sx={{
            height: "60px",
            backgroundColor: "transparent",
            "& .MuiBottomNavigationAction-root": {
              color: "#F4F1DE",
              minWidth: "20%",
            },
            "& .Mui-selected": {
              color: "#d8dbae",
            },
          }}
        >
          {/*les icones sont vides et se remplissent si elles correspondent à l'onglet actif*/}
          <BottomNavigationAction 
            icon={
              currentTab() === "/home" ? (
                <Home fontSize="large" sx={{ color: "#d8dbae" }} />
              ) : (
                <HomeOutlined fontSize="large" />
              )
            }
            value="/home"
          />
          <BottomNavigationAction
            icon={
              currentTab() === "/share" ? (
                <Share fontSize="large" sx={{ color: "#d8dbae" }} />
              ) : (
                <ShareOutlined fontSize="large" />
              )
            }
            value="/share"
          />
          <BottomNavigationAction
            icon={
              currentTab() === "/list" ? (
                <LocalCafe fontSize="large" sx={{ color: "#d8dbae" }} />
              ) : (
                <LocalCafeOutlined fontSize="large" />
              )
            }
            value="/list"
          />
          <BottomNavigationAction
            icon={
              currentTab() === "/favorites" ? (
                <Favorite fontSize="large" sx={{ color: "#d8dbae" }} />
              ) : (
                <FavoriteBorder fontSize="large" />
              )
            }
            value="/favorites"
          />
          <BottomNavigationAction
            icon={
              currentTab() === "/profile" ? (
                <AccountCircle fontSize="large" sx={{ color: "#d8dbae" }} />
              ) : (
                <AccountCircleOutlined fontSize="large" />
              )
            }
            value="/profile"
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
