//  COMPONENT CONFIG
const component = "pedido"; // COMPONENT NAME
const version = "1.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";

import Detalle from "./Pages/Detalle";
import Confirmar from "./Pages/Confirmar";
import Mapa from "./Pages/Mapa";
import MensajeSolicitud from "./Pages/MensajeSolicitud";
// import PedidoConfirmacion from "./Pages/PedidoConfirmacion";
import PedidoQR from "./Pages/PedidoQR";
import Carga from "./Pages/Carga";
import NoRecogido from "./Pages/NoRecogido";
import PagadoU from "./Pages/recoger_usuario/Pagado";
import EntregaTiempo from "./Pages/recoger_usuario/EntregaTiempo";
import PagadoD from "./Pages/recoger_delivery/Pagado";

import PedidoState from "./PedidoStates.json";
export default {
    component,
    version,
    Actions,
    Estados: PedidoState,
    Reducers: {
        [component + 'Reducer']: Reducer
    },
    Pages: {
        [component]: Carga,
        [component + "/detalle"]: Detalle,
        [component + "/confirmar"]: Confirmar,
        [component + "/mapa"]: Mapa,
        [component + "/mensajeSolicitud"]: MensajeSolicitud,
        // [component + "/confirmacion"]: PedidoConfirmacion,
        [component + "/pedidoqr"]: PedidoQR,
        [component + "/noRecogido"]: NoRecogido,
        [component + "/noRecogido"]: NoRecogido,

        [component + "/usuario/pagado"]: PagadoU,
        [component + "/usuario/entrega"]: EntregaTiempo,

        [component + "/delivery/pagado"]: PagadoD,

    },
}