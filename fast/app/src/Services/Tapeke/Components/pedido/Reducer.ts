import Parent from './index'
import { SStorage } from 'servisofts-component'
import Validations from '../../../../Validations';

type DataProps = {
    component: any,
    type: string,
    version?: any,
    estado?: "exito" | "cargando" | "error",
    error: any,
    [key: string]: any;
}

const initialState = () => {
    var initialState: any = {
        component: Parent.component,
        version: Parent.version,
        dataDetalle: {},
    }

    return initialState;
}


export default (state: any, action: DataProps) => {
    if (!state) return initialState();
    if (action.component != Parent.component) return state;
    if (action.type == "refresh") return initialState();
    // if (action.version != Parent.version) return state;
    TypesSwitch(state, action)
    state.type = action.type;
    state.estado = action.estado;
    state.error = action.error;
    state.lastSend = new Date();
    state = { ...state };
    return state;
}

const TypesSwitch = (state: any, action: DataProps) => {
    switch (action.type) {
        case "getAll": return getAll(state, action);
        case "getAllActivos": return getAllActivos(state, action);
        case "registro": return registro(state, action);
        case "editar": return editar(state, action);
        case "getById": return getById(state, action);
        case "getDetalle": return getDetalle(state, action);
    }
}

const getAll = (state: any, action: DataProps) => {

    if (action.estado != "exito") return;
    state.data = action.data;

    // SStorage.setItem("miInformation_log", JSON.stringify(action.data));

}
const getAllActivos = (state: any, action: DataProps) => {
    if (action.estado != "exito") return;
    state.data_activos = action.data;

}
const getDetalle = (state: any, action: DataProps) => {
    if (action.estado != "exito") return;
    state.dataDetalle[action.data.key] = action.data;
    Validations.set_pedido_en_curso(action.data);
}
const registro = (state: any, action: DataProps) => {
    if (action.estado != "exito") return;
    state.lastRegister = action.data;
    if (!state.data) return;
    state.data[action.data.key] = action.data;
}
const editar = (state: any, action: DataProps) => {
    if (action.estado != "exito") return;
    if (state.data) {
        state.data[action.data.key] = action.data;
    }
    if (state.data_activos) {
        state.data_activos[action.data.key] = action.data;
    }
    
}
const getById = (state: any, action: DataProps) => {
    if (action.estado != "exito") return;
    state.data[action.data.key] = action.data;
}