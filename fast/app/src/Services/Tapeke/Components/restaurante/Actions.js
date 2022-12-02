import SSocket from 'servisofts-socket';
import Parent from './index';
import horario from '../horario';
import pack from '../pack';
import { SDate } from 'servisofts-component';
import pedido from '../pedido';
import filtros from '../filtros';
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

    static getDistance(lat1, lon1, lat2, lon2) {
        var rad = function (x) { return x * Math.PI / 180; }
        var R = 6378.137; //Radio de la tierra en km 
        var dLat = rad(lat2 - lat1);
        var dLong = rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) *
            Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        //aquí obtienes la distancia en metros por la conversion 1Km =1000m
        var d = R * c * 1000;
        return d;
    }
    //filter:{ soloHoy:bool, soloDisponible:bool, entregaDomicilio:bool }
    static getAllFilter = (filter, props) => {
        var miDireccion = props.state.direccion_usuarioReducer.miDireccion;
        if (!miDireccion) return null;
        if (!miDireccion.latitude) return null;
        var data = Actions.getAll(props);
        var horarios_restaurantes = horario.Actions.getAll(props);
        var packs = pack.Actions.getAll(props);
        if (!data) return null;
        if (!horarios_restaurantes) return null;
        if (!packs) return null;
        var data_pedidos = pedido.Actions.getAllActivos(props);
        // if (!data_pedidos) return null;

        var filtrosCustom = filtros.Actions.getCustom(props);
        var miDistancia = props.state.direccion_usuarioReducer.miDistancia;
        var list = [];
        Object.values(data).map((obj) => {
            if (obj.estado != 1) return;
            if (filter.entregaDomicilio && !obj.delivery) return;


            //Distancias
            if (!obj.latitude || !obj.longitude) return;
            obj.distancia = parseFloat(Actions.getDistance(miDireccion.latitude, miDireccion.longitude, obj.latitude, obj.longitude) / 1000).toFixed(1);
            if (miDistancia < obj.distancia) return null;
            //Horarios
            var arr_horarios = Object.values(horarios_restaurantes).filter(itm => itm.key_restaurante == obj.key);
            if (arr_horarios.length <= 0) return null;
            obj.horario = horario.Actions.getByKeyRestauranteProximo(obj.key, props);
            if (!obj.horario) return null;
            //Cargamos el pack
            obj.pack = pack.Actions.getByKeyHorario(obj.horario.key, props);
            if (filter.soloDisponible) {
                if (!obj.pack) return null;
            }
            if (obj.horario.dia != new SDate().getDayOfWeek()) {
                if (filter.soloHoy) {
                    //SI no queremos que aparesca los del proximo miercoles
                    // if (obj.horario.sdate.toString("yyyy-MM-dd") != new SDate().toString("yyyy-MM-dd")) return null; 
                    return;
                }
            }

            if (obj.pack) {
                var cantidad = pedido.Actions.getVendidos({ key_pack: obj.pack.key, fecha: obj.horario.fecha }, props);
                obj.pack.disponibles = obj.pack.cantidad - cantidad;
                if (obj.pack.disponibles <= 0) {
                    obj.pack.disponibles = 0;
                    if (filter.soloDisponible) {
                        return null;
                    }
                }
            }

            //INSERTAMOS
            if (filtrosCustom) {
                var valid = true;
                Object.keys(filtrosCustom).map((key) => {
                    var fc = filtrosCustom[key];
                    if (!fc) return;
                    if(!fc.active) return;
                    if (fc.validate) {
                        if (!fc.validate(obj, fc)) {
                            valid = false;
                        }
                    }
                })
                if (!valid) return null;
            }
            list.push(obj);
        })

        list = list.sort((a, b) => {
            return a.distancia > b.distancia ? 1 : -1;
        });
        list = list.sort((a, b) => {
            return a.horario.sdate.getTime() > b.horario.sdate.getTime() ? 1 : -1;
        });
        return list;
    }
    static getByKey = (key, props) => {
        var data = Actions.getAll(props);
        if (!data) return null;
        return data[key];
    }
    static getByKeyDetalle = (key, props) => {
        var data = Actions.getAll(props);
        var horarios_restaurantes = horario.Actions.getAll(props);
        var data_pack = pack.Actions.getAll(props);
        var data_pedidos = pedido.Actions.getAllActivos(props);
        if (!data) return null;
        if (!data_pack) return null;
        if (!horarios_restaurantes) return null;
        if (!data_pedidos) return null;
        var obj = data[key];
        if (!obj) return null;
        obj.horario = horario.Actions.getByKeyRestauranteProximo(obj.key, props);
        if (!obj.horario) return null;
        obj.pack = pack.Actions.getByKeyHorario(obj.horario.key, props);

        if (!obj.latitude || !obj.longitude) return null;
        var miDireccion = props.state.direccion_usuarioReducer.miDireccion;
        obj.distancia = parseFloat(Actions.getDistance(miDireccion.latitude, miDireccion.longitude, obj.latitude, obj.longitude) / 1000).toFixed(1);

        if (obj.pack) {
            var cantidad = pedido.Actions.getVendidos({ key_pack: obj.pack.key, fecha: obj.horario.fecha }, props);
            obj.pack.disponibles = obj.pack.cantidad - cantidad;
            if (obj.pack.disponibles <= 0) {
                obj.pack.disponibles = 0;
            }
        }
        return obj;
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