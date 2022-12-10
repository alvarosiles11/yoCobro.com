package Component;

import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SPGConect;
import Servisofts.SUtil;

public class general {
    public static final String COMPONENT = "general";

    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        switch (obj.getString("type")) {
            case "getAllComponents":
                getAllComponents(obj, session);
                break;
        }
    }

    public static JSONObject getAllComponents(JSONObject obj, SSSessionAbstract session) {
        try {
            JSONArray components = obj.getJSONArray("components");
            if (components.length() == 0) {
                obj.put("estado", "error");
                obj.put("mensaje", "No se han especificado componentes");
                return obj;
            }
            JSONObject data = new JSONObject();
            components.iterator().forEachRemaining(component -> {
                String consulta = "select get_all('" + component + "') as json";
                try {
                    data.put((String) component, SPGConect.ejecutarConsultaObject(consulta));
                } catch (JSONException e) {
                    e.printStackTrace();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            });
            obj.put("data", data);
            obj.put("estado", "exito");
            return data;
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

}
