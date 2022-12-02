import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SLoad, SNavigation, SPage, SText, SView, SDate, SInput, SPopup, SImage, STheme, SIcon } from 'servisofts-component';
import Parent from '..'
import SSocket from 'servisofts-socket';
import PButtom3 from '../../../../../Components/PButtom3';

class NoHayTarjeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");
        this.callback = SNavigation.getParam("callback");
        this.keyPedido = SNavigation.getParam('keyPedido');

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


        // var data = Parent.Actions.getAll(this.props);
        // if (!data) return <SLoad />

        // const key_usuario = this.props.state.usuarioReducer.usuarioLog.key;
        // var arr = Object.values(data).filter(x => x.key_usuario == key_usuario && x.estado == 1);
        // if (arr.length > 0) {
        // 	SNavigation.navigate(Parent.component +"/misTarjetas", { callback: this.callback});
        // }

        //Consultando si existe tarjetas
        var dataTarjeta = Parent.Actions.getAll(this.props);
        if (!dataTarjeta) return <SLoad />;
        const key_usuario = this.props.state.usuarioReducer.usuarioLog.key;
        var arr = Object.values(dataTarjeta).filter(x => x.key_usuario == key_usuario && x.estado == 1);
        var pagina = "";

        if (arr.length > 0) {
            SNavigation.replace("pago_tarjeta/misTarjetas", {
                callback: this.callback, keyPedido: this.keyPedido
            });
        }
        // else{
        //     SNavigation.goBack();
        // } 

        return (
            <SPage center>
                <SHr height={20} />
                <SView flex center col={"xs-11 sm-10 md-8 lg-6 xl-4"}  >
                    <SView col={"xs-12"} center row style={{ backgroundColor: STheme.color.primary, borderRadius: 12 }}>
                        <SHr height={30} />
                        <SView col={"xs-12"} row center   >
                            <SView col={"xs-11"} border={'transparent'}  >
                                <SHr height={20} />
                                <SText fontSize={24} color={STheme.color.white} font={"Roboto"} bold center> No hay tarjeta registrada</SText>
                                <SHr height={20} />
                                <SText fontSize={18} color={STheme.color.white} bold center font={"Roboto"} >Agrega tu tarjeta de crédito o débito para usarla en cualquier momento</SText>
                            </SView>
                        </SView>
                        <SView col={"xs-11"} center  >
                            <SHr height={20} />
                            <SView center col={"xs-12"}   >
                                <SIcon name="SinTarjeta" height={380}></SIcon >
                            </SView>
                        </SView>
                        <SView col={"xs-12"} row center   >
                            <SView col={"xs-12"} border={'transparent'} center>
                            <SHr height={20} />
                                <PButtom3 secondary props={{ type: "outline" }} onPress={() => { SNavigation.navigate(Parent.component + "/registro", { callback: this.callback, keyPedido: this.keyPedido }); }} >AÑADIR TARJETA</PButtom3>
                            </SView>
                            <SHr height={30} />
                        </SView>
                    </SView>
                </SView>
                <SHr height={20} />
            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(NoHayTarjeta); 