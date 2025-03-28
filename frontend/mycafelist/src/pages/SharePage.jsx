import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  IconButton,
  CircularProgress,
  Rating,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";

const SharePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // users filtrés
  const [selectedUser, setSelectedUser] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // message d'erreur si utilisateur existe pas
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

  // filtrage user selon input
  useEffect(() => {
    if (searchInput === "") {
      setFilteredUsers([]); //si rien on affiche rien
    } else {
      const results = userOptions.filter(
        (user) => user.email.toLowerCase().startsWith(searchInput.toLowerCase()) // filtrage user par mail
      );
      setFilteredUsers(results);
    }
  }, [searchInput, userOptions]);

  // pour sélectionner / valider un user
  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    setErrorMessage(""); // reinitialiser le message d'erreur

    //   // récupérer les favs de l'user sélec
    //   useEffect(() => {
    //     const fetchFavorites = async () => {
    //       if (!selectedUser) return;
    //       setIsLoading(true);
    //       try {
    //         const favorites = await axios.getUserFavorites(selectedUser.id);
    //         setUserFavorites(favorites);
    //       } catch (err) {
    //         console.error("Erreur chargement favoris :", err);
    //       } finally {
    //         setIsLoading(false);
    //       }
    //     };
    //     fetchFavorites();
    //   }, [selectedUser]);

    // récupérer les favs de l'user sélec
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
    <Box sx={{ p: 3, minHeight: "100vh", backgroundColor: "default" }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Modak, cursive",
          color: "#095d40",
          textAlign: "center",
          mb: 3,
        }}
      >
        Explorer
      </Typography>

      <TextField
        label="Rechercher un utilisateur par email"
        variant="outlined"
        fullWidth
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)} // mise à jour de l'input
        onKeyDown={(e) => {
          if (e.key === "Enter" && filteredUsers.length > 0) {
            handleUserSelect(filteredUsers[0]); // si on appuie sur entrée, sélection du 1er utilisateur
          }
        }}
        sx={{
          backgroundColor: "white",
          borderRadius: "20px",
          mb: 3,
        }}
      />

      {/* affichage liste utilisateurs correspondants */}
      {searchInput && filteredUsers.length > 0 && (
        <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {filteredUsers.map((user) => (
            <Paper
              key={user.id}
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
                onClick={() => handleUserSelect(user)} // sélection utilisateur
              >
                <ListItemText
                  primary={<Typography variant="h6">{user.email}</Typography>}
                />
              </ListItemButton>
            </Paper>
          ))}
        </List>
      )}

      {/* si utilisateur existe pas */}
      {errorMessage && (
        <Typography color="error" sx={{ textAlign: "center", mt: 2 }}>
          {errorMessage}
        </Typography>
      )}

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
                onClick={() => navigate(`/details/${cafe.id}`)}
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
                    <>
                      {`${cafe.adresse}, ${cafe.ville}, ${cafe.pays}`}

                      <br />
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
                    </>
                  }
                />
                <IconButton disabled>
                  <FavoriteIcon color="error" />
                </IconButton>
              </ListItemButton>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SharePage;
