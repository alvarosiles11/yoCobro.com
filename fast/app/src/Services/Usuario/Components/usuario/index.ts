//  COMPONENT CONFIG
const component = "usuario"; // COMPONENT NAME 
const version = "2.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";

import Lista from "./Pages/Lista";
import Registro from "./Pages/registro/Registro";
import RegistroPassword from "./Pages/registro/RegistroPassword";
import RegistroTelefono from "./Pages/registro/RegistroTelefono";
import SmsValidation from "./Pages/registro/SmsValidation";
import RegistroCarga from "./Pages/registro/RegistroCarga";

import RecuperarPass from "./Pages/RecuperarPass";
import CodigoRecuperarPass from "./Pages/CodigoRecuperarPass";
import NuevoPass from "./Pages/NuevoPass";
import TipoUsuario from "./Pages/TipoUsuario";
import Login from "./Pages/Login";
import Editar from "./Pages/EditarUsuario";
import Perfil from "./Pages/Perfil";
import RolUsr from "./Pages/RolUsr";
//alvaro
export default {
    component,
    version,
    Actions,
    Reducers: {
        [component + 'Reducer']: Reducer
    },
    Pages: {
        ["admin/" + component]: Lista,
        [component + "/registro"]: Registro,
        [component + "/registropassword"]: RegistroPassword,
        [component + "/registrotelefono"]: RegistroTelefono,
        [component + "/smsvalidation"]: SmsValidation,
        [component + "/carga"]: RegistroCarga,
        [component + "/recuperarContrasena"]: RecuperarPass,
        [component + "/codigoRecuperarContrasena"]: CodigoRecuperarPass,
        [component + "/nuevaContrasena"]: NuevoPass,
        [component + "/rol"]: RolUsr,
        "perfil": Perfil,
        "login": Login,
        "editar": Editar
    }
}