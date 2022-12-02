//  COMPONENT CONFIG
const component = "intro"; // COMPONENT NAME 
const version = "2.0"; 
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";

import CargaIntro from "./Pages/CargaIntro";
import Paso1 from "./Pages/Paso1";
import Paso2 from "./Pages/Paso2";
import Paso3 from "./Pages/Paso3";

export default {
    component,
    version,
    Actions,
    Reducers: {
        [component + 'Reducer']: Reducer
    },
    Pages: {
        [component]: CargaIntro,
        [component + "/paso1"]: Paso1,
        [component + "/paso2"]: Paso2,
        [component + "/paso3"]: Paso3,

    }
}