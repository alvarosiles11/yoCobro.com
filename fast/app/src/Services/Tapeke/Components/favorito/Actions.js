import SSocket from 'servisofts-socket';
import Parent from './index';

export default class Actions {
    static _getReducer = (props) => {
        return props.state[Parent.component + "Reducer"];
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

    static getByKey = (key, props) => {
        var data = Actions.getAll(props);
        if (!data) return null;
        return data[key];
    }
    static getByKeyUsuario = (key_usuario, props) => {
        var data = Actions.getAll(props);
        if (!data) return null;
        var arr = Object.values(data).filter((itm) => itm.key_usuario == key_usuario && itm.estado == 1)
        return arr;
    }
    static getByKeyRestauranteAndKeyUsuario = (key_restaurante, key_usuario, props) => {
        var data = Actions.getAll(props);
        if (!data) return null;
        var arr = Object.values(data).filter((itm) => itm.key_restaurante == key_restaurante && itm.key_usuario == key_usuario && itm.estado == 1)
        if (arr.length <= 0) return "void";
        return arr[0];
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

    static registroHorario = (data, props) => {
        SSocket.send({
            component: Parent.component,
            version: Parent.version,
            type: "registroHorario",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: data
        })
    }
}