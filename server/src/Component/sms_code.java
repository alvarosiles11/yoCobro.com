package Component;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import org.json.JSONArray;
import org.json.JSONObject;
import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SPGConect;
import Servisofts.SUtil;
import util.Sms;

public class sms_code {
    public static final String COMPONENT = "sms_code";
    public static int validSeconds = 60 * 5;

    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        switch (obj.getString("type")) {
            case "getAll":
                getAll(obj, session);
                break;
            case "registro":
                registro(obj, session);
                break;
            case "verificar":
                verificar(obj, session);
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

    public static void registro(JSONObject obj, SSSessionAbstract session) {
        try {

            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
            String fecha_on = formatter.format(new Date());
            JSONObject data = obj.getJSONObject("data");
            if (!data.has("phone")) {
                obj.put("estado", "error");
                obj.put("error", "Falta el telefono");
                return;
            }

            JSONObject recentCode = SPGConect
                    .ejecutarConsultaObject("select to_json(sq.*) as json from (select * from sms_code where phone = '"
                            + data.getString("phone")
                            + "' and estado = 1 and fecha_validacion is null AND (fecha_on::timestamp + CAST('"
                            + validSeconds + " seconds' AS INTERVAL)) >= now()::timestamp ) as sq");
            if (recentCode.has("key")) {
                obj.put("estado", "error");
                obj.put("error", "existe_codigo");
                obj.put("validSecond", validSeconds);
                obj.put("fecha_on", recentCode.getString("fecha_on"));
                return;
            }

            data.put("code", Sms.sendCode(data.getString("phone")));
            data.put("key", UUID.randomUUID().toString());
            data.put("estado", 1);
            data.put("fecha_on", fecha_on);
            SPGConect.insertArray(COMPONENT, new JSONArray().put(data));
            obj.put("data", data);
            obj.put("estado", "exito");
        } catch (Exception e) {
            obj.put("estado", "error");
            obj.put("error", e.getMessage());
        }
    }

    public static void verificar(JSONObject obj, SSSessionAbstract session) {
        try {
            if (!obj.has("code")) {
                obj.put("estado", "error");
                obj.put("error", "Falta el codigo");
                return;
            }
            String code = obj.getString("code");
            JSONObject data = SPGConect
                    .ejecutarConsultaObject("select to_json(sq.*) as json from (select * from sms_code where code = '"
                            + code + "' and estado = 1 and fecha_validacion is null AND (fecha_on::timestamp + CAST('"
                            + validSeconds + " seconds' AS INTERVAL)) >= now()::timestamp ) as sq");
            if (!data.has("key")) {
                obj.put("estado", "error");
                obj.put("error", "Codigo invalido");
                return;
            }
            data.put("fecha_validacion", SUtil.now());
            SPGConect.editObject(COMPONENT, data);
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
