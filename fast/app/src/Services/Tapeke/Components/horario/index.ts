//  COMPONENT CONFIG
const component = "horario"; // COMPONENT NAME
const version = "2.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";
import testing from "./Pages/testing";
import Horario from "./Components/Horario";

import registroHorario from "./Pages/registroHorario";
import listaHorario from "./Pages/listaHorario";
export default {
    component,
    version,
    Actions,
    Reducers: {
        [component + 'Reducer']: Reducer
    },
    Pages: {
        ["admin/"+component]: listaHorario,
        ["admin/"+component + "/registro"]: registroHorario,
    },
    Components: {
        Horario,
    }
}
