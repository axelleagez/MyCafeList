import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Home, AddCircle, List, Favorite, AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000, // Assure que la navbar reste au-dessus du contenu
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(newValue);
        }}
        showLabels={false} // Empêche l'affichage des labels sous les icônes
      >
        <BottomNavigationAction label="Accueil" icon={<Home />} value="/" />
        <BottomNavigationAction label="Ajouter un café" icon={<AddCircle />} value="/add" />
        <BottomNavigationAction label="Liste de mes cafés" icon={<List />} value="/list" />
        <BottomNavigationAction label="Mes favoris" icon={<Favorite />} value="/favorites" />
        <BottomNavigationAction label="Mon compte" icon={<AccountCircle />} value="/profile" />
      </BottomNavigation>
    </Paper>
  );
}
