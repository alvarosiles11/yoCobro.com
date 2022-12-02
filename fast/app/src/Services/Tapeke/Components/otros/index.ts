//  COMPONENT CONFIG
const component = "consulta"; // COMPONENT NAME
const version = "2.0";
// ---------------------------------------
import Actions from "./Actions";
// import Horario from "./Components/Horario";
import Contacto from "./Pages/Contacto";
import Ayuda from "./Pages/Ayuda";

export default {
    component,
    version,
    Actions,

    Pages: {
        [component + "/contacto"]: Contacto,
        [component + "/ayuda"]: Ayuda,
    },
    // Components: {
    //     Horario,
    // }
}
