import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SHr, SIcon, SNavigation, SPage, SThread, SView } from 'servisofts-component';
import Parent from '../..';
import LogoCargando from '../../../../../../Components/LogoCargando';

class RegistroCarga extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 2500,
        };
    }

    redirect() {
        if (this.props.state.usuarioReducer.estado == "exito" && (this.props.state.usuarioReducer.type == "registro") || (this.props.state.usuarioReducer.type == "editar")) {
            this.props.state.usuarioReducer.estado = "";
            if (this.props.state.usuarioReducer.lastRegister) {
                // this.key = this.props.state.usuarioReducer.lastRegister.key;
                var lastRegister = this.props.state.usuarioReducer.lastRegister;
                if (lastRegister.key) {
                    if (!Parent.Actions.validateSession(this.props, true)) {
                        if (lastRegister.gmail_key) {
                            Parent.Actions.loginGoogle({
                                id: lastRegister.gmail_key
                            }, this.props);
                            SNavigation.replace("login")
                            return null;
                        } else if (lastRegister.facebook_key) {
                            Parent.Actions.loginFacebook({
                                id: lastRegister.facebook_key
                            }, this.props);
                            SNavigation.replace("login")
                            return null;
                        } else {
                            Parent.Actions.login({
                                usuario: this.props.state.usuarioReducer.lastRegister.Correo,
                                password: this.props.state.usuarioReducer.lastRegister.Password
                            }, this.props);
                            SNavigation.replace("login")
                            return null;
                        }

                    }
                }
            }
        }
    }
    hilo() {
        new SThread(this.state.delay, "cargaHilo", true).start(() => {
        });
    }
    render() {
        this.redirect();
        return (
            <SPage hidden disableScroll center>
                <SHr height={52} />
                <SView col={"xs-9 sm-7 md-5 lg-4 xl-3"} height={200} center>
                    <LogoCargando />
                </SView>
                <SHr height={32} />
                {/* <SView col={"xs-8 sm-6 md-4 lg-3 xl-2"} height={200}>
                    <SIcon name={"tuvidaesmejor"} />
                </SView> */}
                <SHr height={32} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RegistroCarga);