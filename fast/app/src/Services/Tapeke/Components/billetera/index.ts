//  COMPONENT CONFIG
const component = "billetera"; // COMPONENT NAME
const version = "1.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";
import Lista from "./Pages/Lista";
import registro from "./Pages/registro";
import Billetera from "./Pages/Billetera";
import CargarCredito from "./Pages/CargarCredito";
import QR from "./Pages/QR";
export default {
    component,
    version,
    Actions,
    Reducers: {
        [component + 'Reducer']: Reducer
    },
    Pages: {
        [component + ""]: Billetera,
        [component + "/cargarcredito"]: CargarCredito,
        [component + "/qr"]: QR,


        ["admin/" + component]: Lista,
        ["admin/" + component + "/registro"]: registro,
    },
    Components: {}
}
