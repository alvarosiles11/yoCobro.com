import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SPage, SText, SNavigation, SLoad, SView, SIcon, SPopup, STheme } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Parent from "../../"
import PButtom from '../../../../../../Components/PButtom';
import Header from './components/Header';
class RegistroTelefono extends Component {
    constructor(props) {
        super(props);
        this.state = {
            envio: 0,
            // telefono:"",
            // correo:"",
        };
        this.key = SNavigation.getParam("key");
        this.type = SNavigation.getParam("type");
        this.usuario = {
            Password: SNavigation.getParam("Password"),
            Nombres: SNavigation.getParam("Nombres"),
            Apellidos: SNavigation.getParam("Apellidos"),
            Correo: SNavigation.getParam("Correo"),
            gmail_key: SNavigation.getParam("gmail_key"),
            facebook_key: SNavigation.getParam("facebook_key"),
        }
    }
    alertErrorPassword() {
        return <SView col={"xs-11 md-8 xl-6"} row center style={{ height: 250, borderRadius: 8, }} backgroundColor={STheme.color.background} >
            <SView col={"xs-11"} height={40} />
            <SView col={"xs-11"}  >
                <SIcon name={"InputPassword"} height={100} />
            </SView>
            <SView col={"xs-11"} height={15} />
            <SView col={"xs-12"} center  >
                <SText center color={STheme.color.darkGray} style={{ fontSize: 18, fontWeight: "bold" }}>Las contraseñas no coinciden</SText>
            </SView>
            <SView col={"xs-11"} height={30} />
        </SView>
    }

    getContent() {
        this.usr = {};
        if (this.key) {
            this.usr = Parent.Actions.getByKey(this.key, this.props);
            if (!this.usr) return <SLoad />
        }
        return <SForm
            ref={(form) => { this.form = form; }}
            col={"xs-12"}
            inputProps={{
                col: "xs-12",
                separation: 16
            }}
            style={{
                alignItems: "center",
            }}
            inputs={{
                "Telefono": { placeholder: "Teléfono", isRequired: true, defaultValue: this.usr["Telefono"], type: "phone" },
            }}
            onSubmit={(values) => {
                SSocket.sendPromise({
                    service: "usuario",
                    version: "2.0",
                    component: "usuario",
                    type: "validateRegistro",
                    estado: "cargando",
                    cabecera: "usuario_app",
                    data: {
                        ...this.usuario,
                        ...values,
                    }
                }).then(res => {
                    SNavigation.navigate("usuario/smsvalidation", {
                        ...this.usuario,
                        ...values,
                    })
                }).catch(err => {
                    if (err?.data?.Correo == err?.error?.Correo) {
                        SPopup.alert("El correo ya está registrado")
                        return;
                    }
                    if (err?.data?.Telefono == err?.error?.Telefono) {
                        SPopup.alert("El número de teléfono ya está registrado")
                        return;
                    }
                })
            }}
        />
    }


    render() {
        return (
            <SPage title={'Registro de ' + Parent.component}>
                <SView col={"xs-12"} center>
                    <Header title={"Introduce tu número telefónico, al cual enviaremos un código por SMS."} />
                    <SView height={50}></SView>
                    <SView col={"xs-11 sm-9 md-7 lg-6 xl-4"} center>
                        {this.getContent()}
                        <SHr height={50} />
                        <PButtom
                            width={"100%"}
                            props={{
                                type: "outline"
                            }}
                            onPress={() => {
                                this.form.submit()
                            }}
                        >{"Enviar SMS"}</PButtom>
                    </SView>

                    <SView height={40}></SView>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RegistroTelefono);