//  COMPONENT CONFIG
const component = "payment_type"; // COMPONENT NAME 
const version = "1.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";
// import Components from "./Components";
import Lista from "./Pages/Lista";
import Registro from "./Pages/Registro";
import TipoPago from "./Components/TipoPago";
import TipoPago_QR from "./Components/TipoPago_QR";
import TipoPago_TigoMoney from "./Components/TipoPago_TigoMoney";
 

//alvaro
export default {
    component,
    version,
    Actions,
    // ...Components,
    Reducers: {
        [component + 'Reducer']: Reducer
    },
    Pages: {
        [component + "/"]: Lista,

        [component + "/registro"]: Registro,
        [component + "/lista"]: Lista,
    } , 
    Components: {
        TipoPago,
        TipoPago_QR,
        TipoPago_TigoMoney
    }
}