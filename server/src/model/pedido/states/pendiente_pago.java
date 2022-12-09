package model.pedido.states;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.json.JSONArray;
import org.json.JSONObject;

import Component.Billetera;
import Component.enviroment;
import Servisofts.SPGConect;
import Servisofts.SUtil;
import SocketCliente.SocketCliente;
import model.pedido.Pedido;
import model.pedido.State;
import model.pedido.StateFactory.states;
import model.pedido.exception.StateException;

public class pendiente_pago extends State {

    public pendiente_pago(Pedido pedido) {
        super(pedido, "pendiente_pago", "pendiente de pago");
    }

    @Override
    public void registrar(JSONObject obj) throws StateException {
        noPermited();
    }

    public void create_pay_order(JSONObject obj) throws StateException {
        if (!obj.has("client")) {
            throw new StateException("client::Object not found");
        }
        JSONObject client = obj.getJSONObject("client");
        if (client.isNull("ci")) {
            throw new StateException("client/ci::String not found");
        }
        if (client.isNull("name")) {
            throw new StateException("client/name::String not found");
        }
        if (client.isNull("last_name")) {
            throw new StateException("client/last_name::String not found");
        }
        if (client.isNull("phone")) {
            throw new StateException("client/phone::String not found");
        }
        if (client.isNull("email")) {
            throw new StateException("client/email::String not found");
        }

        JSONArray items = new JSONArray();
        JSONObject itm1 = new JSONObject();
        itm1.put("id", 1);
        itm1.put("description", "Tapeke - " + this.pedido.getData().getJSONObject("restaurante").getString("nombre"));
        itm1.put("unitary_price", this.pedido.getData().getDouble("precio"));
        itm1.put("quantity", this.pedido.getData().getInt("cantidad"));
        items.put(itm1);
        double delivery = this.pedido.getData().getDouble("delivery");
        if (delivery > 0) {
            JSONObject itm2 = new JSONObject();
            itm2.put("id", 1);
            itm2.put("description", "Delivery");
            itm2.put("unitary_price", delivery);
            itm2.put("quantity", 1);
            items.put(itm2);
        }
        JSONObject petition = new JSONObject();
        petition.put("component", "payment_order");
        petition.put("type", "registro");

        JSONObject enviroments = enviroment.getAll(new JSONObject(), null);
        int expiration_time = Integer
                .parseInt(enviroments.getJSONObject("tiempo_expiracion_pago_pedido").getString("value"));

        petition.put("data", new JSONObject().put("client", client).put("items", items)
                .put("glosa", "Pago de prueba tapeke").put("payment_type", obj.getString("pay_method"))
                .put("expiration_time", expiration_time));
        JSONObject pay_order = SocketCliente.sendSinc("multipagos", petition, 15000);
        if (pay_order.getString("estado").equals("error")) {
            throw new StateException(pay_order.getString("error"));
        }
        JSONObject itemToEdit = new JSONObject();
        itemToEdit.put("key", this.pedido.getKey());
        itemToEdit.put("key_payment_order", pay_order.getJSONObject("data").getString("key"));
        try {
            SPGConect.editObject("pedido", itemToEdit);
        } catch (SQLException e) {
            throw new StateException("Error al editar el pedido");
        }
        this.pedido.getData().put("key_payment_order", itemToEdit.getString("key_payment_order"));
    }

    @Override
    public void select_pay_method(JSONObject obj) throws StateException {

        if (!obj.has("pay_method")) {
            throw new StateException("pay_method::String not found");
        }
        String pay_method = obj.getString("pay_method");
        if (pay_method.isEmpty()) {
            throw new StateException("pay_method::String is empty");
        }
        JSONObject itemToEdit = new JSONObject();
        itemToEdit.put("key", this.pedido.getKey());
        itemToEdit.put("payment_type", pay_method);
        try {
            SPGConect.editObject("pedido", itemToEdit);
        } catch (SQLException e) {
            throw new StateException("Error al editar el pedido");
        }
        if (pay_method.equals("Billetera")) {
            String key_usuario = this.pedido.getData().getString("key_usuario");
            try {
                String mont = SPGConect.ejecutarConsultaString(
                        "select sum(billetera.monto) from billetera where billetera.key_cliente = '" + key_usuario
                                + "' and billetera.estado = 1");
                double monto_actual = 0;
                if (mont != null) {
                    monto_actual = Double.parseDouble(mont);
                }
                double total = (this.pedido.getData().getDouble("precio") * this.pedido.getData().getInt("cantidad"))
                        + this.pedido.getData().getDouble("delivery");
                if (total > monto_actual) {
                    throw new StateException("sin_fondo");
                }
                JSONObject billeteraMovimiento = new JSONObject();
                billeteraMovimiento.put("key", SUtil.uuid());
                billeteraMovimiento.put("estado", 1);
                billeteraMovimiento.put("fecha_on", SUtil.now());
                billeteraMovimiento.put("key_usuario", key_usuario);
                billeteraMovimiento.put("key_cliente", key_usuario);
                billeteraMovimiento.put("monto", total * -1);
                billeteraMovimiento.put("tipo_pago", "compra_tapeke");
                billeteraMovimiento.put("detalle", "Compra de tapeke en "
                        + this.pedido.getData().getJSONObject("restaurante").getString("nombre") + " por " + total);
                billeteraMovimiento.put("key_pedido", this.pedido.getKey());
                SPGConect.insertObject("billetera", billeteraMovimiento);
                this.pedido.changeState(states.pagado, "select_pay_method");
                return;
            } catch (SQLException e) {
                throw new StateException(e.getMessage());
            }
        }
        this.create_pay_order(obj);
        JSONObject petition = new JSONObject();
        petition.put("component", "payment_order");
        petition.put("type", "pay_method");
        petition.put("pay_method", pay_method);
        petition.put("key_payment_order", this.pedido.getData().getString("key_payment_order"));
        int timeOut = 1000 * 60 * 2;
        if (pay_method.equals("QR")) {
            timeOut = 10000;
        }
        JSONObject response = SocketCliente.sendSinc("multipagos", petition, timeOut);
        if (response.has("error")) {
            throw new StateException(response.getString("error"));
        }
        if (response.has("estado")) {
            if (response.getString("estado").equals("error")) {
                throw new StateException("error desconocido");
            }
        }
        this.pedido.getData().put("payment_type", itemToEdit.getString("payment_type"));
        this.pedido.changeState(states.pago_en_proceso, "select_pay_method");

    }

    @Override
    public void pagar(JSONObject obj) throws StateException {
        noPermited();
    }

    @Override
    public void get_payment_order(JSONObject obj) throws StateException {
        noPermited();

    }

    @Override
    public void entregar(JSONObject obj) throws StateException {
        noPermited();
    }

    @Override
    public void entregar_a_conductor(JSONObject obj) throws StateException {
        noPermited();
    }

    @Override
    public void sync_listos(JSONObject obj) throws StateException {
        noPermited();
    }

    @Override
    public void sync_no_recogido(JSONObject obj) throws StateException {
        noPermited();
    }

    @Override
    public void sync_recordatorio(JSONObject obj) throws StateException {
        noPermited();
    }

}
