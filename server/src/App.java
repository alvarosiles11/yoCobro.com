import Servisofts.Servisofts;
import Tasks.PedidoTask;

public class App {
    public static void main(String[] args) {
        try {
            Servisofts.DEBUG = false;
            Servisofts.ManejadorCliente = ManejadorCliente::onMessage;
            Servisofts.Manejador = Manejador::onMessage;
            new PedidoTask();
            Servisofts.initialize();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
