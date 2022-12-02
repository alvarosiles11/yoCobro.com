import React from 'react';
import { connect } from 'react-redux';
import { SForm, SGradient, SHr, SImage, SLoad, SMath, SNavigation, SPage, SPopup, SStorage, SText, STheme, SView, SIcon } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import FloatButtomBack from '../../../../../Components/FloatButtomBack';
import PButtom from '../../../../../Components/PButtom';
import Validations from '../../../../../Validations';
import TipoPago from '../../../../Multipagos/Components/payment_type/Components/TipoPago';
import Parent from '../index';
import ParentBilletera from '../../billetera/index';
import BarraCargando from '../../../../../Components/BarraCargando';

class Confirmar extends React.Component {

    // state: any;
    // props: any;
    // keyPedido: string;
    // form;
    // auxPedido;
    constructor(props) {
        super(props);
        this.state = { tipoPagoSeleccionado: null, };
        this.keyPedido = SNavigation.getParam('keyPedido');
    }


    componentDidMount() {
        // SStorage.getItem("pedido_en_curso", (val) => {
        //     if (!val) SNavigation.goBack();
        //     this.setState({ pedido_en_curso: JSON.parse(val) })
        //     console.log(this.state.pedido_en_curso)
        // })
    }
    getEnvion() {
        if (!this.auxPedido.delivery) return;
        return <>
            <SView col={"xs-6"} >
                <SText style={{ textAlign: "justify" }} fontSize={15} font={"Roboto"} >Envío</SText>
            </SView>
            <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                <SText fontSize={15} font={"Roboto"} >{"Bs. " + SMath.formatMoney(this.auxPedido.delivery)}</SText>
            </SView>
            <SHr height={10} />
        </>
    }

    getViewDetalle() {
        if (!this.keyPedido) {
            return null;
        }
        this.auxPedido = Parent.Actions.getDetalle(this.keyPedido, this.props)
        if (!this.auxPedido) return <SLoad />
        Validations.pedido_en_curso("pedido/confirmar");
        return <>
            <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} center row style={{ backgroundColor: STheme.color.white }}>
                <SView col={"xs-11"} row center>
                    <SView col={"xs-12"}>
                        <SHr height={15} />
                        <SText fontSize={18} font={"Roboto"} bold>Detalle pedido</SText>
                        <SHr height={15} />
                    </SView>
                    <SView center col={"xs-2"} backgroundColor={"#9B060C"} height={85} style={{ borderRadius: 8, overflow: 'hidden', }}>
                        <SImage src={require('../../../../../Assets/img/restPerfil.jpg')} style={{
                            width: "100%",
                            position: "relative",
                            resizeMode: "cover"
                        }} />

                        {/* <SImage src={`${SSocket.api.root}restaurante/${this.data.restaurante.key}`} style={{ width: "100%", position: "relative", resizeMode: "cover" }} /> */}


                        <SGradient colors={["#00000045", "#00000045",]} />
                    </SView>
                    <SView col={"xs-10"} row >
                        <SView col={"xs-1"}  >
                        </SView>
                        <SView col={"xs-11"} row >
                            <SView col={"xs-12"} >
                                <SText color={STheme.color.text} fontSize={14} bold  >{this.auxPedido.restaurante?.nombre}</SText>
                            </SView>
                            <SHr height={15} />
                            <SView col={"xs-6"} style={{ justifyContent: 'flex-start', }}>
                                <SText fontSize={14} font={"Roboto"} color={STheme.color.primary} bold> Precio</SText>
                                <SHr height={5} />
                                <SText fontSize={20} font={"Roboto"} bold>Bs. {this.auxPedido.pack?.precio ?? 0} </SText>
                            </SView>
                            <SView col={"xs-6"} center row>
                                <SView col={"xs-12"} center>
                                    <SText fontSize={14} font={"Roboto"} color={STheme.color.primary} >Cantidad</SText>
                                </SView>
                                <SHr height={5} />
                                <SView col={"xs-12"} center   >
                                    <SView col={"xs-6"} center style={{ height: 40, backgroundColor: STheme.color.card, borderRadius: 6 }}>
                                        <SText fontSize={14} font={"Roboto"}   > {this.auxPedido.cantidad ?? 0} </SText>
                                    </SView>
                                </SView>
                            </SView>
                        </SView>
                        <SHr height={5} />
                    </SView>

                    <SHr height={15} />
                    <SView col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}></SView>
                    <SHr height={12} />
                    <SView col={"xs-12"} center>
                        <SText fontSize={16} font={"Roboto"} bold>{this.auxPedido.delivery == 0 ? "Recoger del lugar" : "Envio a domicilio"}</SText>
                    </SView>
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
                        <SText fontSize={15} font={"Roboto"} >Bs. {SMath.formatMoney((this.auxPedido.pack?.precio ?? 0) * this.auxPedido.cantidad)}</SText>
                    </SView>
                    <SHr height={10} />
                    {this.getEnvion()}
                    <SView col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}></SView>
                    <SHr height={10} />
                    <SView col={"xs-6"} >
                        <SText style={{ textAlign: "justify" }} fontSize={15} font={"Roboto"} bold>Total:</SText>
                    </SView>
                    <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                        <SText fontSize={15} font={"Roboto"} bold >Bs. {SMath.formatMoney(((this.auxPedido.pack?.precio ?? 0) * this.auxPedido.cantidad) + parseFloat(this.auxPedido.delivery ?? 0))}</SText>
                    </SView>
                    <SHr height={15} />
                </SView>
            </SView>

        </>
    }

    getViewTipoPago() {
        return <>
            <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} center style={{ backgroundColor: STheme.color.white }}>
                <TipoPago
                    defaultPhone={this.props.state.usuarioReducer?.usuarioLog?.Telefono}
                    ref={ref => this._tipoPago = ref}
                // callback={(resp) => {
                //     this.setState({ tipoPagoSeleccionado: resp.tipopago, keyPedido: this.keyPedido });
                // }}
                />
            </SView>
        </>
    }

    popupSinFondos() {
        return <>
            <SView width={362} height={286} center row style={{ borderRadius: 8 }} withoutFeedback backgroundColor={STheme.color.background}   >
                <SHr height={20} />
                <SView col={"xs-12"} height={35} center style={{ borderBottomWidth: 1, borderColor: STheme.color.primary }}>
                    <SText color={STheme.color.darkGray} style={{ fontSize: 20 }} bold center >Billetera sin fondos</SText>
                </SView>
                <SHr height={20} />
                <SView col={"xs-11"} center row>
                    <SView col={"xs-11"} center >
                        <SIcon width={100} name='BilleteraVacio'></SIcon>
                    </SView>
                    <SView col={"xs-11"} center>
                        <SHr height={8} />
                        <SText fontSize={14} color={STheme.color.primary}  >No tiene fondo suficiente en su billetera Tapeke.</SText>
                    </SView>
                </SView>
                <SView col={"xs-12"} center>
                    <SHr height={15} />
                    <SView width={140} height={44} center backgroundColor={STheme.color.primary} style={{ borderRadius: 8 }}
                        onPress={() => {
                            // var data = ParentBilletera.Actions.getByKeyCliente(this.props.state.usuarioReducer.usuarioLog.key, this.props);
                            // if (!data) return <SLoad />;
                            // var montoTotal = 0;
                            // data.map((obj) => { montoTotal += obj.monto; })
                            SNavigation.navigate('billetera')
                            SPopup.close("sinFondos");
                        }}  >
                        <SText fontSize={14} color={STheme.color.white} bold>Cargar crédito</SText>
                    </SView>
                    <SHr height={15} />
                </SView>
            </SView>
        </>
    }

    getViewFactura() {
        return <SForm
            ref={(form) => { this._form = form; }}
            col={"xs-12 sm-10 md-8 lg-6 xl-4"}
            inputProps={{
                customStyle: "default",
                style: {
                    height: 50,
                    width: "100%",
                    borderWidth: 0,
                    fontSize: 10,
                    borderRadius: 4,
                    fontSize: 14,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff"
                }
            }}
            center
            inputs={{
                nit: { icon: <SText bold width={50} center>Nit: </SText>, placeholder: "N/R" },
                business_name: { icon: <SText bold width={50} center>R.S.: </SText>, placeholder: "N/R" },
            }}
            onSubmit={(values) => {
                var usuario = this.props.state.usuarioReducer.usuarioLog;
                var timeOut = 15000;
                var tipoPago = this.state.tipoPagoSelect
                var typeQhuantuy = ""
                var card = "";
                switch (tipoPago.key) {
                    case "QR":
                        typeQhuantuy = "QR"
                        timeOut = 15000;
                        break;
                    case "Billetera":
                        typeQhuantuy = "Billetera"
                        timeOut = 15000;
                        break;
                    case "Credito":
                        typeQhuantuy = "CYBERSOURCE"
                        timeOut = 4 * 60 * 1000;
                        console.log(tipoPago);
                        card = tipoPago.tageta;
                        break;
                }

                var client = {
                    "razon_social": values["business_name"] ?? (usuario["Nombres"] + " " + usuario["Apellidos"]),
                    "nit": values["nit"] ?? "",
                    "phone": usuario["Telefono"] ?? "",
                    "email": usuario["Correo"]
                }
                // Removimos tigo money
                // if (tipoPago.key == "TigoMoney") {
                //     client.ci = tipoPago.phone;
                //     client.phone = tipoPago.phone;
                // }

                SPopup.close("confirmar");
                this.setState({ loading: true });


                SSocket.sendPromise(
                    {
                        "component": "pedido",
                        "type": "select_pay_method",
                        "key_pedido": this.keyPedido,
                        "pay_method": typeQhuantuy,
                        "client": client,
                        "card": card
                    }, timeOut
                ).then((resp) => {
                    this.auxPedido = resp.data;
                    console.log(resp);
                    Validations.set_pedido_en_curso(this.auxPedido);
                    Validations.pedido_en_curso("pedido/confirmar");
                    this.setState({ loading: false });
                }).catch((err) => {
                    this.setState({ loading: false });
                    if (err.pay_method == "Billetera") {
                        SPopup.open({ content: this.popupSinFondos(err.error), key: "sinFondos" });
                    } else {
                        // SPopup.open({ content: this.popupSinFondos(err.error), key: " hay error" });
                        SPopup.alert(err.error)
                    }

                });
            }} />
    }

    btn = ({ title, onPress, active }) => {
        return <SView col={"xs-5.5"} height={44} center border={STheme.color.primary} backgroundColor={active ? STheme.color.primary : ""} style={{ borderRadius: 8 }} onPress={onPress}  >
            <SText fontSize={14} color={active ? STheme.color.secondary : STheme.color.primary} bold>{title}</SText>
        </SView>
    }
    popupConfirmacion() {
        var INSTACE = this;
        return <SView
            style={{
                width: "100%",
                maxWidth: 365,
                height: 210,
                borderRadius: 8,

            }}
            center row
            withoutFeedback
            backgroundColor={STheme.color.background}
        >
            <SView col={"xs-10"} center>
                <SText color={STheme.color.darkGray} style={{ fontSize: 20 }} bold center >¿Estás seguro que deseas realizar este pedido?</SText>
            </SView>

            <SView col={"xs-12"} style={{ alignItems: "center", }}>
                <SView row col={"xs-11"}>
                    {this.btn({ title: "No, cancelar", onPress: () => { SPopup.close("confirmar"); }, active: false })}
                    <SView col={"xs-1"} />
                    {this.btn({ title: "Sí, Confirmar", onPress: () => { INSTACE._form.submit() }, active: true })}
                </SView>
            </SView>

            <SView col={"xs-11"} center>
                <SText color={STheme.color.darkGray} style={{ fontSize: 12 }} center >IMPORTANTE: Por favor tome en cuenta que no se podra cancelar el pedido posteriormente.</SText>
            </SView>
        </SView>
    }


    getLoading() {
        if (!this.state.loading) return null;
        return <SView col={"xs-12"} height center style={{
            position: "absolute",
            backgroundColor: "#ffffff"
        }}>

            <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center>
                <BarraCargando />
                <SHr height={18} />
                <SText font='Roboto' fontSize={16} color={STheme.color.gray}>Estamos procesando tu compra.</SText>
            </SView>

        </SView>
    }
    render() {
        // return this.popupConfirmacion()
        return (
            <>
                <SPage center onBack={() => {
                    SStorage.removeItem("pedido_en_curso");
                }}>
                    <SView col={"xs-12"} backgroundColor={STheme.color.card} center height>
                        <SView col={"xs-12"} row center>

                            {/* <SText>{this.state.pedido_en_curso?.key}</SText> */}
                            <SHr height={30} />
                            {this.getViewDetalle()}
                            <SHr height={18} />
                            {this.getViewTipoPago()}
                            <SHr height={18} />
                            {this.getViewFactura()}
                            <SHr height={40} />
                            <PButtom fontSize={20} onPress={() => {
                                this.state.tipoPagoSelect = this._tipoPago.getValue()
                                if (!this.state.tipoPagoSelect) {
                                    SPopup.alert("Select a payment method");
                                    return;
                                }
                                SPopup.open({ key: "confirmar", content: this.popupConfirmacion() });
                            }}>CONFIRMAR</PButtom>
                            <SHr height={40} />
                        </SView>
                    </SView>
                </SPage >
                {this.getLoading()}
            </>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Confirmar);