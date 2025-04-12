//ce document définit la page de partage
//elle permet à l'utilisateur de rechercher par email un autre utilisateur et de voir les favoris de ce dernier

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  CircularProgress,
  Rating,
} from "@mui/material";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";

//composants de la page
const SharePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // useEffect pour charger la liste de tous les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await axios.getUsers();
        setUserOptions(users);
      } catch (err) {
        console.error("Erreur chargement utilisateurs :", err);
      }
    };
    fetchUsers();
  }, []);

  // useEffect pour filtrer les utilisateurs en fonction de la saisie de recherche
  useEffect(() => {
    if (searchInput === "") {
      setFilteredUsers([]); // entrée vide = on n'affiche rien
    } else {
      const results = userOptions.filter((user) =>
        user.email.toLowerCase().startsWith(searchInput.toLowerCase())
      );
      setFilteredUsers(results);
    }
  }, [searchInput, userOptions]);

  // Fonction pour sélectionner un utilisateur depuis la liste filtrée
  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    setErrorMessage("");

    // si le compte de l'utilisateur est privé, ne pas afficher ses favoris
    if (user.privateMode) {
      setUserFavorites([]);
      setErrorMessage(
        "Ce compte est privé. Vous ne pouvez pas voir ses favoris."
      );
      return;
    }

    // sinon, récupérer la liste des cafés favoris
    try {
      setIsLoading(true);
      const favorites = await axios.getUserFavorites(user.id);
      setUserFavorites(favorites);
    } catch (err) {
      setErrorMessage("Cet utilisateur n'a pas de favoris ou n'existe pas.");
      console.error("Erreur chargement favoris :", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, minHeight: "100vh", backgroundColor: "#ffffff" }}>
      {/* titre de la page */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Modak, cursive",
          color: "#095d40",
          textAlign: "center",
          mb: 3,
        }}
      >
        Les favoris des autres
      </Typography>

      {/* barre de recherche pour rechercher un utilisateur par email */}
      <TextField
        label="Rechercher un utilisateur par email"
        variant="outlined"
        fullWidth
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && filteredUsers.length > 0) {
            handleUserSelect(filteredUsers[0]); // entrée = sélectionner le premier utilisateur
          }
        }}
        sx={{
          backgroundColor: "white",
          borderRadius: "20px",
          mb: 3,
        }}
      />

      {/* affichage des users filtrés lorsque l'input n'est pas vide */}
      {searchInput && filteredUsers.length > 0 && (
        <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {filteredUsers.map((user) => (
            <Paper
              key={user.id}
              elevation={1}
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: "#e8f4e1", // vert clair
                border: "1px solid primary",
              }}
            >
              {/* bouton de la liste pour sélectionner un utilisateur */}
              <ListItemButton
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 10px",
                }}
                onClick={() => handleUserSelect(user)} // sélection user
              >
                <ListItemText
                  primary={<Typography variant="h6">{user.email}</Typography>}
                />
              </ListItemButton>
            </Paper>
          ))}
        </List>
      )}

      {/* message d'erreur si il y a un problème */}
      {errorMessage && (
        <Typography color="error" sx={{ textAlign: "center", mt: 2 }}>
          {errorMessage}
        </Typography>
      )}

      {/* affichage de la liste des favoris de l'user */}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {userFavorites.map((cafe) => (
            <Paper
              key={cafe.id}
              elevation={1}
              sx={{
                p: 2,
                borderRadius: 3,
                backgroundColor: "#f8f8ec",
              }}
            >
              {/* bouton de liste qui redirige vers la page de détails du café */}
              <ListItemButton
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onClick={() => navigate(`/othersdetails/${cafe.id}`)} // redirection vers détails
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "#333" }}
                    >
                      {cafe.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                    >
                      {`${cafe.adress}, ${cafe.city}, ${cafe.country}`}

                      {cafe.note && (
                        //Affichage de la note du café sous forme d'étoiles
                        <Box sx={{ mt: 0.5 }}>
                          <Rating
                            value={cafe.note}
                            readOnly
                            precision={0.5}
                            size="small"
                          />
                        </Box>
                      )}
                    </Typography>
                  }
                />
              </ListItemButton>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SharePage;
