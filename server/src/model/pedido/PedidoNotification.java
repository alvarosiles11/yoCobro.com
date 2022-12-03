package model.pedido;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.JSONObject;

import Component.base_notification;
import firebase.Firebase;

public class PedidoNotification {
    Pedido pedido;

    public PedidoNotification(Pedido pedido) {
        this.pedido = pedido;
    }

    public String getParam(String param) {
        if (this.pedido == null)
            return "";
        if (this.pedido.data == null)
            return "";
        JSONObject pedido = this.pedido.data;
        String[] params = param.split("\\.");
        for (int i = 0; i < params.length; i++) {
            if (i == params.length - 1) {
                return pedido.optString(params[i]);
            }
            if (pedido.has(params[i])) {
                pedido = pedido.getJSONObject(params[i]);
            } else {
                return "";
            }
        }
        return pedido.get(param).toString();
    }

    public String processParam(String text) {
        String resp = text;
        Pattern pattern = Pattern.compile("\\{(.*?)\\}");
        Matcher matcher = pattern.matcher(text);
        while (matcher.find()) {
            String param = matcher.group(0);
            String param_name = param.replace("{", "").replace("}", "");
            System.out.println("param: " + param_name);
            System.out.print("Start index: " + matcher.start());
            System.out.println(" End index: " + matcher.end() + " ");
            resp = resp.replace(param, this.getParam(param_name));
        }
        return resp;
    }

    public void notifyRecordatorioAntesHoraInicio() {
        JSONObject bn = new JSONObject();
        if (this.pedido.data.getDouble("delivery") > 0) {
            return;
        } else {
            bn = base_notification.get("recordatorio_recoger_30");
        }
        Firebase.sendUserAsync(
                new firebase.Notification(processParam(bn.getString("title")), processParam(bn.getString("body"))),
                pedido.data.getString("key_usuario"));
    }

    public void notifyByTransition() {
        try {
            String key_usuario = "";

            if (pedido.data.has("key_usuario")) {
                key_usuario = pedido.data.getString("key_usuario");
            }
            JSONObject bn = new JSONObject();
            switch (pedido.state.code) {
                case "pagado":
                    if (this.pedido.data.getDouble("delivery") > 0) {
                        bn = base_notification.get("pago_confirmado_delivery");
                    } else {
                        bn = base_notification.get("pago_confirmado_recoger");
                    }
                    Firebase.sendUserAsync(
                            new firebase.Notification(processParam(bn.getString("title")),
                                    processParam(bn.getString("body"))),
                            key_usuario);
                    break;
                case "timeout_pago":
                    bn = base_notification.get("timeout_pago");
                    Firebase.sendUserAsync(
                            new firebase.Notification(processParam(bn.getString("title")),
                                    processParam(bn.getString("body"))),
                            key_usuario);
                    break;
                case "listo":
                    if (this.pedido.data.getDouble("delivery") > 0) {
                        bn = base_notification.get("listo_delivery");
                    } else {
                        bn = base_notification.get("listo_recoger");
                    }
                    Firebase.sendUserAsync(
                            new firebase.Notification(processParam(bn.getString("title")),
                                    processParam(bn.getString("body"))),
                            key_usuario);
                    break;
                case "entregado":
                    bn = base_notification.get("entregado");
                    Firebase.sendUserAsync(
                            new firebase.Notification(processParam(bn.getString("title")),
                                    processParam(bn.getString("body"))),
                            key_usuario);
                    break;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
