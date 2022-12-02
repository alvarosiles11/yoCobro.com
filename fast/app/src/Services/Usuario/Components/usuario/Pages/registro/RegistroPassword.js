import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SPage, SText, SNavigation, SLoad, SView, SIcon, SPopup, STheme } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Parent from "../../"
import PButtom from '../../../../../../Components/PButtom';
import Header from './components/Header';
import CryptoJS from 'crypto-js';
class RegistroPassword extends Component {
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
                Password: { placeholder: "Password", isRequired: true, type: "password", defaultValue: this.usr.Password },
                RepPassword: { placeholder: "Repetir password", type: "password", isRequired: true, defaultValue: this.usr.Password },
            }}
            onSubmit={(values) => {
                if (values["Password"] != values["RepPassword"]) {
                    SPopup.open({ content: this.alertErrorPassword() });
                    return null;
                }
                values["Password"] = CryptoJS.MD5(values["Password"]).toString();
                delete values["RepPassword"];
                SNavigation.navigate("usuario/registrotelefono", {
                    ...this.usuario,
                    ...values
                })
            }}
        />
    }


    render() {
        return (
            <SPage title={'Registro de ' + Parent.component}>
                <SView col={"xs-12"} center>
                    <Header title={"Completa las contraseñas de acceso.\nRecuerda debe contener más de 8 caracteres"} />
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
                        >{"Registrar"}</PButtom>
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
export default connect(initStates)(RegistroPassword);