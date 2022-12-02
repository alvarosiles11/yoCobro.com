//  COMPONENT CONFIG
const component = "calificacion"; // COMPONENT NAME
const version = "2.0";
// ---------------------------------------
import Actions from "./Actions";
import MediaRestaurante from "./Components/MediaRestaurante";

import registro from "./Pages/registro";
import Reducer from "./Reducer";
export default {
    component,
    version,
    Actions,
    Reducers: {
        [component + 'Reducer']: Reducer
    },
    Pages: {

        [component]: registro,

    },
    Components: {
        MediaRestaurante
    }
}