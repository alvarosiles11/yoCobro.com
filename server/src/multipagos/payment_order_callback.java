package multipagos;

import java.sql.SQLException;

import org.json.JSONObject;

import Servisofts.SPGConect;
import SocketCliente.SocketCliente;
import model.pedido.StateFactory.states;
import model.pedido.exception.StateException;

public class payment_order_callback {
    public static final String COMPONENT = "payment_order";

    public payment_order_callback(JSONObject data, JSONObject config) {
        switch (data.getString("type")) {
            case "on_change_state": {
                on_change_state(data, config);
                break;
            }

        }
    }

    public void on_change_state(JSONObject data, JSONObject config) {
        if (data.getString("estado").equals("cargando")) {
            System.out.println("Entro al on change estate");
            // Llega la peticion de confirmacion del cambio de estado,
            // Si la respuesta es diferente de exito la operacion no se cumple y seguira
            // reintentando
            data.put("estado", "error");
            typePedido(data, config);
            typeBilletera(data, config);
            data.put("estado", "exito");
            data.put("noSend", true);
            SocketCliente.send("multipagos", data.toString());

        }
    }

    public void typePedido(JSONObject data, JSONObject config) {
        try {
            JSONObject payment_order = data.getJSONObject("data");
            String key_payment_order = payment_order.getString("key");
            JSONObject pedido;
            pedido = SPGConect.ejecutarConsultaObject(
                    "select get_by('pedido','key_payment_order','" + key_payment_order + "') as json");
            if (pedido.has("key")) {
                
                if (payment_order.getString("state").equals("expiration_date_timeout")) {
                    model.pedido.Pedido pedidoState = new model.pedido.Pedido(pedido.getString("key"));
                    pedidoState.changeState(states.timeout_pago,
                            "ManejadorCliente.payment_order::on_change_state");
                }
                if (payment_order.getString("state").equals("confirmada")) {
                    model.pedido.Pedido pedidoState = new model.pedido.Pedido(pedido.getString("key"));
                    pedidoState.changeState(states.pagado,
                            "ManejadorCliente.payment_order::on_change_state");
                }
                data.put("estado", "exito");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void typeBilletera(JSONObject data, JSONObject config) {
        try {
            JSONObject payment_order = data.getJSONObject("data");
            String key_payment_order = payment_order.getString("key");

            // JSONObject pedido;
            // pedido = SPGConect.ejecutarConsultaObject(
            // "select get_by('pedido','key_payment_order','" + key_payment_order + "') as
            // json");
            // if (pedido.has("key")) {
            // if (payment_order.getString("state").equals("expiration_date_timeout")) {
            // model.pedido.Pedido pedidoState = new
            // model.pedido.Pedido(pedido.getString("key"));
            // pedidoState.changeState(states.timeout_pago,
            // "ManejadorCliente.payment_order::on_change_state");
            // }
            // if (payment_order.getString("state").equals("confirmada")) {
            // model.pedido.Pedido pedidoState = new
            // model.pedido.Pedido(pedido.getString("key"));
            // pedidoState.changeState(states.pagado,
            // "ManejadorCliente.payment_order::on_change_state");
            // }
            // data.put("estado", "exito");
            // }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
