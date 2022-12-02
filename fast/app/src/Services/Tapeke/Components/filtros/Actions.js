import Parent from './index';

export default class Actions {
    static _getReducer = (props) => {
        return props.state[Parent.component + "Reducer"];
    }
    static getAll = (props) => {
        var reducer = Actions._getReducer(props);
        return reducer.data;
    }
    static getFiltrosActivos = (props) => {
        var reducer = Actions._getReducer(props);
        var data = reducer.data;
        var filtros = {};
        Object.values(data).map((obj) => {
            if (obj.active) {
                filtros[obj.key] = true;
            }
        })
        return filtros;
    }
    static setCustom = (data, props) => {
        props.dispatch({
            component: "filtros",
            type: "setCustom",
            data: data
        })
    }
    static getCustom = (props) => {
        var reducer = Actions._getReducer(props);
        var data = reducer.custom;
        // var filtros = {};
        // Object.values(data).map((obj) => {
        //     if (obj.active) {
        //         filtros[obj.key] = true;
        //     }
        // })
        return data;
    }
}