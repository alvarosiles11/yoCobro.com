import {SPageListProps} from "servisofts-component";
import intro from "./Components/intro";

// import recoger_usuario from './Components/recoger_usuario';

const ServiceName = "tapeke";

const Pages: SPageListProps = {
  ...intro.Pages
  // ...restaurante.Pages,
  // ...horario.Pages,
  // ...pedido.Pages,
  // ...direccion_usuario.Pages,
  // ...pack.Pages,
  // ...billetera.Pages,
  // ...favorito.Pages,
  // ...costo_envio.Pages,
  // ...otros.Pages,
  // ...filtros.Pages,
  // ...novedades.Pages,
  // ...pago_tarjeta.Pages,
  // ...usuario_restaurante.Pages,
  // ...calificacion.Pages,
  // ...general.Pages,
  // ...recoger_usuario.Pages,
  // ...chatPage.Pages,
};

const Reducers = {
  // ...restaurante.Reducers,
  // ...pedido.Reducers,
  // ...horario.Reducers,
  // ...direccion_usuario.Reducers,
  // ...pack.Reducers,
  // ...billetera.Reducers,
  // ...favorito.Reducers,
  // ...costo_envio.Reducers,
  // ...filtros.Reducers,
  // ...novedades.Reducers,
  // ...pago_tarjeta.Reducers,
  // ...PedidoEnCurso.Reducers,
  // ...usuario_restaurante.Reducers,
  // ...calificacion.Reducers,
  // ...general.Reducers,
  // ...recoger_usuario.Reducers,
  // ...chatPage.Reducers,
};

export default {
  ServiceName,
  Pages,
  Reducers
};
