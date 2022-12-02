import SSocket from 'servisofts-socket';
import Parent from './index';
import Service from '../../index';

export default class Actions {
    static _getReducer = (props) => {
        return props.state[Parent.component + "Reducer"];
    }
    static refresh = (props) => {
        props.dispatch({
            type: "refresh",
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
                key_cliente: props.state.usuarioReducer.usuarioLog.key,
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            })
            console.log("getAll")
            return null;
        }
        return data;
    }

    static getByKeyUsuario = (key_usuario, props) => {
        var data = Actions.getAll(props);
        if (!data) return null;
        var arr = Object.values(data).filter((itm) => itm.key_usuario == key_usuario)
        return arr;
    }
    static getByKeyCliente = (key_usuario, props) => {
        var data = Actions.getAll(props);
        if (!data) return null;
        var arr = Object.values(data).filter((itm) => itm.key_cliente == key_usuario)
        return arr;
    }

    static getByKey = (key, props) => {
        var data = Actions.getAll(props);
        if (!data) return null;
        return data[key];
    }

    static registro = (data, props) => {
        SSocket.send({
            component: Parent.component,
            version: Parent.version,
            type: "registro",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: data
        })
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
}