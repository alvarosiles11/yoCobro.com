//  COMPONENT CONFIG
const component = "grupos"; // COMPONENT NAME
const version = "2.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";

import Grafico from "./Pages/Grafico";
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
    [component + "/registro"]: Registro,
    ["grupos/grafico"]: Grafico
  }
};
