import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SLoad, SNavigation, SPage, SText, SView, SDate, SInput, SPopup, SImage, STheme, SIcon } from 'servisofts-component';
import Parent from '..'
import SSocket from 'servisofts-socket';
import PButtom from '../../../../../Components/PButtom';

class Facturacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");
    }

    getregistro() {
        let data = {};
        if (this.key) {
            data = Parent.Actions.getByKey(this.key, this.props);
            if (!data) return <SLoad />
        }
        return <SForm
            row
            ref={(form) => { this.form = form; }}
            inputs={{
                nombre: { label: "Nombre completo", placeholder: "Nombre completo", isRequired: true, defaultValue: data["nombre"] },
                nit: { label: "Nit o Razón social", placeholder: "000000000", isRequired: true, defaultValue: data["nit"] },
            }}
            // onSubmitName={"Registrar"}
            onSubmit={(values) => {
                if (this.key) {
                    Parent.Actions.editar({ ...data, ...values }, this.props);
                } else {
                    //Parent.Actions.registro(values, this.props);
                    SNavigation.navigate(Parent.component +"/misTarjetas");

                }
            }}
        />
    }


    render() {
        // var reducer = this.props.state[Parent.component + "Reducer"];
        // if (reducer.type == "registro" || reducer.type == "editar") {
        //     if (reducer.estado == "exito") {
        //         if (reducer.type == "registro") this.key = reducer.lastRegister?.key;
        //         if (this.form) {
        //             this.form.uploadFiles(SSocket.api.root + "upload/" + Parent.component + "/" + this.key);
        //         }
        //         reducer.estado = "";
        //         SNavigation.goBack();
        //     }
        // }

        return (
            <SPage title={'Facturacion'} center>
                <SView row backgroundColor={STheme.color.card} center>
                    <SView col={"xs-12 "} center>
                        <SView center col={"xs-12 sm-10 md-8 lg-6 xl-4  "} backgroundColor={STheme.color.white}  >
                            <SView col={"xs-11"} row >
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
                                </SView>
                                <SView col={"xs-10"} row >
                                    <SView col={"xs-1"}  >
                                    </SView>
                                    <SView col={"xs-11"} row >
                                        <SView col={"xs-12"} >
                                            <SText color={STheme.color.text} fontSize={14} bold >Veggie Garden - Gran Via</SText>
                                        </SView>
                                        <SHr height={15} />
                                        <SView col={"xs-6"} style={{ justifyContent: 'flex-start', }}>
                                            <SText fontSize={14} font={"Roboto"} color={STheme.color.primary} fontWeight> Importe a pagar</SText>
                                            <SHr height={5} />
                                            <SText fontSize={20} font={"Roboto"} style={{ fontWeight: "bold" }}>Bs. 56</SText>
                                        </SView>
                                    </SView>
                                    <SHr height={25} />
                                </SView>
                            </SView>
                        </SView>
                    </SView>

                    <SHr height={18} />
                    <SView col={"xs-12 "} center>
                        <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} style={{ backgroundColor: STheme.color.white, }} center>
                            <SHr height={10} />
                            <SView col={"xs-11"} row >
                                <SHr height={20} />
                                <SText fontSize={18} font={"Roboto"} style={{ fontWeight: "bold" }}>Información de Facturación</SText>
                                <SHr height={10} />
                                <SText fontSize={14} font={"Roboto"} >Datos requeridos para emitir la factura correspondiente.</SText>
                                {this.getregistro()}
                                <SHr height={30} />
                            </SView>
                        </SView>
                    </SView>

                    <SHr height={18} />
                    <SView col={"xs-12 "} center>
                        <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} style={{ backgroundColor: STheme.color.white, }} center>
                            <SHr height={20} />
                            <SView col={"xs-11"} row center>
                                <PButtom fontSize={20} onPress={() => {
                                    this.form.submit();
                                }}>REALIZAR PAGO</PButtom>
                                <SHr height={20} />
                            </SView>
                        </SView>
                    </SView>
                    <SHr />
                </SView>
            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Facturacion); 