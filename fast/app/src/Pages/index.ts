import Services from "../Services";
import grafico from "../Services/Geologia/Components/grupo/Pages/grafico";
import Registro from "../Services/Geologia/Components/ubicacion/Pages/registro";
import TestListaGrupos from "./TestListaGrupos";
import TestMapa from "./TestMapa";

const Pages = {
  "/": TestMapa,
  // ListaU: Lista,
  // Registro: RegistroGrupo,
  // Grafico: Grafico,
  // Lista: ListaGrupo,

  ...Services.Pages
};

export default Pages;
