package Component;

import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import Server.SSSAbstract.SSSessionAbstract;
import Servisofts.SPGConect;
import model.pedido.Pedido;
import model.pedido.exception.StateException;

public class pedido {
    public static final String COMPONENT = "pedido";

    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        try {
            switch (obj.getString("type")) {
                case "getAll":
                    getAll(obj, session);
                    break;
                case "getAllActivos":
                    getAllActivos(obj, session);
                    break;
                case "getAllProximos":
                    getAllProximos(obj, session);
                    break;
                case "getAllMapa":
                    getAllMapa(obj, session);
                    break;
                case "registro":
                    registro(obj, session);
                    break;
                case "editar":
                    editar(obj, session);
                    break;
                case "asignarConductor":
                    asignarConductor(obj, session);
                    break;
                // States
                case "getDetalle":
                    getDetalle(obj, session);
                    break;
                case "select_pay_method":
                    select_pay_method(obj, session);
                    break;
                case "get_payment_order":
                    get_payment_order(obj, session);
                    break;
                case "pagar":
                    pagar(obj, session);
                    break;
                case "entregar":
                    entregar(obj, session);
                    break;
            }
        } catch (Exception e) {
            obj.remove("data");
            obj.put("estado", "error");
            obj.put("error", e.getMessage());
        }

    }

    public static String getKeyPedido(JSONObject obj) throws StateException {
        if (!obj.has("key_pedido")) {
            throw new StateException("key_pedido not found");
        }
        String key_pedido = obj.getString("key_pedido");
        if (key_pedido.isEmpty()) {
            throw new StateException("key_pedido is empty");
        }
        return key_pedido;
    }

    public static void getAllActivos(JSONObject obj, SSSessionAbstract session) throws SQLException {
        String consulta = "select pedido_get_all_activos(0) as json";
        JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
        obj.put("data", data);
        obj.put("estado", "exito");
    }

    public static void getAll(JSONObject obj, SSSessionAbstract session) throws SQLException {
        String consulta = "select get_all('" + COMPONENT + "') as json";
        JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
        obj.put("data", data);
        obj.put("estado", "exito");
    }

    public static void getAllMapa(JSONObject obj, SSSessionAbstract session) throws SQLException {
        String consulta = "select pedido_get_all_mapa() as json";
        JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
        obj.put("data", data);
        obj.put("estado", "exito");
    }

    public static void getAllProximos(JSONObject obj, SSSessionAbstract session) throws SQLException {
        String consulta = "select get_all('" + COMPONENT + "') as json";
        JSONObject data = SPGConect.ejecutarConsultaObject(consulta);
        obj.put("data", data);
        obj.put("estado", "exito");
    }

    public static void registro(JSONObject obj, SSSessionAbstract session)
            throws JSONException, SQLException, StateException {
        Pedido pedido = new Pedido(getKeyPedido(obj));
        pedido.registrar(obj);
        obj.put("data", pedido.toJson());
        obj.put("estado", "exito");

    }

    public static void editar(JSONObject obj, SSSessionAbstract session) throws SQLException {
        JSONObject data = obj.getJSONObject("data");
        SPGConect.editObject(COMPONENT, data);
        obj.put("data", data);
        obj.put("estado", "exito");
    }

    public static void getDetalle(JSONObject obj, SSSessionAbstract session) throws JSONException, StateException {
        model.pedido.Pedido pedidoDetalle = new model.pedido.Pedido(obj.getString("key_pedido"));
        obj.put("data", pedidoDetalle.toJson());
        obj.put("estado", "exito");
    }

    public static void asignarConductor(JSONObject obj, SSSessionAbstract session) throws SQLException, JSONException, StateException {
        String key_pedido = obj.getString("key_pedido");
        model.pedido.Pedido pedidoDetalle = new model.pedido.Pedido(obj.getString("key_pedido"));
        pedidoDetalle.asignarConductor(obj);
        obj.put("data", pedidoDetalle.toJson());
        obj.put("estado", "exito");
    }


    public static void pagar(JSONObject obj, SSSessionAbstract session) throws StateException {
        model.pedido.Pedido pedido = new model.pedido.Pedido(obj.getString("key_pedido"));
        pedido.pagar(obj);
        obj.put("data", pedido.toJson());
        obj.put("estado", "exito");
    }

    public static void select_pay_method(JSONObject obj, SSSessionAbstract session) throws StateException {
        model.pedido.Pedido pedido = new model.pedido.Pedido(obj.getString("key_pedido"));
        pedido.select_pay_method(obj);
        obj.put("data", pedido.toJson());
        obj.put("estado", "exito");
    }

    public static void get_payment_order(JSONObject obj, SSSessionAbstract session) throws StateException {
        model.pedido.Pedido pedido = new model.pedido.Pedido(obj.getString("key_pedido"));
        pedido.get_payment_order(obj);
        // obj.put("data", pedido.toJson());
        // obj.put("estado", "exito");
    }

    public static void entregar(JSONObject obj, SSSessionAbstract session) throws StateException {
        model.pedido.Pedido pedido = new model.pedido.Pedido(obj.getString("key_pedido"));
        pedido.entregar(obj);
    }

}
