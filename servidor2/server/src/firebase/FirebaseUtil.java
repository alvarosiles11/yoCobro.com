package firebase;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.JSONObject;

public class FirebaseUtil {

    public static void sendAsync(Notification notification, String apiKey) {
        Thread t = new Thread() {
            @Override
            public void run() {
                Notification notFinal = new Notification(notification.title, notification.body);
                notFinal.setToken(notification.token);
                send(notFinal, apiKey);
            }
        };
        t.start();
    }

    public static boolean send(Notification notification, String apiKey) {

        JSONObject message = notification.toJson();
        System.out.println("[SendFirebase] ");
        try {

            URL url = new URL("https://fcm.googleapis.com/fcm/send");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Length", Integer.toString(message.toString().getBytes().length));
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Authorization", "key=" + apiKey);

            con.setUseCaches(false);
            con.setDoOutput(true);

            DataOutputStream out = new DataOutputStream(con.getOutputStream());
            out.writeBytes(message.toString());
            out.close();

            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-16"));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            con.disconnect();
            // System.out.println(content);
            return true;
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
            return false;
        }
    }
}
