package firebase;

import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;

public class Firebase {

    public static final String apiKeyServer = "AAAAzkSEhHo:APA91bGT-WaPq-bEMy8XPxaWyaRq7Zzcm2qlHLZ7LZUN772krmb1PJZuEyfX3GUpH9WUcBU7o7n2QXldRy3h-Bx8tTDQ_hs8nQzCks9aWG-QAfNyYr2-ne3yw3bXWLbVqBwrhcWerhzl";

    public static void sendAllAsync(Notification notification) {
        FirebaseDb.getAll().iterator().forEachRemaining(obj -> {
            JSONObject o = (JSONObject) obj;
            Notification notFinal = new Notification(notification.title, notification.body);
            notFinal.setToken(o.getString("token"));
            FirebaseUtil.sendAsync(notFinal, apiKeyServer);
        });
    }

    public static void sendUserAsync(Notification notification, String key_usuario) {
        FirebaseDb.getAllByKeyUsuario(key_usuario).iterator().forEachRemaining(obj -> {
            JSONObject o = (JSONObject) obj;
            Notification notFinal = new Notification(notification.title, notification.body);
            notFinal.setToken(o.getString("token"));
            FirebaseUtil.sendAsync(notFinal, apiKeyServer);
        });
    }

    public static void send(Notification notification) {
        FirebaseUtil.send(notification, apiKeyServer);
    }

    public static void sendAsync(Notification notification) {
        FirebaseUtil.sendAsync(notification, apiKeyServer);
    }

    // Se llama desde usuario/identificacion
    public static void identificacion(JSONObject obj, SSSessionAbstract session) {
        if (!obj.has("firebase")) {
            return;
        }
        Thread t = new Thread() {
            @Override
            public void run() {
                try {
                    JSONObject data = obj.getJSONObject("firebase");
                    if (session != null) {
                        data.put("id_session", session.getIdSession());
                    }
                    JSONObject firebase_token = FirebaseDb.insertOrEdit(data);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        };
        t.start();

    }

}
