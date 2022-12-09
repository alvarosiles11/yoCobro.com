//  COMPONENT CONFIG
const component = "grupo"; // COMPONENT NAME
const version = "2.0";
// ---------------------------------------
import Actions from "./Actions";
import grafico from "./Pages/grafico";
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
    "/": lista,
    [component]: lista,
    [component + "/registro"]: registro,
    [component + "/grafico"]: grafico
  }
};
