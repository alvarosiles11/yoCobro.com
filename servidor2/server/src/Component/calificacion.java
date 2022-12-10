package Component;

import org.json.JSONArray;
import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SPGConect;
import Servisofts.SUtil;

public class calificacion {
    public static final String COMPONENT = "calificacion";

    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        switch (obj.getString("type")) {
            case "getAll":
                getAll(obj, session);
                break;
            case "registro":
                registro(obj, session);
                break;
            case "getByKeyRestaurante":
                getByKeyRestaurante(obj, session);
                break;
            case "get_media_restaurante":
                get_media_restaurante(obj, session);
                break;
            case "editar":
                editar(obj, session);
                break;
        }
    }

    public static void getAll(JSONObject obj, SSSessionAbstract session) {
        try {
            String consulta = "select get_all('" + COMPONENT + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static void getByKeyRestaurante(JSONObject obj, SSSessionAbstract session) {
        try {
            if (!obj.has("key_restaurante")) {
                obj.put("error", "No se encontro la key_restaurante");
                obj.put("estado", "error");
                return;
            }
            String consulta = "select get_all('" + COMPONENT + "', 'key_restaurante','"
                    + obj.getString("key_restaurante") + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static void get_media_restaurante(JSONObject obj, SSSessionAbstract session) {
        try {
            if (!obj.has("key_restaurante")) {
                obj.put("error", "No se encontro la key_restaurante");
                obj.put("estado", "error");
                return;
            }
            String consulta = "select get_calificacion_media_by_key_restaurante('" + obj.getString("key_restaurante")
                    + "') as json";
            JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            e.printStackTrace();
        }
    }

    public static void registro(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONObject data = obj.getJSONObject("data");
            data.put("key", SUtil.uuid());
            data.put("estado", 1);
            data.put("fecha_on", SUtil.now());
            data.put("key_usuario", obj.getString("key_usuario"));

            String key_pedido = data.getString("key_pedido");
            String key_usuario = data.getString("key_usuario");

            JSONObject pedido = SPGConect.ejecutarConsultaObject(
                    "select to_json(sq.*) as json from (select * from calificacion where calificacion.key_pedido = '"
                            + key_pedido + "' AND calificacion.key_usuario = '" + key_usuario + "' LIMIT 1) sq");
            if (pedido.has("key")) {
                obj.put("estado", "error");
                obj.put("mensaje", "Ya calificaste este pedido");
                return;
            }
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
