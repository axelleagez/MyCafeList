import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#fffff2", //blanc beige
    },
    primary: {
      main: "#2F5233", // vert foncé
      contrastText: "#ffffff", // blanc
    },
    secondary: {
      main: "#d19b63", //marron clair
    },
    error: {
      main: "#ce5b3b", // orange
    },
    success: {
      main: "#55692d", //vert kaki
    },
    text: {
      primary: "#333", //gris
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: { fontFamily: "Modak, cursive" },
    h2: { fontFamily: "Modak, cursive" },
    h3: { fontFamily: "Modak, cursive" },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          borderRadius: "20px",
          padding: "10px 20px",
          textTransform: "none",
          fontWeight: 500,
          boxShadow: "none",
          transition: "0.2s ease-in-out",
        },
        containedPrimary: {
          backgroundColor: "#2F5233",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#0b6a47",
          },
        },
        outlinedPrimary: {
          borderColor: "#095d40",
          color: "#095d40",
          "&:hover": {
            borderColor: "#0b6a47",
            backgroundColor: "#f5f5f5",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
        },
      },
    },
  },
});

export default theme;
