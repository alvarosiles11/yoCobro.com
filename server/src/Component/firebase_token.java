package Component;

import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;
import firebase.Firebase;

public class firebase_token {
    public static final String COMPONENT = "firebase_token";

    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        switch (obj.getString("type")) {
            case "sendAll":
                sendAll(obj, session);
                break;
            case "sendByKeyUsuario":
                sendByKeyUsuario(obj, session);
                break;
        }
    }

    private static void sendAll(JSONObject obj, SSSessionAbstract session) {
        JSONObject data = obj.getJSONObject("data");
        Firebase.sendAllAsync(new firebase.Notification(data.getString("title"), data.getString("body")));
        obj.put("estado", "exito");
    }

    private static void sendByKeyUsuario(JSONObject obj, SSSessionAbstract session) {
        JSONObject data = obj.getJSONObject("data");
        Firebase.sendUserAsync(new firebase.Notification(data.getString("title"), data.getString("body")),
                obj.getString("key_usuario"));
        obj.put("estado", "exito");
    }

}
