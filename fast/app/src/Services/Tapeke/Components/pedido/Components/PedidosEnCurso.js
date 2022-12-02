import React, { Component } from "react";
import { connect } from "react-redux";
import { SDate, SHr, SIcon, SList, SLoad, SNavigation, SText, STheme, SView, SScrollView2 } from "servisofts-component";
import BarraCargando from "../../../../../Components/BarraCargando";
import pedido from "../../../../../Services/Tapeke/Components/pedido";
import restaurante from "../../../../../Services/Tapeke/Components/restaurante";
import Validations from '../../../../../Validations';

import Parent from "../";
class PedidosEnCurso extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }




    pedidoencurso(dataPedido) {
        var restaurantes = restaurante.Actions.getAll(this.props);
        if (!restaurantes) return null;
        return <SList
            data={dataPedido}
            space={16}
            horizontal
            order={[
                { key: "fecha", order: "asc", peso: 2 },
                { key: "horario/hora_inicio", order: "asc", peso: 1 }
            ]}

            render={(data) => {
                var restaurante_obj = restaurantes[data.horario.key_restaurante];
                return <SView width={320} backgroundColor={STheme.color.primary} style={{ borderRadius: 8, }} center onPress={() => {
                    // SNavigation.navigate("pedido", { key_pedido: data.key });
                    //Validations.pedido_en_curso("pedido");
                    Validations._pedido_en_curso(data, "/")
                    // if (data.state == "pagado") {
                    //     // SNavigation.navigate("pedido/confirmacion", { key_pedido: obj.key });
                    //     if (data.delivery == 0) {
                    //         SNavigation.navigate("pedido/usuario/pagado", { key_pedido: data.key })
                    //     }
                    //     if (data.delivery != 0) {
                    //         SNavigation.navigate("pedido/delivery/pagado", { key_pedido: data.key })
                    //     }
                    // }
                    // if (data.state == "no_recogido") {
                    //     SNavigation.navigate("pedido/noRecogido", { key_pedido: data.key });
                    // }
                    // if (data.state == "listo") {
                    //     if (data.delivery == 0) {
                    //         SNavigation.navigate("pedido/usuario/entrega", { key_pedido: data.key })
                    //     }
                    //     if (data.delivery != 0) {
                    //         SNavigation.navigate("pedido/delivery/pagado", { key_pedido: data.key })
                    //     }
                    // }
                }}>
                    <SView flex col={"xs-12"} center>
                        <SHr />
                        <SView col={"xs-12"} row center  >
                            <SView width={14} height />
                            <SView flex style={{ justifyContent: 'center', }}    >
                                <SText fontSize={14} font={"Roboto"} color={"white"} >{restaurante_obj.nombre}</SText>
                                <SHr height={8} />
                                <SText fontSize={12} font={"Roboto"} color={"white"} bold >{Parent.Actions.getDetalleEstado(data)}</SText>
                                <SHr height={4} />
                                <SView row >
                                    <SText fontSize={12} font={"Roboto"} color={"white"} >{new SDate(data.fecha, "yyyy-MM-dd").toString("dd de MONTH")}</SText>
                                    <SView width={8} />
                                    <SText fontSize={12} font={"Roboto"} color={"white"} >{data.horario.hora_inicio} - {data.horario.hora_fin}</SText>
                                </SView>

                            </SView>
                            <SView col={"xs-2"} style={{ alignContent: 'center', }}>
                                <SView height={36} width={36} center   >
                                    <SIcon name="Menu" fill="#eeeeee"></SIcon>
                                </SView>
                            </SView>
                        </SView>
                    </SView>
                    <SHr />
                    <SView col={"xs-11"}>
                        {data.state != "entregado" ? <BarraCargando /> : null}
                        {/* <SText>{data.state}</SText> */}
                    </SView>
                    <SHr />
                    <SView col={"xs-12"} center row>
                        <SText width={120} font={"Roboto"} style={{ fontSize: 11, color: "#eeeeee", textDecoration: "underline" }} center >Ver los detalles</SText>
                        <SIcon name={"Back"} width={12} height={12} fill={"#eeeeee"} style={{ transform: [{ rotate: "180deg" }] }} />
                    </SView>
                    <SHr />
                </SView>
            }} />
    }



    render() {
        var excluded_states = ["pendiente_pago", "timeout_pago"];
        var dataPedido = pedido.Actions.getPedidoByKeyUsuario(this.props.state.usuarioReducer.usuarioLog.key, this.props)
        if (!dataPedido) return null;
        dataPedido = dataPedido.filter(data => !excluded_states.includes(data.state));
        if (dataPedido.length == 0) return null;
        return <>
            {this.props.categoria}
            <SView col={"xs-12"} height={130} >
                <SScrollView2>
                    {this.pedidoencurso(dataPedido)}
                </SScrollView2>
            </SView >
        </>
    }

}
const initStates = (state) => {
    return { state };
};
export default connect(initStates)(PedidosEnCurso);