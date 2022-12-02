import React, { Component } from "react";
import { connect } from "react-redux";
import { SDate, SHr, SIcon, SList, SLoad, SNavigation, SText, STheme, SView, SScrollView2 } from "servisofts-component";
import BarraCargando from "../../../../../Components/BarraCargando";
import pedido from "..";
import restaurante from "../../restaurante";
import Validations from '../../../../../Validations';

import Parent from "..";
class BotonesEstado extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.data = props.data;
    }

    getBotones(){
         var dataPedido = this.state.data;

         if (!dataPedido) return "nadaa";

         if (dataPedido.state == "pagado") {
            var estadoPagado = dataPedido.state;
        }
        if (dataPedido.state == "listo") {
            var estadoListo = dataPedido.state;
        }
        if (dataPedido.state == "en_camino") {
            var estadoEnCamino = dataPedido.state;
        }
        if (dataPedido.state == "conductor_cerca") {
            var estadoConductor = dataPedido.state;
        }

         return (
            <>
                <SView col={"xs-12"} border={'transparent'} center >
                    <SText color={STheme.color.darkGray} style={{ fontSize: 15 }} bold>{Parent.Actions.getDetalleEstado(dataPedido)}</SText>
                </SView>
                <SView col={"xs-12"} height={90} row>
                    <SView col={"xs-3.5"} style={{ borderBottomWidth: 3, }} border={'transparent'} center  >
                        <SIcon name="PedConfirmacion" width={48} fill={estadoPagado ? STheme.color.primary : STheme.color.primary + 22}  > </SIcon>
                        <SView col={"xs-12"} height={10} backgroundColor={estadoPagado ? STheme.color.primary : STheme.color.primary + 22} style={{ borderRadius: 16, }}></SView>
                        <SText color={estadoPagado ? STheme.color.primary : STheme.color.primary + 22} style={{ fontSize: 12 }} bold>Confirmación</SText>
                    </SView>

                    <SView width={5} height />
                    <SView flex border={'transparent'} center>
                        <SIcon name="PedPreparacion" width={48} fill={estadoListo ? STheme.color.primary : STheme.color.primary + 22} />
                        <SView col={"xs-12"} height={10} backgroundColor={estadoListo ? STheme.color.primary : STheme.color.primary + 22} />
                        <SText color={estadoListo ? STheme.color.primary : STheme.color.primary + 22} style={{ fontSize: 12 }} bold>Preparación</SText>
                    </SView>
                    <SView width={5} height />

                    <SView col={"xs-3.5"} style={{ borderBottomWidth: 3, }} border={'transparent'} center>
                        <SIcon name="PedDelivery" width={48} fill={STheme.color.primary + 22} />
                        <SView col={"xs-12"} height={10} backgroundColor={STheme.color.primary + 22} style={{ borderRadius: 16, }} />
                        <SText color={STheme.color.primary + 22} style={{ fontSize: 12 }} bold>Delivery</SText>
                    </SView>
                </SView>
            </>
        );
    }


    render() {
        return <>
            {this.props.categoria}
            <SView col={"xs-12"}  >
                    {this.getBotones()} 
            </SView >
        </>
    }

}
const initStates = (state) => {
    return { state };
};
export default connect(initStates)(BotonesEstado);