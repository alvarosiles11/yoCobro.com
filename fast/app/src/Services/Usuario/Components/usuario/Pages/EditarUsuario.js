import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SIcon, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Usuario from '..';
import PButtom from '../../../../../Components/PButtom';
// import usuario from '../index';

class EditarUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    getForm() {

        var isApi = this.usr.gmail_key || this.usr.facebook_key
        return <SForm
            ref={(ref) => { this.form = ref; }}
            style={{
                alignItems: "center",
            }}
            inputs={{
                foto_p: { type: "image", isRequired: false, defaultValue: `${SSocket.api.root}usuario/${this.key}?time=${new Date().getTime()}`, col: "xs-4 sm-3.5 md-3 lg-2.5 xl-2.5", style: { borderRadius: 100, overflow: 'hidden', width: 130, height: 130, borderWidth: 1, borderColor: STheme.color.lightGray, } },
                Nombres: { label: "Nombres", isRequired: true, defaultValue: this.usr.Nombres, icon: <SIcon name={"InputUser"} width={40} height={30} /> },
                Apellidos: { label: "Apellidos", isRequired: true, defaultValue: this.usr.Apellidos, icon: <SIcon name={"InputUser"} width={40} height={30} /> },
                "Telefono": { label: "Telefono", defaultValue: this.usr["Telefono"], type: "phone" },
                Correo: { label: "Correo", type: "email", isRequired: true, defaultValue: this.usr.Correo, icon: <SIcon name={"InputEmail"} width={40} height={30} /> },
                // ...(isApi ? {} : {
                //     Password: { label: "Contraseña", type: "password", isRequired: true, defaultValue: this.usr.Password, icon: <SIcon name={"InputPassword"} width={40} height={30} /> },
                //     RepPassword: { label: "Repetir contraseña", type: "password", isRequired: true, defaultValue: this.usr.Password, icon: <SIcon name={"InputRePassword"} width={40} height={30} /> }
                // }),
            }}
            onSubmit={(values) => {
                // if (values.Password != values.RepPassword) {
                //     SPopup.open({ content: this.alertErrorPassword() });
                //     return null;
                // }
                var finalObj = {
                    ...this.usr,
                    ...values
                }
                Usuario.Actions.editar(finalObj, this.props);
            }}
        />
    }

    alertError(error, icono, mensaje) {
        return <SView col={"xs-12 md-8 xl-6"} row style={{ height: 250, borderRadius: 8, }} backgroundColor={STheme.color.background} center>
            <SView col={"xs-11"}  >
                <SView height={30}></SView>
                <SIcon name={"UserAlert"} height={100} />
            </SView>
            <SView col={"xs-11"} center  >
                <SText color={STheme.color.darkGray} style={{ fontSize: 20, fontWeight: "bold" }}>{mensaje} existente</SText>
                <SText color={STheme.color.darkGray} style={{ fontSize: 15 }}>El {mensaje} que ingreso ya está asociado a una cuenta activa.</SText>
                <SView height={30}></SView>
            </SView>
        </SView>
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


    render() {
        var usuario = Usuario.Actions.validateSession(this.props);
        if (!usuario) {
            SNavigation.replace('/');
        }
        this.usr = usuario;
        this.key = usuario.key;
        var reducer = Usuario.Actions._getReducer(this.props);

        if (reducer.error) {
            var data = reducer.error;
            reducer.error = null;
            if (data.find(a => a.nombre == "Correo")) {
                SPopup.open({ key: "errorRegistro", content: this.alertError(data, "UserAlert", "Correo") });
            }
            if (data.find(a => a.nombre == "Telefono")) {
                SPopup.open({ key: "errorRegistro", content: this.alertError(data, "UserAlert", "Número") });
            }
            console.log(data);
        }

        if (reducer.estado == "exito" && reducer.type == "editar") {
            reducer.estado = "";
            if (this.form) {
                console.log("ENTRO EDITAR FOTOOOOO")
                this.form.uploadFiles(SSocket.api.root + "upload/usuario/" + this.key);
            }
            SNavigation.goBack();
        } else if (reducer.estado == "error") {
            alert("chu");
        }

        return (
            <SPage title={"Editar usuario!"}>
                <SView center>
                    <SView col={"xs-11 md-6 xl-4"} center>
                        <SView height={16} />
                        {/* <SView col={"xs-12"} center>
                            <SText color={"#DE5738"} fontSize={18} font={"Roboto-Bold"}>MIS DATOS</SText>
                        </SView> */}
                        {this.getForm()}
                        <SView height={16} />
                        <SView col={"xs-11"} row center>
                            <PButtom fontSize={20} onPress={() => {
                                this.form.submit();
                            }}>CONFIRMAR</PButtom>
                        </SView>
                        <SView height={36} />
                    </SView>
                    {/* <RolDeUsuario data={this.usr} /> */}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(EditarUsuario);