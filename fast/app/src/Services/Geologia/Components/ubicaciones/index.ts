//  COMPONENT CONFIG
const component = "ubicacion"; // COMPONENT NAME
const version = "2.0";
// ---------------------------------------
import Actions from "./Actions";
import lista from "./Pages/lista";
import registro from "./Pages/registro";

import Reducer from "./Reducer";

export default {
  component,
  version,
  Actions,
  Reducers: {
    [component + "Reducer"]: Reducer
  },
  Pages: {
    [component]: lista,
    [component + "/lista"]: lista,
    [component + "/registro"]: registro
  }
};
