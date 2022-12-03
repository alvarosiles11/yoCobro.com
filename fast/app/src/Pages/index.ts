import Services from "../Services";
import Grafico from "../Services/Geologia/Components/grupos/Pages/Grafico";
import ListaGrupo from "../Services/Geologia/Components/grupos/Pages/Lista";
import RegistroGrupo from "../Services/Geologia/Components/grupos/Pages/Registro";
import Lista from "../Services/Geologia/Components/Ubicacion/Pages/Lista";
import Registro from "../Services/Geologia/Components/Ubicacion/Pages/Registro";
import TestUbicacion from "./TestListaUbicacion";
import TestMapa from "./TestMapa";
import TestRegistroGrupo from "./TestRegistroGrupo";
import TestRegistroUbicacion from "./TestRegistroUbicacion";

const Pages = {
  // "/": MensajeSolicitud,
  // "/": chatPage,
  "/": Registro,
  ListaU: Lista,
  Registro: RegistroGrupo,
  Grafico: Grafico,
  Lista: ListaGrupo,
  // "/": Grafico,
  // "/": TestListaGrupos,
  testRegistroGrupo: TestRegistroGrupo,
  testMapa: TestMapa,
  testRegistroUbicacion: TestRegistroUbicacion,
  testUbicacion: TestUbicacion,
  // "/": Test,
  // "/": PedidoQR,
  // "/": Preparacion,
  // test: Test,
  // carga: Carga,
  // home: Home,
  // ajustes: Ajustes,
  // admin: Administracion,
  // terminos: TerminosCondiciones,
  // inDevelop: inDevelop,
  ...Services.Pages
  // direccion: SelectDireccion,
  // compras: MisCompras,
  // "billetera": Billetera,
  // ayuda: Ayuda
};

export default Pages;
