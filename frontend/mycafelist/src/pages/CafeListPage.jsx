// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Typography,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   Paper,
//   //Divider,
//   IconButton,
// } from "@mui/material";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; 
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";
// import { useFavorites } from '../contexts/FavoritesContext';

// const CafeListPage = () => {
//   const [cafes, setCafes] = useState([]);
//   const [/*loading*/, setLoading] = useState(true);
//   const [/*error*/, setError] = useState("");
//   const { toggleFavorite, isLoading } = useFavorites();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserCafes = async () => {
//       try {
//         const userCafes = await api.getUserCafes();
//         setCafes(userCafes);
//       } catch (error) {
//         setError(
//           error.response?.data || "Impossible de récupérer la liste des cafés."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     const userId = localStorage.getItem("userId");
//     if (userId) {
//       fetchUserCafes();
//     } else {
//       setLoading(false);
//       setError("Veuillez vous connecter pour voir vos cafés.");
//     }
//   }, []);

//   if (isLoading) return <CircularProgress />;

//   return (
//     <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
//       <Typography variant="h4">Ma Liste de Cafés</Typography>
//       {cafes.length ? (
//         <List>
//           {cafes.map((cafe) => (
//             <Paper key={cafe.id} sx={{ mb: 2, p: 2 }}>
//               <ListItem sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 cursor: "pointer", }}>
//                 <ListItemText
//                 primary={cafe.nom || "Nom inconnu"}
//                 secondary={`${cafe.adresse || "Adresse inconnue"}, ${
//                   cafe.ville || "Ville inconnue"
//                 }, ${cafe.pays || "Pays inconnu"}`}
//                 onClick={() => navigate(`/details/${cafe.id}`)}
//               />
//                 <IconButton onClick={() => toggleFavorite(cafe.id)} color={cafe.statutFav ? "error" : "default"}>
//                   {cafe.statutFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
//                 </IconButton>
//               </ListItem>
//             </Paper>
//           ))}
//         </List>
//       ) : <Typography>Aucun café enregistré.</Typography>}
//     </Container>
//   );
//   // return (
//   //   <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
//   //     <Typography variant="h4" gutterBottom>
//   //       Ma Liste de Cafés
//   //     </Typography>

//   //     {/* gestion du chargement et des erreurs */}
//   //     {loading && <CircularProgress />}
//   //     {error && <Typography color="error">{error}</Typography>}

//   //     {/* affichage cafés */}
//   //     {!loading && cafes.length > 0 ? (
//   //       <List>
//   //       {cafes.map((cafe) => (
//   //         <Paper key={cafe.id} sx={{ mb: 2, p: 2, boxShadow: 0 }}> {/* Suppression du contour sombre */}
//   //           <ListItem
//   //             sx={{
//   //               display: "flex",
//   //               justifyContent: "space-between",
//   //               alignItems: "center",
//   //               cursor: "pointer",
//   //             }}
//   //             onClick={() => navigate(`/details/${cafe.id}`)}
//   //           >
//   //             <ListItemText
//   //               primary={cafe.nom || "Nom inconnu"}
//   //               secondary={`${cafe.adresse || "Adresse inconnue"}, ${
//   //                 cafe.ville || "Ville inconnue"
//   //               }, ${cafe.pays || "Pays inconnu"}`}
//   //             />
//   //             <IconButton>
//   //               <FavoriteBorderIcon /> {/* Icône du cœur vide */}
//   //             </IconButton>
//   //           </ListItem>
//   //           <Divider />
//   //           <Typography variant="body2" color="textSecondary">
//   //             {cafe.description || "Aucune description disponible"}
//   //           </Typography>
//   //         </Paper>
//   //       ))}
//   //     </List>
//   //     ) : (
//   //       !loading && <Typography>Aucun café enregistré.</Typography>
//   //     )}
//   //   </Container>
//   // );
// };

// export default CafeListPage;
import React, { useEffect } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useFavorites } from '../contexts/FavoritesContext';

const CafeListPage = () => {
  const { cafes, toggleFavorite, isLoading, fetchCafes } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCafes(); // Charge les cafés au montage
  }, [fetchCafes]);

  if (isLoading) return <CircularProgress />;

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4">Ma Liste de Cafés</Typography>
      {cafes.length ? (
        <List>
          {cafes.map((cafe) => (
            <Paper key={cafe.id} sx={{ mb: 2, p: 2 }}>
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                secondaryAction={
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(cafe.id);
                    }}
                    color={cafe.statutFav ? "error" : "default"}
                  >
                    {cafe.statutFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                }
                button
                onClick={() => navigate(`/details/${cafe.id}`)}
              >
                <ListItemText
                  primary={cafe.nom || "Nom inconnu"}
                  secondary={`${cafe.adresse || "Adresse inconnue"}, ${
                    cafe.ville || "Ville inconnue"
                  }, ${cafe.pays || "Pays inconnu"}`}
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      ) : (
        <Typography>Aucun café enregistré.</Typography>
      )}
    </Container>
  );
};

export default CafeListPage;
