package model.pedido;

import org.json.JSONObject;

import model.pedido.exception.StateException;

public interface IPedidoActions {

    public void registrar(JSONObject obj) throws StateException;

    public void select_pay_method(JSONObject obj) throws StateException;

    public void pagar(JSONObject obj) throws StateException;

    public void entregar(JSONObject obj) throws StateException;

    public void entregar_a_conductor(JSONObject obj) throws StateException;

    public void get_payment_order(JSONObject obj) throws StateException;

    public void sync_listos(JSONObject obj) throws StateException;

    public void sync_no_recogido(JSONObject obj) throws StateException;

    public void sync_recordatorio(JSONObject obj) throws StateException;

    public JSONObject toJson();
}
