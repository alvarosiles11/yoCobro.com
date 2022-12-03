package firebase;

import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONObject;

import Servisofts.SPGConect;
import Servisofts.SUtil;
import netscape.javascript.JSException;

public class FirebaseDb {
    /*
     * TABLE STRUCTURE
     * key:cv
     * key_usuario:cv
     * fecha_on:ts
     * estado:int
     * token:cv
     * app:cv
     * platform:cv
     * fecha_last:ts
     * id_session:cv
     */

    public static final String TABLE_NAME = "firebase_token";

    public static JSONArray getAll() {
        try {
            JSONArray arr = SPGConect.ejecutarConsultaArray(
                    "select array_to_json(array_agg(sq.*)) as json from (select * from " + TABLE_NAME
                            + " where key_usuario IS NOT NULL and token <> 'null' ) sq");
            return arr;
        } catch (SQLException e) {
            return null;
        }
    }

    public static JSONArray getAllByKeyUsuario(String key_usuario) {
        try {
            JSONArray arr = SPGConect.ejecutarConsultaArray(
                    "select array_to_json(array_agg(sq.*)) as json from (select * from " + TABLE_NAME
                            + " where key_usuario IS NOT NULL and token <> 'null' and key_usuario = '" + key_usuario
                            + "' ) sq");
            return arr;
        } catch (SQLException e) {
            return null;
        }
    }

    public static JSONObject getByKeyUsuario(String key_usuario) {
        try {
            JSONObject firebase_token = SPGConect.ejecutarConsultaObject(
                    "select get_by('" + TABLE_NAME + "','key_usuario','" + key_usuario + "') as json");
            if (firebase_token.has("key")) {
                return firebase_token;
            }
        } catch (SQLException e) {
            return null;
        }
        return null;
    }

    public static JSONObject getByToken(String token) {
        try {
            JSONObject firebase_token = SPGConect.ejecutarConsultaObject(
                    "select get_by('" + TABLE_NAME + "','token','" + token + "') as json");
            if (firebase_token.has("key")) {
                return firebase_token;
            }
        } catch (SQLException e) {
            return null;
        }
        return null;
    }

    public static JSONObject insertOrEdit(JSONObject data) {
        data.put("fecha_last", SUtil.now());
        JSONObject firebaseToken = getByToken(data.getString("token"));
        if (firebaseToken == null) {
            if (create(data) == null) {
                return null;
            }
        } else {
            // TODO: Guardar historico de movimientos del token
            data.put("key", firebaseToken.getString("key"));
            if (!data.has("key_usuario")) {
                data.put("key_usuario", "");
            }
            try {
                SPGConect.editObject(TABLE_NAME, data);
            } catch (SQLException e) {
                return null;
            }
        }

        return data;

    }

    private static JSONObject create(JSONObject data) {
        data.put("key", SUtil.uuid());
        data.put("estado", 1);
        data.put("fecha_on", SUtil.now());
        data.put("fecha_last", SUtil.now());
        try {
            SPGConect.insertObject(TABLE_NAME, data);
        } catch (SQLException e) {
            return null;
        }
        return data;
    }

}
