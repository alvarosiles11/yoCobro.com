//  COMPONENT CONFIG
const component = "costo_envio"; // COMPONENT NAME
const version = "2.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";
import lista from "./Pages/lista";
import registro from "./Pages/registro";



//Horarios

//Packs

export default {
    component,
    version,
    Actions,
    Reducers: {
        [component + 'Reducer']: Reducer
    },
    Pages: {
        ["admin/" + component]: lista,
        ["admin/" + component + "/registro"]: registro,
    },
    Components: {
       
    }
}