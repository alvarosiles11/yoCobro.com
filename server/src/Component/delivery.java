package Component;

import org.json.JSONArray;
import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SPGConect;
import Servisofts.SUtil;

public class delivery {
    public static final String COMPONENT = "delivery";

    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        switch (obj.getString("type")) {
            case "getActivo":
                getActivo(obj, session);
                break;
            case "getAll":
                getAll(obj, session);
                break;
            case "registro":
                registro(obj, session);
                break;
            case "editar":
                editar(obj, session);
                break;
        }
    }

    public static JSONObject getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_all('" + COMPONENT + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
            return data;
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
            return null;
        }
    }

    public static JSONObject getActivo(JSONObject obj, SSSessionAbstract session) {
        try {
            String key_usuario = obj.getString("key_usuario");
            String consulta = String.join("\n",
                    "select to_json(sq1.* ) as json",
                    "FROM(",
                    "SELECT ",
                    "delivery.*,",
                    "(",
                    "select array_to_json(array_agg(delivery_pedido.*))",
                    "FROM delivery_pedido",
                    "WHERE delivery_pedido.key_delivery = delivery.key",
                    ") as detalle",
                    "from delivery",
                    "where delivery.key_conductor = '" + key_usuario + "'",
                    "and delivery.estado = 1",
                    "and delivery.state in ('pedido','aceptado')",
                    ") sq1");
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
            return data;
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
            return null;
        }
    }

    public static void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            data.put("key", SUtil.uuid());
            data.put("estado", 1);
            data.put("fecha_on", SUtil.now());
            SPGConect.insertArray(COMPONENT, new JSONArray().put(data));
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static void editar(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            SPGConect.editObject(COMPONENT, data);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }
}
