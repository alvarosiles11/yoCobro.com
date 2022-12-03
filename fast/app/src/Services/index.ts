import Geologia from "./Geologia";
import Roles_permisos from "./Roles_permisos";
import Usuario from "./Usuario";
const Pages = {
  ...Usuario.Pages,
  ...Roles_permisos.Pages,
  ...Geologia.Pages
};

const Reducers = {
  ...Usuario.Reducers,
  ...Roles_permisos.Reducers,
  ...Geologia.Reducers
};

export default {
  Pages,
  Reducers
};
