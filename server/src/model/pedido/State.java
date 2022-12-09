package model.pedido;

import org.json.JSONObject;

import model.pedido.exception.StateException;

public abstract class State implements IPedidoActions {
    String type;
    String code;
    public Pedido pedido;

    public State(Pedido pedido, String code, String type) {
        this.pedido = pedido;
        this.type = type;
        this.code = code;
    }

    @Override
    public JSONObject toJson() {
        JSONObject obj = new JSONObject();
        obj.put("type", this.type);
        obj.put("code", this.code);
        return obj;
    }

    public void noPermited() throws StateException {
        throw new StateException("El pedido se encuenta en estado: " + type);
    }

}
