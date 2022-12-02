//  COMPONENT CONFIG
const component = "novedades"; // COMPONENT NAME
const version = "2.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";
import Lista from "./Pages/Lista";
import Registro from "./Pages/Registro";
import Novedades from "./Pages/Novedades";



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
        ["admin/" + component]: Lista,
        ["admin/" + component + "/registro"]: Registro,
        [component ]: Novedades,
    },
    Components: {
       
    }
}