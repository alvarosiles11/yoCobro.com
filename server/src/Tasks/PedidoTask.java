package Tasks;

import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import Component.enviroment;
import Servisofts.SPGConect;
import model.pedido.exception.StateException;

public class PedidoTask extends Thread {

    private boolean isRun;

    public PedidoTask() {
        this.isRun = true;
        this.start();

    }

    @Override
    public void run() {
        while (isRun) {
            try {
                Thread.sleep(1000 * 15);
                JSONObject enviroments = enviroment.getAll(new JSONObject(), null);
                sync_pedidos_listos();
                sync_pedidos_recordatorio(enviroments);
                sync_pedidos_no_recogidos(enviroments);
                sync_enviar_pedidos(enviroments);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    private void sync_pedidos_listos() {
        try {
            JSONArray pedidos_listos = SPGConect.ejecutarConsultaArray("select sync_pedidos_listos() as json");
            pedidos_listos.iterator().forEachRemaining(obj -> {
                JSONObject pedido_obj = (JSONObject) obj;
                try {
                    model.pedido.Pedido pedido = new model.pedido.Pedido(pedido_obj.getString("key"));
                    pedido.sync_listos(null);
                } catch (JSONException | StateException e) {
                    e.printStackTrace();
                }
            });
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    private void sync_pedidos_recordatorio(JSONObject enviroments) {
        try {
            int expiration_time = Integer
                    .parseInt(enviroments.getJSONObject("tiempo_de_recordatorio_antes_hora_inicio").getString("value"));
            JSONArray pedidos_listos = SPGConect
                    .ejecutarConsultaArray("select sync_pedidos_recordatorio(" + expiration_time + ") as json");
            pedidos_listos.iterator().forEachRemaining(obj -> {
                JSONObject pedido_obj = (JSONObject) obj;
                try {
                    model.pedido.Pedido pedido = new model.pedido.Pedido(pedido_obj.getString("key"));
                    pedido.sync_recordatorio(null);
                } catch (JSONException | StateException e) {
                    e.printStackTrace();
                }
            });
            // pedido.get_payment_order(obj);
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    private void sync_pedidos_no_recogidos(JSONObject enviroments) {
        try {
            int expiration_time = Integer
                    .parseInt(enviroments.getJSONObject("tiempo_para_cancelar_no_rocogido").getString("value"));
            JSONArray pedidos_listos = SPGConect
                    .ejecutarConsultaArray("select sync_pedidos_no_recogidos(" + expiration_time + ") as json");
            pedidos_listos.iterator().forEachRemaining(obj -> {
                JSONObject pedido_obj = (JSONObject) obj;
                try {
                    model.pedido.Pedido pedido = new model.pedido.Pedido(pedido_obj.getString("key"));
                    pedido.sync_no_recogido(null);
                } catch (JSONException | StateException e) {
                    e.printStackTrace();
                }
            });
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    private void sync_enviar_pedidos(JSONObject enviroments) {
        try {
            JSONArray pedidos_por_enviar = SPGConect.ejecutarConsultaArray("select sync_enviar_pedidos() as json");
            // JSONObject por_pack = new JSONObject();
            pedidos_por_enviar.iterator().forEachRemaining(obj -> {
                JSONObject pedido_obj = (JSONObject) obj;
                // if (!por_pack.has(pedido_obj.getString("key_pack"))) {
                    // por_pack.put(pedido_obj.getString("key_pack"), new JSONArray());
                // }
                // por_pack.getJSONArray(pedido_obj.getString("key_pack")).put(pedido_obj);
                if (!pedido_obj.isNull("delivery_data")) {
                    System.out.println("con data delivery");
                } else {
                    try {
                        model.pedido.Pedido pedido = new model.pedido.Pedido(pedido_obj.getString("key"));
                        pedido.asignarConductor(null);
                    } catch (JSONException | StateException e) {
                        e.printStackTrace();
                    }
                }
            });
            // TODO: agrupar por distancia;

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
