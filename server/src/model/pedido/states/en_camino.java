package model.pedido.states;

import org.json.JSONObject;

import model.pedido.Pedido;
import model.pedido.State;
import model.pedido.exception.StateException;

public class en_camino extends State {

    public en_camino(Pedido pedido) {
        super(pedido, "en_camino", "Pedido en_camino");
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
