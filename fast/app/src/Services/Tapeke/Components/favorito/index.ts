//  COMPONENT CONFIG
const component = "favorito"; // COMPONENT NAME
const version = "1.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";
import Favoritos from "./Pages/Favoritos";


export default {
    component,
    version,
    Actions,
    Reducers: {
        [component + 'Reducer']: Reducer
    },
    Components: {
    },
    Pages: {
        ["favorito"]: Favoritos,
        [component + "/lista"]: Favoritos,
    }

}