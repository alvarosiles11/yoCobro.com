import Services from "../Services";
import Registro from "../Services/Geologia/Components/ubicaciones/Pages/registro";

const Pages = {
  "/": Registro,
  // ListaU: Lista,
  // Registro: RegistroGrupo,
  // Grafico: Grafico,
  // Lista: ListaGrupo,

  ...Services.Pages
};

export default Pages;
