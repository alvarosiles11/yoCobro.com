package model.pedido.states;

import java.sql.SQLException;

import org.json.JSONObject;

import Servisofts.SPGConect;
import Servisofts.SUtil;
import model.pedido.Pedido;
import model.pedido.PedidoNotification;
import model.pedido.State;
import model.pedido.StateFactory.states;
import model.pedido.exception.StateException;

public class pagado extends State {

    public pagado(Pedido pedido) {
        super(pedido, "pagado", "pagado");
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
        this.pedido.changeState(states.listo, "sync_listos");
    }

    @Override
    public void sync_no_recogido(JSONObject obj) throws StateException {
        noPermited();
    }

    @Override
    public void sync_recordatorio(JSONObject obj) throws StateException {
        // TODO: Notificar el cliente que el pedido estara listo pronto
        JSONObject objEdit = new JSONObject();
        objEdit.put("key", this.pedido.getData().getString("key"));
        objEdit.put("fecha_recordado", SUtil.now());
        this.pedido.getData().put("fecha_recordado", objEdit.get("fecha_recordado"));
        try {
            SPGConect.editObject("pedido", objEdit);
            this.pedido.notifyOnChangeUser();
            new PedidoNotification(this.pedido).notifyRecordatorioAntesHoraInicio();
            System.out.println("notificar q se acerca el pedido");
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

}
