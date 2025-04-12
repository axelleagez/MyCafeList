//ce document définit la page d'accueil de l'app
//elle permet d'afficher un message de bienvenue, d'ajouter un café ou de consulter sa liste de cafés

import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

//composant de la page
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      {/* boîte pour afficher le logo */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 4 }}>
        <img
          src="logo.png"
          alt="Logo MyCafeList"
          style={{
            maxWidth: "150px",
            height: "auto",
          }}
        />
      </Box>

      {/*texte de présentation*/}
      <Box
        sx={{
          bgcolor: "#fffff2",
          border: "1px solid #d8dbae",
          borderRadius: 4,
          px: 4,
          py: 3,
          mb: 4,
          maxWidth: "100%",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Modak, cursive",
            color: "#095d40",
            mb: 1,
          }}
        >
          Bienvenue sur MyCafeList !
        </Typography>
        <Typography variant="body1" sx={{ color: "#333" }}>
          Cette application est dédiée aux amateurs de cafés et de moments
          conviviaux. Enregistre tes lieux, organise-toi et partage tes cafés
          favoris avec tes amis !
        </Typography>
      </Box>

      {/* boîte contenant les deux boutons d'action */}
      <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
        {" "}
        {/*bouton pour naviguer vers la page d'ajout d'un café*/}
        <Button
          variant="contained"
          size="large"
          sx={{ padding: 2 }}
          onClick={() => navigate("/add")}
        >
          Ajouter un café à ma liste
        </Button>
        {/* bouton pour naviguer vers la page listant les cafés à visiter */}
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
