import SSocket from 'servisofts-socket';
import Parent from './index';
import Service from '../../index';
import horario from '../horario';
import pack from '../pack';
import restaurante from '../restaurante';

export default class Actions {
    static _getReducer = (props) => {
        return props.state[Parent.component + "Reducer"];
    }

    static refresh = (props) => {
        props.dispatch({
            type:"refresh",
            component: Parent.component
        });
    }
    static getAll = (props) => {
        var reducer = Actions._getReducer(props);
        var data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return null;
            SSocket.send({
                component: Parent.component,
                version: Parent.version,
                type: "getAll",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            })
            return null;
        }
        return data;
    }
    static getAllActivos = (props) => {
        var reducer = Actions._getReducer(props);
        var data = reducer.data_activos;
        if (!data) {
            if (reducer.estado == "cargando") return null;
            SSocket.send({
                component: Parent.component,
                version: Parent.version,
                type: "getAllActivos",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            })
            return null;
        }
        return data;
    }

    static getPedidoByKeyUsuario = (key_usuario, props) => {
        var data = Actions.getAllActivos(props);
        if (!data) return null;
        var arr = Object.values(data).filter((itm) => itm.key_usuario == key_usuario && itm.estado == 1)
        return arr;
    }
    static getPedidoByKeyUsuarioDetalle = (key_usuario, props) => {
        var data = Actions.getAll(props);
        var horarios = horario.Actions.getAll(props);
        var packs = pack.Actions.getAll(props);
        var restaurantes = restaurante.Actions.getAll(props);
        if (!data) return null;
        if (!horarios) return null;
        if (!packs) return null;
        if (!restaurantes) return null;
        var arr = Object.values(data).filter((itm) => itm.key_usuario == key_usuario && itm.estado == 1)
        if (!arr) return null;
        return arr.map((itm) => {
            return {
                ...itm,
                pack: packs[itm.key_pack],
                horario: horarios[packs[itm.key_pack]?.key_horario],
                restaurante: restaurantes[horarios[packs[itm.key_pack]?.key_horario]?.key_restaurante],
            }
        });
    }

    static getByKey = (key, props) => {
        var data = Actions.getAll(props);
        if (!data) return null;
        return data[key];
    }

    static getDetalle = (key, props) => {
        var reducer = Actions._getReducer(props);
        var data = reducer.dataDetalle[key];
        if (!data) {
            if (reducer.estado == "cargando") return null;
            SSocket.send({
                component: Parent.component,
                version: Parent.version,    
                type: "getDetalle",
                estado: "cargando",
                key_pedido: key,
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            })
            return null;
        }

        // console.log("romoe ",JSON.stringify(data));
        // console.log("romoe ",data);
        return data;
    }


    static getVendidos = ({ key_pack, fecha }, props) => {
        var data = Actions.getAllActivos(props);
        if (!data) return null;
        var arr = Object.values(data).filter(item => item.key_pack == key_pack && item.fecha == fecha && (item.state != "pendiente_pago" && item.state != "timeout_pago"));
        var cantidad = 0;
        arr.map(item => cantidad += item.cantidad);
        return cantidad;
    }

    static registro = (data, key_pedido, props) => {
        var sendT = {
            component: Parent.component,
            version: Parent.version,
            key_pedido: key_pedido,
            type: "registro",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: data
        }
        console.log("alvaro ", sendT);
        SSocket.send(sendT)
    }
    static editar = (data, props) => {
        SSocket.send({
            component: Parent.component,
            version: Parent.version,
            type: "editar",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: data
        })
    }
    static eliminar = (data, props) => {
        SSocket.send({
            component: Parent.component,
            version: Parent.version,
            type: "editar",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: {
                ...data,
                estado: 0,
            }
        })
    }
    static getDetalleEstado(pedido) {
        if (pedido.state == "pagado" && pedido.fecha_recordado) {
            return Parent.Estados["recordado"].title
        }
        if (Parent.Estados[pedido.state]) {
            return Parent.Estados[pedido.state].title
        }
        return pedido.state;
    }

}