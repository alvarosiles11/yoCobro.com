import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SNavigation, SPage, SText, STheme, SThread, SView } from 'servisofts-component';
import LogoCargando from '../../../../../Components/LogoCargando';
import SSocket from "servisofts-socket";
import Validations from '../../../../../Validations';
class Carga extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_pedido = SNavigation.getParam("key_pedido");
    }

    componentDidMount() {
        this.getDetallePedido();
    }
    async getDetallePedido() {
        SSocket.sendPromise({
            component: "pedido",
            type: "getDetalle",
            estado: "cargando",
            key_pedido: this.key_pedido,
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        }).then((resp) => {
            this.props.dispatch(resp);
            this.props.dispatch({
                component: "pedido",
                type: "editar",
                data: resp.data,
                estado: "exito",
            })
            new SThread(1500, "getPaymentStatus", false).start(() => {
                Validations.set_pedido_en_curso(resp.data);
                Validations.pedido_en_curso("pedido");
            })

        }).catch((err) => {
            this.getDetallePedido();
        })
    }
    render() {
        if (!this.key_pedido) {
            SNavigation.replace("/");
        }
        return (
            <SPage hidden disableScroll>
                <SView col={"xs-12"} flex center>
                    <LogoCargando />
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Carga);