import Services from "../Services";
import TestListaGrupos from "./TestListaGrupos";
import TestUbicacion from "./TestListaUbicacion";
import TestMapa from "./TestMapa";
import TestRegistroGrupo from "./TestRegistroGrupo";
import TestRegistroUbicacion from "./TestRegistroUbicacion";

const Pages = {
  // "/": MensajeSolicitud,
  // "/": chatPage,
  "/": TestListaGrupos,
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
