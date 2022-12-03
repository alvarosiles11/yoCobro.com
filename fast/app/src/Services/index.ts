import Roles_permisos from "./Roles_permisos";
import Tapeke from "./Tapeke";
import Usuario from "./Usuario";
const Pages = {
  ...Usuario.Pages,
  ...Roles_permisos.Pages,
  ...Tapeke.Pages
  // ...Multipagos.Pages,
};

const Reducers = {
  ...Usuario.Reducers,
  ...Roles_permisos.Reducers,
  ...Tapeke.Reducers
  // ...Multipagos.Reducers,
};

export default {
  Pages,
  Reducers
};
