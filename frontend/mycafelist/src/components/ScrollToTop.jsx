//ce document définit un composant ScrollToTop pour défiler vers le haut de la page lors du changement d'url
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//on récupère le chemin actuel
const ScrollToTop = () => {
  const { pathname } = useLocation();

  //à chaque nouvelle page, on défile en "douceur"
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
