package Component;

import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;
import firebase.Firebase;

public class usuario {
    public static final String COMPONENT = "usuario";

    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        switch (obj.getString("type")) {
            case "identificacion":
                identificacion(obj, session);
                break;
        }
    }

    public static void identificacion(JSONObject obj, SSSessionAbstract session) {
        Firebase.identificacion(obj, session);
    }

}
