package model.pedido.states;

import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import Servisofts.SConsole;
import Servisofts.SPGConect;
import Servisofts.SUtil;
import model.pedido.Pedido;
import model.pedido.State;
import model.pedido.StateFactory.states;
import model.pedido.exception.StateException;

public class no_registrado extends State {

    public no_registrado(Pedido pedido) {
        super(pedido, "no_registrado", "no registrado en la DB");
    }

    @Override
    public void registrar(JSONObject obj) throws StateException {

        JSONObject data, direccion;
        String key_pack, fecha, key_usuario;
        int cantidad;

        // Validations
        if (!obj.has("key_usuario")) {
            throw new StateException("key_usuario::String not found");
        }
        key_usuario = obj.getString("key_usuario");
        if (key_usuario.isEmpty()) {
            throw new StateException("key_usuario::String is empty");
        }
        if (!obj.has("data")) {
            throw new StateException("Object data::JSON not found");
        }
        data = obj.getJSONObject("data");

        if (!data.has("direccion")) {
            throw new StateException("direccion::JSON not found");
        }
        direccion = data.getJSONObject("direccion");
        data.remove("direcccion");
        direccion.put("key", SUtil.uuid());
        direccion.put("estado", 1);
        direccion.put("fecha_on", SUtil.now());
        if (direccion.has("key_direccion_usuario")) {
            try {
                JSONObject direccion_usuario = SPGConect.ejecutarConsultaObject(
                        "select get_by('direccion_usuario','key','" + direccion.getString("key_direccion_usuario")
                                + "') as json");
                if (!direccion_usuario.has("key")) {
                    throw new StateException("key_direccion_usuario::String not found in DB");
                }
                direccion.put("key_direccion_usuario", direccion_usuario.getString("key"));
                direccion.put("latitude", direccion_usuario.getDouble("latitude"));
                direccion.put("longitude", direccion_usuario.getDouble("longitude"));
                direccion.put("direccion", direccion_usuario.getString("direccion"));

            } catch (JSONException | SQLException e) {
                throw new StateException("error al buscardireccion_usuario");
            }

        } else if (direccion.has("latitude") && direccion.has("longitude")) {
            direccion.put("latitude", direccion.getDouble("latitude"));
            direccion.put("longitude", direccion.getDouble("longitude"));
            direccion.put("direccion", direccion.getString("direccion"));
        } else {
            throw new StateException(
                    "direccion/{key_direccion_usuario} OR direccion/{latitude,longitude,direccion?} not found");
        }

        if (!data.has("key_pack")) {
            throw new StateException("data/key_pack::String not found");
        }
        key_pack = data.getString("key_pack");
        if (key_pack.isEmpty()) {
            throw new StateException("data/key_pack::String is empty");
        }
        if (!data.has("fecha")) {
            throw new StateException("data/fecha::timestamp not found");
        }
        fecha = data.getString("fecha");
        if (fecha.isEmpty()) {
            throw new StateException("data/fecha::timestamp is empty");
        }

        if (!data.has("cantidad")) {
            throw new StateException("data/cantidad::int not found");
        }
        cantidad = data.getInt("cantidad");
        if (cantidad <= 0) {
            throw new StateException("data/cantidad::int is empty");
        }
        if (!data.has("delivery")) {
            throw new StateException("data/delivery::boolean not found");
        }

        JSONObject pack;
        try {
            pack = SPGConect.ejecutarConsultaObject("select pack_get_detalle('" + key_pack + "') as json");
            if (!pack.has("key")) {
                throw new StateException("Error al optener el pack");
            }
            JSONObject cantidad_vendidos = SPGConect.ejecutarConsultaObject(
                    "select pedido_getcantidadvendidos('" + key_pack + "','" + fecha + "') as json");
            if (!cantidad_vendidos.has("cantidad")) {
                throw new StateException("Error al optener la cantidad vendidos");
            }
            int cantidad_vendidos_int = cantidad_vendidos.getInt("cantidad");
            if (cantidad_vendidos_int >= pack.getInt("cantidad")) {
                throw new StateException("agotado");
            }
            if ((cantidad_vendidos_int + data.getInt("cantidad")) > pack.getInt("cantidad")) {
                throw new StateException("agotado");
            }
            data.put("precio", pack.getDouble("precio"));
        } catch (SQLException e) {
            throw new StateException(e.getMessage());
        }

        if (data.getBoolean("delivery") == true) {

            JSONObject restaurante = pack.getJSONObject("restaurante");
            double distancia = calcularDistancia(direccion.getDouble("latitude"), direccion.getDouble("longitude"),
                    restaurante.getDouble("latitude"), restaurante.getDouble("longitude"));
            if (distancia < 1) {
                distancia = 1;
            }
            data.put("distancia", distancia);
            try {
                String consulta = String.join("\n",
                        "select monto::TEXT",
                        "from costo_envio",
                        "WHERE ",
                        "    metro = (",
                        "        select MIN(costo_envio.metro)",
                        "        from costo_envio",
                        "        where costo_envio.estado = 1",
                        "        AND costo_envio.metro > " + distancia + "",
                        ")",
                        "");
                String a = SPGConect.ejecutarConsultaString(consulta);
                data.put("delivery", Double.parseDouble(a));
            } catch (SQLException e) {
                throw new StateException(e.getMessage());
            }
        } else {
            data.put("delivery", 0);
        }
        // Operations
        data.put("key", pedido.getKey());
        data.put("estado", 1);
        data.put("fecha_on", SUtil.now());
        data.put("key_usuario", key_usuario);
        // data.put("state", states.pendiente_pago.name());
        try {
            SPGConect.insertObject("pedido_direccion", direccion);
            data.put("key_pedido_direccion", direccion.getString("key"));
            SPGConect.insertObject("pedido", data);
            SConsole.succes("Nuevo pedido registrado con exito");
            pedido.changeState(states.pendiente_pago, "registar");
        } catch (SQLException e) {
            throw new StateException(e.getMessage());
        }
        this.pedido.updateFromDb();

    }

    public double calcularDistancia(double lat1, double lon1, double lat2, double lon2) {
        double theta = lon1 - lon2;
        double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2))
                + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        return (dist) * 1000;
    }

    private double rad2deg(double dist) {
        return (dist * 180 / Math.PI);
    }

    private double deg2rad(double lat1) {
        return (Math.PI * lat1) / 180.0;
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
