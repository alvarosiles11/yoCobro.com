package model.pedido.states;

import org.json.JSONObject;

import SocketCliente.SocketCliente;
import model.pedido.Pedido;
import model.pedido.State;
import model.pedido.exception.StateException;

public class pago_en_proceso extends State {

    public pago_en_proceso(Pedido pedido) {
        super(pedido, "pago_en_proceso", "pago en proceso");
    }

    @Override
    public void registrar(JSONObject obj) throws StateException {
        noPermited();
    }

    @Override
    public void select_pay_method(JSONObject obj) throws StateException {
        noPermited();

    }

    @Override
    public void pagar(JSONObject obj) throws StateException {
        noPermited();
    }

    @Override
    public void get_payment_order(JSONObject obj) throws StateException {
        JSONObject petition = new JSONObject();
        petition.put("component", "payment_order");
        petition.put("type", "getByKey");
        petition.put("key_payment_order", pedido.getData().getString("key_payment_order"));
        JSONObject pay_order = SocketCliente.sendSinc("multipagos", petition);
        String state = pay_order.getJSONObject("data").getString("state");
        System.out.println(state);
        switch (state) {
            case "Expiration date timeout":
                // throw new StateException("Expiration date timeout");
                break;
            case "Confirmada":
                // throw new StateException("Confirmada");
                break;
        }
        obj.put("data", pay_order.getJSONObject("data"));
        obj.put("estado", "exito");
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
