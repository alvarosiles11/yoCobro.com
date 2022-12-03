import org.json.JSONObject;

import Component.Grupos;
import Component.Ubicacion;
import Component.usuario;
import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SConsole;

public class Manejador {
    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        if (session != null) {
            SConsole.log(session.getIdSession(), "\t|\t", obj.getString("component"), obj.getString("type"));
        } else {
            SConsole.log("NoSocketSession", "\t|\t", obj.getString("component"), obj.getString("type"));
        }
        if (obj.isNull("component")) {
            return;
        }
        switch (obj.getString("component")) {
            case Grupos.COMPONENT:
                Grupos.onMessage(obj, session);
                break;
            case Ubicacion.COMPONENT:
                Ubicacion.onMessage(obj, session);
                break;
            case usuario.COMPONENT:
                usuario.onMessage(obj, session);
                break;

        }
    }
}
