import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SPage, SText, SNavigation, SLoad, SView, SIcon, SPopup, STheme } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Parent from "../../"
import PButtom from '../../../../../../Components/PButtom';
import Header from './components/Header';
class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            envio: 0,
            // telefono:"",
            // correo:"",
        };
        this.key = SNavigation.getParam("key");
        this.type = SNavigation.getParam("type");
    }
    getContent() {
        this.usr = {};
        if (this.key) {
            this.usr = Parent.Actions.getByKey(this.key, this.props);
            if (!this.usr) return <SLoad />
        }
        if (this.type) {
            var reducer = this.props.state.usuarioReducer;
            switch (this.type) {
                case "gmail":
                    var data = reducer.gmailData;
                    if (!data) {
                        SNavigation.goBack();
                        return;
                    }
                    this.usr = {
                        gmail_key: data.id,
                        Correo: data.email,
                        Nombres: data.givenName,
                        Apellidos: data.familyName,
                    }
                    break;
                case "facebook":
                    var data = reducer.facebookData;
                    if (!data) {
                        SNavigation.goBack();
                        return;
                    }
                    this.usr = {
                        facebook_key: data.id,
                        Correo: data.email,
                        Nombres: data.first_name,
                        Apellidos: data.last_name,
                    }
                    break;
            }
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
                Nombres: { placeholder: "Nombres", isRequired: true, defaultValue: this.usr.Nombres },
                Apellidos: { placeholder: "Apellidos", isRequired: true, defaultValue: this.usr.Apellidos },
                Correo: { placeholder: "Correo", type: "email", isRequired: true, defaultValue: this.usr.Correo },
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
                        ...this.usr,
                        ...values,
                        Telefono: "+xxxxxxxxx",
                    }
                }).then(res => {
                    if (this.type) {
                        SNavigation.navigate("usuario/registrotelefono", {
                            type: this.type,
                            ...this.usr,
                            ...values,
                        })
                    } else {
                        SNavigation.navigate("usuario/registropassword", {
                            ...this.usr,
                            ...values,
                        })
                    }

                }).catch(err => {
                    if (err?.data?.Correo == err?.error?.Correo) {
                        SPopup.alert("El correo ya esta registrado");
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
                    <Header title={"Bienvenido a Tapeke"} />
                    <SView height={30}></SView>
                    <SView col={"xs-11 sm-9 md-7 lg-6 xl-4"} center>
                        {this.getContent()}
                        <SHr height={25} />
                        <PButtom
                            width={"100%"}
                            props={{
                                type: "outline"
                            }}
                            onPress={() => {
                                this.form.submit()
                            }}
                        >{"Continuar"}</PButtom>
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
export default connect(initStates)(Registro);