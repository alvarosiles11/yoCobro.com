import { SPageListProps } from 'servisofts-component'
import intro from "./Components/intro"
import restaurante from "./Components/restaurante"
import pedido from "./Components/pedido"
import horario from './Components/horario';
import direccion_usuario from './Components/direccion_usuario';
import pack from './Components/pack';
import billetera from './Components/billetera';
import favorito from './Components/favorito';
import costo_envio from './Components/costo_envio';
import otros from './Components/otros';
import filtros from './Components/filtros';
import novedades from './Components/novedades';
import pago_tarjeta from './Components/pago_tarjeta';
import usuario_restaurante from './Components/usuario_restaurante';

import PedidoEnCurso from './Tasks/PedidoEnCurso';
import calificacion from './Components/calificacion';

// import recoger_usuario from './Components/recoger_usuario';
// import chatPage from './Components/chatPage';
import general from './Components/general';

const ServiceName = "tapeke";

const Pages: SPageListProps = {
    ...intro.Pages,
    ...restaurante.Pages,
    ...horario.Pages,
    ...pedido.Pages,
    ...direccion_usuario.Pages,
    ...pack.Pages,
    ...billetera.Pages,
    ...favorito.Pages,
    ...costo_envio.Pages,
    ...otros.Pages,
    ...filtros.Pages,
    ...novedades.Pages,
    ...pago_tarjeta.Pages,
    ...usuario_restaurante.Pages,
    ...calificacion.Pages,
    ...general.Pages,
    // ...recoger_usuario.Pages,
    // ...chatPage.Pages,


}

const Reducers = {
    ...restaurante.Reducers,
    ...pedido.Reducers,
    ...horario.Reducers,
    ...direccion_usuario.Reducers,
    ...pack.Reducers,
    ...billetera.Reducers,
    ...favorito.Reducers,
    ...costo_envio.Reducers,
    ...filtros.Reducers,
    ...novedades.Reducers,
    ...pago_tarjeta.Reducers,
    ...PedidoEnCurso.Reducers,
    ...usuario_restaurante.Reducers,
    ...calificacion.Reducers,
    ...general.Reducers,
    // ...recoger_usuario.Reducers,
    // ...chatPage.Reducers,
}

export default {
    ServiceName,
    Pages,
    Reducers
};