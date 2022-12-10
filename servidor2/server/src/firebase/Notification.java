package firebase;

import org.json.JSONObject;

public class Notification {

    String title;
    String body;
    String token;

    public Notification(String title, String body) {
        this.title = title;
        this.body = body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public JSONObject toJson() {
        JSONObject message = new JSONObject();
        message.put("to", this.token);
        message.put("priority", "high");
        message.put("contentAvailable", true);
        JSONObject notification = new JSONObject();
        notification.put("title", this.title);
        notification.put("body", this.body);
        notification.put("sound", "default");
        message.put("notification", notification);
        return message;
    }
}
