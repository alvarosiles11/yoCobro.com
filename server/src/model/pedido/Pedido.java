package model.pedido;

import java.sql.SQLException;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import Server.SSSAbstract.SSServerAbstract;
import Servisofts.SPGConect;
import Servisofts.SUtil;
import firebase.Firebase;
import model.pedido.StateFactory.states;
import model.pedido.exception.StateException;

public class Pedido implements IPedidoActions {

    String key;
    State state;
    JSONObject data;
    // private boolean delivery;

    public Pedido(String key) throws StateException {
        this.key = key;
        this.updateFromDb();
    }

    public void updateFromDb() throws StateException {
        this.data = getFromDB();
        if (!this.data.has("state")) {
            this.state = model.pedido.StateFactory.getState(this, "no_registrado");
        } else {
            this.state = model.pedido.StateFactory.getState(this, this.data.getString("state"));
        }
    }

    public void changeState(states state, String action) throws StateException {
        String old_state = this.state.code + "";
        this.state = model.pedido.StateFactory.getState(this, state.name());
        this.data.put("state", this.state.code);
        JSONObject movimiento_pedido = new JSONObject();
        movimiento_pedido.put("key", SUtil.uuid());
        movimiento_pedido.put("key_pedido", this.key);
        movimiento_pedido.put("key_usuario", "TODO");
        movimiento_pedido.put("fecha_on", SUtil.now());
        movimiento_pedido.put("estado", 1);
        movimiento_pedido.put("old_state", old_state);
        movimiento_pedido.put("state", this.state.code);
        movimiento_pedido.put("action", action);
        try {
            SPGConect.insertObject("pedido_movimiento", movimiento_pedido);
            JSONObject pedido = new JSONObject();
            pedido.put("key", this.key);
            pedido.put("state", this.state.code);
            SPGConect.editObject("pedido", pedido);
            new PedidoNotification(this).notifyByTransition();
            this.notifyOnChange();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private JSONObject getFromDB() throws StateException {
        try {
            JSONObject pedido = SPGConect
                    .ejecutarConsultaObject("select pedido_state_get_detalle('" + this.key + "') as json");
            return pedido;
        } catch (SQLException e) {
            throw new StateException("Error al optener el pedido");
        }
    }

    @Override
    public JSONObject toJson() {
        JSONObject obj = new JSONObject();
        if (this.data != null) {
            obj = this.data;
        }
        obj.put("key", this.key);
        obj.put("state", this.state.code);
        return obj;
    }

    public void notifyOnChangeUser() {
        if (!this.data.has("key")) {
            return;
        }
        JSONObject obj = new JSONObject();
        obj.put("component", "pedido");
        obj.put("type", "editar");
        obj.put("data", this.data);
        obj.put("estado", "exito");
        SSServerAbstract.sendUsers(obj.toString(), new JSONArray().put(this.data.getString("key_usuario")));
    }

    public void notifyOnChange() {
        if (!this.data.has("key")) {
            return;
        }
        JSONObject obj = new JSONObject();
        obj.put("component", "pedido");
        obj.put("type", "editar");
        obj.put("data", this.data);
        obj.put("estado", "exito");
        SSServerAbstract.sendAllServer(obj.toString());
    }

    public String getKey() {
        return key;
    }

    public JSONObject getData() {
        return data;
    }

    @Override
    public void pagar(JSONObject obj) throws StateException {
        this.state.pagar(obj);
    }

    @Override
    public void registrar(JSONObject obj) throws StateException {
        this.state.registrar(obj);
    }

    @Override
    public void select_pay_method(JSONObject obj) throws StateException {
        this.state.select_pay_method(obj);
    }

    @Override
    public void get_payment_order(JSONObject obj) throws StateException {
        this.state.get_payment_order(obj);

    }

    @Override
    public void entregar(JSONObject obj) throws StateException {
        this.state.entregar(obj);

    }

    @Override
    public void entregar_a_conductor(JSONObject obj) throws StateException {
        this.state.entregar_a_conductor(obj);
    }

    @Override
    public void sync_listos(JSONObject obj) throws StateException {
        this.state.sync_listos(obj);
    }

    @Override
    public void sync_no_recogido(JSONObject obj) throws StateException {
        this.state.sync_no_recogido(obj);
    }

    @Override
    public void sync_recordatorio(JSONObject obj) throws StateException {
        this.state.sync_recordatorio(obj);
    }

    public void asignarConductor(JSONObject obj) throws StateException {
        JSONObject restaurante = this.data.getJSONObject("restaurante");
        JSONObject horario = this.data.getJSONObject("horario");
        int tiempo = 2000;
        int radio = 200;
        try {
            String consulta = String.join("\n",
                    "select array_to_json(array_agg(sq1.* )) as json",
                    "FROM(",
                    "SELECT *",
                    "from conductor_horario",
                    "where conductor_horario.key_horario = '" + horario.getString("key") + "'",
                    ") sq1");
            JSONArray conductores_asignados = SPGConect.ejecutarConsultaArray(consulta);

            JSONArray conductores_en_restaurante = SPGConect
                    .ejecutarConsultaArray("select getconductoresactivos(" + restaurante.getDouble("latitude") + ","
                            + restaurante.getDouble("longitude") + "," + tiempo + "," + radio + ") as json");

            conductores_asignados.iterator().forEachRemaining(itm -> {
                JSONObject conductor_asignado = (JSONObject) itm;
                conductores_en_restaurante.iterator().forEachRemaining(itm2 -> {
                    JSONObject conductor_en_restaurante = (JSONObject) itm2;
                    if (conductor_asignado.getString("key_usuario")
                            .equals(conductor_en_restaurante.getString("key_usuario"))) {
                        String key_usuario_para_asignar = conductor_en_restaurante.getString("key_usuario");
                        System.out.println("Conducto para asignar " + key_usuario_para_asignar);
                        JSONObject delivery = new JSONObject();
                        delivery.put("key", SUtil.uuid());
                        delivery.put("fecha_on", SUtil.now());
                        delivery.put("estado", 1);
                        delivery.put("key_conductor", key_usuario_para_asignar);
                        delivery.put("state", "pedido");

                        JSONObject delivery_pedido = new JSONObject();
                        delivery_pedido.put("key", SUtil.uuid());
                        delivery_pedido.put("fecha_on", SUtil.now());
                        delivery_pedido.put("estado", 1);
                        delivery_pedido.put("key_pedido", this.key);
                        delivery_pedido.put("key_delivery", delivery.getString("key"));
                        delivery_pedido.put("cantidad", this.data.getInt("cantidad"));

                        try {
                            SPGConect.insertObject("delivery", delivery);
                            SPGConect.insertObject("delivery_pedido", delivery_pedido);
                        } catch (SQLException e) {
                            e.printStackTrace();
                        }
                        
                    }
                });

            });
        } catch (JSONException | SQLException e) {
            e.printStackTrace();
        }
        System.out.println("asignarConductor");

        // throw new StateException("No implementado");
    }
}
