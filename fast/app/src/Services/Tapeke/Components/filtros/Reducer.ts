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
    return {
        component: Parent.component,
        version: Parent.version,
        data: {
            soloHoy: {
                key: "soloHoy",
                title: "Solo Hoy",
                active: false,
            },
            soloDisponible: {
                key: "soloDisponible",
                title: "Ocultar sin Packs",
                active: false,
            },
            entregaDomicilio: {
                key: "entregaDomicilio",
                title: "Solo entrega a Domicilio",
                active: false,
            },

        }
    };
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
        // case "getAll": return getAll(state, action);
        // case "registro": return registro(state, action);
        case "editar": return editar(state, action);
        case "setCustom": return setCustom(state, action);
    }
}

const editar = (state: any, action: DataProps) => {
    if (!state.data) return;
    state.data[action.data.key] = action.data;
}
const setCustom = (state: any, action: DataProps) => {
    state.custom = action.data;
}