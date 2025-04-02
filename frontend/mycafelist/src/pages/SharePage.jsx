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

const SharePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // chargement des utilisateurs
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

  // filtrage des utilisateurs selon input
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

  // sélectionner user
  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    setErrorMessage("");

    if (user.modePrive) {
      setUserFavorites([]);
      setErrorMessage(
        "Ce compte est privé. Vous ne pouvez pas voir ses favoris."
      );
      return;
    }

    // récupérer ses cafés favoris
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

      {/* Champ de texte pour rechercher un utilisateur par email */}
      <TextField
        label="Rechercher un utilisateur par email"
        variant="outlined"
        fullWidth
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)} // mise à jour saisie
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

      {/* affichage des users */}
      {searchInput && filteredUsers.length > 0 && (
        <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {filteredUsers.map((user) => (
            <Paper
              key={user.id}
              elevation={1}
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: "#e8f4e1", // Fond vert clair pour effet de suggestion
                border: "1px solid primary", // Bordure verte pour marquer l'élément
              }}
            >
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

      {/* si l'user n'existe pas */}
      {errorMessage && (
        <Typography color="error" sx={{ textAlign: "center", mt: 2 }}>
          {errorMessage}
        </Typography>
      )}

      {/* affichage favoris de l'user */}
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
                      {cafe.nom}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                    >
                      {`${cafe.adresse}, ${cafe.ville}, ${cafe.pays}`}

                      {cafe.note && (
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
