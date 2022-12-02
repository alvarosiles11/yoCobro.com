import React from 'react';
import { connect } from 'react-redux';
import { SForm, SGradient, SHr, SIcon, SImage, SLoad, SMath, SNavigation, SPage, SText, STheme, SUuid, SView, SStorage } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import FloatButtomBack from '../../../../../Components/FloatButtomBack';
import PButtom from '../../../../../Components/PButtom';
import Validations from '../../../../../Validations';
import costo_envio from '../../costo_envio';
import restaurante from '../../restaurante';
import Parent from '../index';

class Detalle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key_pedido: SUuid(),
            key_pack: null,

            precio: 15,
            cantidad: 1,
            disponible: 5,
            envio: false,
            delivery: "false",
        };
        this.key_restaurante = SNavigation.getParam('key');
        this.auxRestaurante = null;
    }

    getCostoEnvio() {
        var data_costos = costo_envio.Actions.getAll(this.props);
        if (!data_costos) return <SLoad />;
        var distancia = this.auxRestaurante.distancia * 1000;
        var costo = { metro: 0, };
        Object.values(data_costos).map(obj => {
            if (distancia <= obj.metro && (costo.metro > obj.metro || costo.metro == 0)) {
                costo = obj;
                return;
            }
        })
        // return costo.monto ? SMath.formatMoney(costo.monto) : "No ";
        if (costo.monto) {
            this.costo_envio = costo;
            return <SText fontSize={14} font={"Roboto"} >Costo del envío: Bs. {SMath.formatMoney(costo.monto)} </SText>
        } else {
            return <SText fontSize={14} font={"Roboto"} >No hay costos de envio</SText>
        }
    }
    tipo_domicilio(delivery) {
        if (!delivery) return null;
        return <SView col={"xs-12"} row style={{ borderWidth: 1, borderColor: STheme.color.lightGray, borderRadius: 6 }}  {...(delivery ? {
            onPress: () => {
                if (this.costo_envio) {
                    if (this.costo_envio.monto) {
                        this.setState({ envio: this.costo_envio.monto, delivery: "true" })

                    }
                }
            }
        } : {})}>
            <SView col={"xs-2"} center flex>
                <SView width={18} height={18} style={{ borderWidth: 1, borderColor: STheme.color.lightGray, borderRadius: 25 }}
                    backgroundColor={this.state.envio != false ? STheme.color.primary : "transparent"} ></SView>
            </SView>
            <SView col={"xs-10"} >
                <SHr height={15} />
                <SText fontSize={18} font={"Roboto"} style={{ fontWeight: "bold" }}>Envío a domicilio</SText>
                <SHr height={30} />
                {this.getCostoEnvio()}
                <SHr height={15} />
            </SView>
            <SHr height={10} />
        </SView>
    }
    tipoEntrega(delivery) {
        return <>
            <SView col={"xs-11"} style={{ opacity: delivery == true ? 1 : 0.3 }}>
                <SHr height={15} />
                <SText fontSize={18} font={"Roboto"} style={{ fontWeight: "bold" }}>Tipo de entrega</SText>
                <SHr height={20} />
                <SView col={"xs-12"} row style={{ borderWidth: 1, borderColor: STheme.color.lightGray, borderRadius: 6, }}
                    {...(delivery ? {
                        onPress: () => { this.setState({ envio: false, delivery: "false" }); }
                    } : {})} >
                    <SView col={"xs-2"} center flex>
                        <SView width={18} height={18} style={{ borderWidth: 1, borderColor: STheme.color.lightGray, borderRadius: 25 }}
                            backgroundColor={this.state.envio != false ? "transparent" : STheme.color.primary} ></SView>
                    </SView>
                    <SView col={"xs-10"} >
                        <SHr height={15} />
                        <SText fontSize={18} col={"xs-12"} font={"Roboto"} style={{ fontWeight: "bold" }}>Recoger del lugar </SText>
                        <SHr height={10} />
                        <SText fontSize={14} col={"xs-12"} font={"Roboto"} >¡Se encuentra a {this.auxRestaurante.distancia} Km de tu ubicación!</SText>
                        <SHr height={15} />
                        <SView col={"xs-12"} row center>
                            <SView col={"xs-6"} >
                            </SView>
                            <SView col={"xs-6"} style={{ alignItems: "flex-end", }}
                                row
                                center>
                                <SIcon name={'ComoLlegar'} height={26} width={26} />
                                <SText color={STheme.color.primary} height={26} center fontSize={15} font={"Roboto"} style={{ fontWeight: "bold" }}
                                    onPress={() => {
                                        SNavigation.navigate("restaurante/comollegar", { key: this.key_restaurante });
                                    }}
                                >Cómo llegar {">"}</SText>
                            </SView>
                        </SView>

                    </SView>
                    <SHr height={10} />
                </SView>
                <SHr height={15} />
                {this.tipo_domicilio(delivery)}
                <SHr height={15} />
            </SView>
        </>
    }

    getForm() {
        return <SForm
            ref={(ref) => { this.form = ref; }}
            row
            style={{
                justifyContent: "center",
                //paddingRight: 20,
                textAlign: "center",
                height: 50,
                paddingLeft: 0
            }}
            inputProps={{
                col: "xs-12",
            }}
            inputs={{
                Correo: { defaultValue: "1", type: "text", isRequired: true, },
                // Correo: { placeholder: "Las Palmas, Santa Cruz de la Sierra", type: "text", isRequired: true, icon: <SIcon name={"Ubicacion"} width={12} height={17} />, },
            }}
            onSubmit={(values) => {
                // if (this.key) {
                //     Usuario.Actions.recuperarPass({
                //         ...this.usr,
                //         ...values
                //     }, this.props);
                // } else {
                // }
            }}
        />
    }

    ejecutar() {

        this.aux = restaurante.Actions.getByKeyDetalle(this.key_restaurante, this.props)
        if (!this.aux) return alert("No se encontró el pack");



        SSocket.sendPromise(
            {
                "component": "pedido",
                "version": "1.0",
                "key_pedido": this.state.key_pedido,
                "type": "registro",
                "estado": "cargando",
                "key_usuario": this.props.state.usuarioReducer.usuarioLog.key,
                "data": {
                    "key_pack": this.aux.pack.key,
                    "cantidad": this.state.cantidad,
                    "delivery": this.state.delivery,
                    "fecha": this.auxRestaurante.horario.fecha,
                    "direccion": {
                        "key_direccion_usuario": this.props.state.direccion_usuarioReducer.miDireccion.key,
                    }
                }
            }

        ).then((resp) => {
            this.state.key_pedido = SUuid();
            Validations.set_pedido_en_curso(resp.data);
            // SStorage.setItem("miData_log", JSON.stringify(resp));
            // SStorage.setItem("pedido_en_curso", JSON.stringify(resp.data));
            Validations.pedido_en_curso();
            // SNavigation.navigate(Parent.component + "/confirmar", { keyPedido: resp.data.key })
            // console.log("SPromise ", resp);
        }).catch((err) => {
            //  SNavigation.navigate(Parent.component + "/confirmar", { keyPedido: this.state.key_pedido })
            console.log("SPromiseerror ", err);
        });

    }

    getCantidad() {
        return <SView width={114} center row border={'transparent'}  >
            <SView col={"xs-12"} center>
                <SView width={114} height={26} center style={{ borderRadius: 8, backgroundColor: STheme.color.primary }}>
                    <SText fontSize={12} font={"Roboto"} color={STheme.color.secondary} >  {this.auxRestaurante.pack?.disponibles ?? 0} disponible(s)</SText>
                </SView>
            </SView>
            <SView col={"xs-12"} center row>
                <SView col={"xs-3"} center >
                    <SView width={34} height={34} center style={{ backgroundColor: "#FFE0CF", borderRadius: 17 }}
                        onPress={() => {
                            if (this.state.cantidad <= 1) return;
                            this.setState({ cantidad: this.state.cantidad - 1 });
                        }}>
                        <SText fontSize={32} color={STheme.color.primary} center>-</SText>
                        <SHr height={4} />
                    </SView>
                </SView>
                <SView col={"xs-6"} row center >
                    <SText fontSize={35} color={STheme.color.text} center >{this.state.cantidad}</SText>
                </SView>
                <SView col={"xs-3"} center border={'transparent'} >
                    <SView width={34} height={34} center style={{ backgroundColor: STheme.color.primary, borderRadius: 17 }}
                        onPress={() => {
                            if (this.state.cantidad >= this.auxRestaurante.pack?.disponibles) return;
                            this.setState({ cantidad: this.state.cantidad + 1 });
                        }}>
                        <SText fontSize={32} color={STheme.color.white} style={{
                            // position: "absolute",
                        }} >+</SText>
                        <SHr height={4} />
                    </SView>
                </SView>
            </SView>

        </SView>
    }

    render() {
        this.auxRestaurante = restaurante.Actions.getByKeyDetalle(this.key_restaurante, this.props)
        if (!this.auxRestaurante) return <SLoad />

        // this.setState({ key_pack: "aqui viene pack" })

        return (
            <SPage center>
                <SView col={"xs-12"} height backgroundColor={STheme.color.card} style={{
                    alignItems: "center",
                }}>
                    <SHr height={18} />
                    <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} center row style={{ backgroundColor: STheme.color.white }}>
                        <SView col={"xs-11"} row center>
                            <SView col={"xs-12"}>
                                <SHr height={15} />
                                <SText fontSize={18} font={"Roboto"} style={{ fontWeight: "bold" }}>Detalle pedido</SText>
                                <SHr height={15} />
                            </SView>
                            <SView col={"xs-12"} row backgroundColor={"transparent"} >
                                <SView center width={85} height={85} backgroundColor={"#eee"} style={{ borderRadius: 8, overflow: 'hidden', }}>
                                    <SImage src={`${SSocket.api.root}restaurante/${this.key_restaurante}`} style={{
                                        width: "100%",
                                        resizeMode: "cover"
                                    }} />
                                </SView>
                                <SView row flex height border={'transparent'} >
                                    <SView width={4} />
                                    <SView flex row >
                                        <SView col={"xs-12"} border={'transparent'}>
                                            <SText color={STheme.color.text} fontSize={14} style={{ fontWeight: "bold" }}  >{this.auxRestaurante?.nombre}</SText>
                                        </SView>
                                        <SHr height={6} />
                                        <SView style={{ justifyContent: 'flex-start', }} border={'transparent'} >
                                            <SText fontSize={12} font={"Roboto"} color={STheme.color.primary} fontWeight>Precio</SText>
                                            <SText fontSize={16} font={"Roboto"} style={{ fontWeight: "bold" }}>Bs. {SMath.formatMoney(this.auxRestaurante.pack?.precio ?? 0)}</SText>
                                        </SView>
                                        <SView flex />

                                        {this.getCantidad()}
                                    </SView>
                                </SView>
                            </SView>

                            <SHr height={15} />
                            <SView col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}></SView>
                            <SHr height={18} />
                        </SView>
                    </SView>
                    <SHr height={18} />

                    <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} row center style={{ backgroundColor: STheme.color.white }}>
                        <SView col={"xs-11"} row center>
                            <SHr height={15} />
                            <SView col={"xs-6"} >
                                <SText style={{ textAlign: "justify" }} fontSize={15} font={"Roboto"} >Total</SText>
                            </SView>
                            <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                                <SText fontSize={15} font={"Roboto"} >Bs. {SMath.formatMoney((this.state.cantidad * (this.auxRestaurante.pack?.precio ?? 0)))}</SText>
                            </SView>
                            <SHr height={10} />
                            <SView col={"xs-6"} >
                                <SText style={{ textAlign: "justify" }} fontSize={15} font={"Roboto"} >Envío</SText>
                            </SView>
                            <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                                <SText fontSize={15} font={"Roboto"} >{this.state.envio ? "Bs. " + SMath.formatMoney(this.state.envio) : null}</SText>
                            </SView>
                            <SHr height={10} />
                            <SView col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}></SView>
                            <SHr height={10} />
                            <SView col={"xs-6"} >
                                <SText style={{ textAlign: "justify", fontWeight: "bold" }} fontSize={15} font={"Roboto"} >Total</SText>
                            </SView>
                            <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                                <SText fontSize={15} font={"Roboto"} style={{ fontWeight: "bold" }} >Bs. {(this.state.cantidad * (this.auxRestaurante.pack?.precio ?? 0)) + this.state.envio}</SText>
                            </SView>
                            <SHr height={15} />
                        </SView>
                    </SView>
                    <SHr height={18} />
                    <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} center style={{ backgroundColor: STheme.color.white }}>
                        {this.tipoEntrega(this.auxRestaurante?.delivery)}
                    </SView>
                    <SHr height={18} />
                    <PButtom fontSize={20} onPress={() => {
                        this.ejecutar();
                        // SNavigation.navigate(Parent.component + "/confirmar", { key: this.key_restaurante, cantidad: this.state.cantidad, envio: this.state.envio, })
                    }}>REALIZAR PEDIDO</PButtom>
                    <SHr height={40} />
                </SView>

                {/* <FloatButtomBack onPress={() => {
                    SNavigation.navigate("/explorar");
                }} /> */}


            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Detalle);