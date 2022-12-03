//  COMPONENT CONFIG
const component = "ubicacion"; // COMPONENT NAME
const version = "2.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";

import Lista from "./Pages/Lista";
import Registro from "./Pages/Registro";

export default {
  component,
  version,
  Actions,
  Reducers: {
    [component + "Reducer"]: Reducer
  },
  Pages: {
    [component]: Lista,
    [component + "/registro"]: Registro
  }
};
