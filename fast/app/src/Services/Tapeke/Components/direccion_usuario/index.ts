//  COMPONENT CONFIG
const component = "direccion_usuario"; // COMPONENT NAME
const version = "1.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";
import locationGoogleReducer from "./locationGoogleReducer";
import MapaBolivia from "./Pages/MapaBolivia";
import Direccion from "./Pages/Direccion";
import ListaDireccion from "./Pages/ListaDireccion";
import PopUpDirecciones from "./Pages/PopUpDirecciones";

export default {
    component,
    version,
    Actions,
    Reducers: {
        [component + 'Reducer']: Reducer,
        locationGoogleReducer,
    },
    Pages: {
        // [component + "/"]: MapaBolivia,
        // [component + "/mapaBolivia"]: MapaBolivia,
        [component + ""]: Direccion,
        [component + "/lista"]: ListaDireccion,
        ["direcciones"]: ListaDireccion,
        // [component + "/popupdirecciones"]: PopUpDirecciones,
        
        
    },
    Components: {
        // Item,
        // Item2,
    }
}