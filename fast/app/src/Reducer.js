import { combineReducers } from 'redux';
import { SStorage } from 'servisofts-component';
import Services from './Services';

const reducers = combineReducers({
    ...Services.Reducers
});

export default (state, action) => {
    switch (action.type) {
        case 'USUARIO_LOGOUT':
            SStorage.removeItem("usr_log");
            SStorage.removeItem("miDireccion_log");
            SStorage.removeItem("miDistancia_log");
            state = undefined;
            break;
        default:
            break;
    }
    return reducers(state, action);
}