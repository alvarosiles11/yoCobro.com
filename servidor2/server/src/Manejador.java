import org.json.JSONObject;

import Component.BackgroundLocation;
import Component.Billetera;
import Component.Favorito;
import Component.Horario;
import Component.Pack;
import Component.Restaurante;
import Component.base_notification;
import Component.calificacion;
import Component.chat;
import Component.conductor_horario;
import Component.costo_envio;
import Component.delivery;
import Component.direccion_usuario;
import Component.enviroment;
import Component.firebase_token;
import Component.general;
import Component.grupo;
import Component.novedades;
import Component.pago_tarjeta;
import Component.pedido;
import Component.pregunta_frecuente;
import Component.sms_code;
import Component.ubicacion;
import Component.usuario;
import Component.usuario_restaurante;
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
            case grupo.COMPONENT:
                grupo.onMessage(obj, session);
                break;
            case ubicacion.COMPONENT:
                ubicacion.onMessage(obj, session);
                break;
            case Restaurante.COMPONENT:
                Restaurante.onMessage(obj, session);
                break;
            case Billetera.COMPONENT:
                Billetera.onMessage(obj, session);
                break;
            case direccion_usuario.COMPONENT:
                direccion_usuario.onMessage(obj, session);
                break;
            case Horario.COMPONENT:
                Horario.onMessage(obj, session);
                break;
            case Pack.COMPONENT:
                Pack.onMessage(obj, session);
                break;
            case Favorito.COMPONENT:
                Favorito.onMessage(obj, session);
                break;
            case costo_envio.COMPONENT:
                costo_envio.onMessage(obj, session);
                break;
            case pedido.COMPONENT:
                pedido.onMessage(obj, session);
                break;
            case novedades.COMPONENT:
                novedades.onMessage(obj, session);
                break;
            case BackgroundLocation.COMPONENT:
                BackgroundLocation.onMessage(obj, session);
                break;
            case pago_tarjeta.COMPONENT:
                pago_tarjeta.onMessage(obj, session);
                break;
            case usuario_restaurante.COMPONENT:
                usuario_restaurante.onMessage(obj, session);
                break;
            case calificacion.COMPONENT:
                calificacion.onMessage(obj, session);
                break;
            case enviroment.COMPONENT:
                enviroment.onMessage(obj, session);
                break;
            case conductor_horario.COMPONENT:
                conductor_horario.onMessage(obj, session);
                break;
            case sms_code.COMPONENT:
                sms_code.onMessage(obj, session);
                break;
            case chat.COMPONENT:
                chat.onMessage(obj, session);
                break;
            case usuario.COMPONENT:
                usuario.onMessage(obj, session);
                break;
            case firebase_token.COMPONENT:
                firebase_token.onMessage(obj, session);
                break;
            case general.COMPONENT:
                general.onMessage(obj, session);
                break;
            case base_notification.COMPONENT:
                base_notification.onMessage(obj, session);
                break;
            case delivery.COMPONENT:
                delivery.onMessage(obj, session);
                break;
            case pregunta_frecuente.COMPONENT:
                pregunta_frecuente.onMessage(obj, session);
                break;
        }
    }
}
