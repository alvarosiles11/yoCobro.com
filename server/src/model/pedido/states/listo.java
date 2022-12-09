package model.pedido.states;

import org.json.JSONObject;

import model.pedido.Pedido;
import model.pedido.State;
import model.pedido.StateFactory.states;
import model.pedido.exception.StateException;

public class listo extends State {

    public listo(Pedido pedido) {
        super(pedido, "listo", "Pedido listo");
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
        System.out.println("El pedido fue entregado al cliente");
        this.pedido.changeState(states.entregado, "entregar");
        obj.put("estado", "exito");
    }

    @Override
    public void entregar_a_conductor(JSONObject obj) throws StateException {
        this.pedido.changeState(states.en_camino, "entregar_a_conductor");
        // TODO: notificar pedido entregado a conductor.
    }

    @Override
    public void sync_listos(JSONObject obj) throws StateException {
        noPermited();
    }

    @Override
    public void sync_no_recogido(JSONObject obj) throws StateException {
        // TODO: notificar no recogido
        this.pedido.changeState(states.no_recogido, "sync_no_recogido");
    }

    @Override
    public void sync_recordatorio(JSONObject obj) throws StateException {
        noPermited();
    }

}
