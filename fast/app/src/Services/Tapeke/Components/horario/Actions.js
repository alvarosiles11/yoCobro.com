import SSocket from 'servisofts-socket';
import Parent from './index';
import Service from '../../index';
import { SDate } from 'servisofts-component';

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

    static getByKeyRestaurante = (key, props) => {
        var data = Actions.getAll(props);
        if (!data) return null;
        return Object.values(data).filter(itm => itm.key_restaurante == key)
    }
    static getByKeyRestauranteProximo = (key, props) => {
        var data = Actions.getAll(props);
        if (!data) return null;
        var arr = Object.values(data).filter(itm => itm.key_restaurante == key && itm.dia != -1)
        if (arr.length == 0) return "void";
        var date = new SDate();
        var arr2 = arr.filter(itm => itm.dia >= date.getDayOfWeek());

        if (arr2.length > 0) {
            arr2.sort((a, b) => { return a.dia > b.dia ? 1 : -1 });
        } else {
            arr2 = arr;
            arr2.sort((a, b) => { return a.dia > b.dia ? 1 : -1 });
        }
        var list = [];
        arr2.map((dow) => {
            var date = new SDate();
            var dia = dow.dia;
            var text = SDate.getDayOfWeek(dia).text;
            if (dia == date.getDayOfWeek()) {
                text = "hoy";
                dow.fecha = date.toString("yyyy-MM-dd");
            } else if (dia > date.getDayOfWeek()) {
                dow.fecha = date.addDay(dow.dia - date.getDayOfWeek()).toString("yyyy-MM-dd");
            } else if (dia < date.getDayOfWeek()) {
                dow.fecha = date.addDay(7 - date.getDayOfWeek() + dow.dia).toString("yyyy-MM-dd");
            }
            var dia = new SDate(dow.fecha + " " + dow.hora_fin, "yyyy-MM-dd hh:mm");
            if (dia.getTime() < new SDate().getTime()) {
                dow.fecha = date.addDay(7).toString("yyyy-MM-dd");
                text = "Proximo " + SDate.getDayOfWeek(dow.dia).text?.toLowerCase();
                dia = new SDate(dow.fecha + " " + dow.hora_fin, "yyyy-MM-dd hh:mm");
            }
            dow.sdate = dia;
            dow.text = text + " " + dow.hora_inicio + " - " + dow.hora_fin;
            dow.extraData ={
                text: text,
                hora_inicio: dow.hora_inicio,
                hora_fin: dow.hora_fin,
            }
 
            list.push(dow);
        })
        list.sort((a, b) => { return a.sdate.getTime() > b.sdate.getTime() ? 1 : -1 });
        return list[0];
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