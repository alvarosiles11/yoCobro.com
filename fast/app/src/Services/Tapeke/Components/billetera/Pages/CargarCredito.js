import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SLoad, SButtom, SIcon, SWebView, SImage, SInput, SPopup } from 'servisofts-component';
import { WebView } from 'react-native';
import PButtom from '../../../../../Components/PButtom';
// import TipoPago from '../Components/TipoPago';
import Parent from '..'
import billetera from '..';
import TipoPago from '../../../../Multipagos/Components/payment_type/Components/TipoPago';
// import TipoPago from '../../../../Multipagos/Components/payment_type/Components/TipoPago';
import SSocket from 'servisofts-socket';
// backgroundColor={this.state.envio != 0 ? STheme.color.primary : "transparent"}
class CargarCredito extends Component {
    constructor(props) {
        super(props);
        this.state = { cantidad: 0, tipoPagoSeleccionado: null };

        // this.monto = SNavigation.getParam('monto');

    }



    getHeaderCredito() {
        return <>
            <SHr height={30} />
            <SView col={"xs-9 sm-8 md-7 lg-5 xl-4"} border={'transparent'} center  >
                <SView col={"xs-12"} border={'transparent'}>
                    <SText fontSize={24} font={"Roboto"} center>¡Recarga crédito a tu billetera!</SText>
                </SView>
                <SHr height={25} />
                <SView col={"xs-12"} border={'transparent'}>
                    <SText fontSize={16} color={'#979797'} font={"Roboto"} center>Compra crédito para facilitar la compra de tus packs.</SText>
                </SView>


                <SHr height={25} />

                <SInput type={'money'}
                    ref={(ref) => { this.input = ref }}
                    style={{
                        maxWidth: 350,
                    }}
                    isRequired={true}
                    placeholder={"0"}
                    placeholderTextColor={STheme.color.gray}
                />
                {/* <SText fontSize={40} color={'#979797'} font={"Roboto"} center>{this.state.tipoPagoSeleccionado} </SText> */}
                <SHr height={20} />

            </SView>
        </>
    }




    getBoton() {
        return <>
            <SView col={"xs-10"} row center   >
                <SHr height={30} />
                <PButtom fontSize={20} onPress={() => {

                    var values = {
                        business_name: "",
                        nit: ""
                    }
                    if (!this.input.verify()) {
                        return null;
                    }
                    var tipoPago = this.tipoPago.getValue();
                    if (!tipoPago) {
                        SPopup.alert("Seleccione un metodo de pago")
                        return null;
                    }
                    var usuario = this.props.state.usuarioReducer.usuarioLog;
                    var timeOut = 15000;
                    var typeQhuantuy = ""
                    var card = "";
                    switch (tipoPago.key) {
                        case "QR":
                            typeQhuantuy = "QR"
                            timeOut = 30000;
                            break;
                        case "Credito":
                            typeQhuantuy = "CYBERSOURCE"
                            timeOut = 60 * 1000;
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
                    this.setState({ loading: true });
                    SSocket.sendPromise(
                        {
                            "component": "billetera",
                            "type": "select_pay_method",
                            "monto": parseFloat(this.input.getValue()),
                            "key_usuario": usuario.key,
                            "pay_method": typeQhuantuy,
                            "client": client,
                            "card": card
                        }, timeOut
                    ).then((resp) => {
                        this.setState({ loading: false });

                        switch (tipoPago.key) {
                            case "QR":
                                SNavigation.navigate("billetera/qr", { data: JSON.stringify(resp.data) })
                                break;
                            case "Credito":
                                SNavigation.navigate("billetera");
                                break;
                        }

                        // console.log("Exito en el pago", resp);
                    }).catch((err) => {
                        this.setState({ loading: false });
                        SPopup.alert("Error en el pago");
                        console.error("Error en el pago", err);
                    });
                }}>CARGAR CRÉDITO</PButtom>
                <SHr height={30} />
            </SView>
        </>
    }

    getLoading() {
        if (!this.state.loading) return null;
        return <SView col={"xs-12"} height style={{
            position: "absolute"
        }} backgroundColor={STheme.color.primary} center>
            <SLoad />
        </SView>
    }
    render() {
        return (
            <>
                <SPage >
                    <SView col={"xs-12"} row center >
                        {this.getHeaderCredito()}
                        <SHr height={18} />

                        <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center style={{ backgroundColor: STheme.color.white, maxWidth: 300 }}>
                            <TipoPago
                                ref={(ref) => { this.tipoPago = ref }}
                                blackList={['Billetera']} />
                        </SView>
                        <SHr height={18} />

                        {this.getBoton()}
                    </SView>
                    {this.getLoading()}
                </SPage>
            </>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CargarCredito);