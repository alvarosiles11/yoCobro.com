import SSocket from 'servisofts-socket';
import Parent from './index';
import Service from '../../index';
import { SThread } from 'servisofts-component';

export default class Actions {
    static _getReducer = (props) => {
        return props.state[Parent.component + "Reducer"];
    }
    static getAllComponents = (props, force = false) => {
        var components = ["restaurante", "horario", "pack", "novedades", "favorito"];
        var reducer = Actions._getReducer(props);
        if (reducer.estado == "cargando") return null;
        if (reducer["getAllComponents"] && !force) return reducer["getAllComponents"];
        new SThread(250, "sad", true).start(() => {
            var request = {
                component: Parent.component,
                type: "getAllComponents",
                estado: "cargando",
                components: components,
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            }
            SSocket.send(request);
        })

        return null;
    }

}