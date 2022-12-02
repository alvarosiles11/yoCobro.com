import { SStorage } from 'servisofts-component'
import Parent from './index'

type DataProps = {
    component: any,
    type: string,
    version?: any,
    estado?: "exito" | "cargando" | "error",
    error: any,
    [key: string]: any;
}

const initialState = () => {

    // return {
    //     component: Parent.component,
    //     version: Parent.version,
    // };
    var initialState: any = {
        component: Parent.component,
        version: Parent.version,
        miDistancia: 30,
    }
    SStorage.getItem("miDireccion_log", (resp: any) => {
        initialState.miDireccion = JSON.parse(resp);
    })
    SStorage.getItem("miDistancia_log", (resp: any) => {
        if (!resp) return;
        initialState.miDistancia = parseInt(resp);
    })
    return initialState;
}
export default (state: any, action: DataProps) => {
    if (!state) return initialState();
    if (action.component != Parent.component) return state;
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
        case "registro": return registro(state, action);
        case "editar": return editar(state, action);
        case "getById": return getById(state, action);
        case "editarMiDireccion": return editarMiDireccion(state, action);
        case "editarMiDistancia": return editarMiDistancia(state, action);
    }
}

const getAll = (state: any, action: DataProps) => {
    if (action.estado != "exito") return;
    state.data = action.data;
}
const registro = (state: any, action: DataProps) => {
    if (action.estado != "exito") return;
    state.lastRegister = action.data;
    if (!state.data) return;
    state.data[action.data.key] = action.data;
}
const editar = (state: any, action: DataProps) => {
    if (action.estado != "exito") return;
    if (!state.data) return;
    state.data[action.data.key] = action.data;
}
const getById = (state: any, action: DataProps) => {
    if (action.estado != "exito") return;
    state.data[action.data.key] = action.data;
}
const editarMiDireccion = (state: any, action: DataProps) => {
    state.miDireccion = action.data;
    SStorage.setItem("miDireccion_log", JSON.stringify(action.data));
}
const editarMiDistancia = (state: any, action: DataProps) => {
    state.miDistancia = parseInt(action.data);
    SStorage.setItem("miDistancia_log", parseInt(action.data) + "");
}