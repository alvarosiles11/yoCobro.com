import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SLoad, SNavigation, SPage, SText, SView, SDate, SInput, SPopup } from 'servisofts-component';
import Parent from '..'
import SSocket from 'servisofts-socket';
import PButtom from '../../../../../Components/PButtom';

const inputHandler = (text, nro) => {
    console.log(text.nativeEvent.text);
    var value = text.nativeEvent.text;
    if (value.length >= nro) {
        SPopup.alert("Usted no puede ingresar más de " + nro + " caracteres");
    }
}


class registro extends Component {
    _ref
    _ref2
    constructor(props) {
        super(props);
        this.state = {
            direccion: null
        };
        this.key = SNavigation.getParam("key");
        this._ref = {};
        this._ref2 = {};
    }



    getregistro() {
        let data = {};
        if (this.key) {
            data = Parent.Actions.getByKey(this.key, this.props);
            if (!data) return <SLoad />
        }
        // if (this.state.direccion) {
        //     data.direccion = this.state.direccion.direccion;
        //     data.latitude = this.state.direccion.latitude;
        //     data.longitude = this.state.direccion.longitude;
        // }
        return <SForm
            center
            row
            ref={(form) => { this.form = form; }}
            inputs={{
                foto_p: { type: "image", isRequired: false, defaultValue: `${SSocket.api.root}${Parent.component}/${this.key}?time=${new Date().getTime()}`, col: "xs-4 sm-3.5 md-3 lg-2.5 xl-2.5", style: { borderRadius: 8, overflow: 'hidden', width: 130, height: 130, borderWidth: 0 } },
                nombre: { label: "Nombres", type: "text", isRequired: true, defaultValue: data["nombre"] },
                descripcion: { label: "Descripcion", type: "textArea", isRequired: true, defaultValue: data["descripcion"], onChange: (text) => { inputHandler(text, 350) }, maxLength: 350 },
                direccion: { label: "Direccion", type: "text", isRequired: false, defaultValue: data["direccion"] },
                delivery: { label: "Delivery", type: "select", isRequired: false, defaultValue: data["delivery"], options: [{ key: "0", content: "Vacío" }, { key: true, content: "Sí" }, { key: false, content: "No" }] },
                latitude: { label: "Latitude", type: "text", isRequired: false, defaultValue: data["latitude"], col: "xs-6" },
                longitude: { label: "Longitude", type: "text", isRequired: false, defaultValue: data["longitude"], col: "xs-6" },

            }}
            // onSubmitName={"Registrar"}
            onSubmit={(values) => {
                if (this.key) {
                    Parent.Actions.editar({ ...data, ...values }, this.props);
                } else {
                    Parent.Actions.registro(values, this.props);
                }
            }}
        />
    }

    render() {
        var reducer = this.props.state[Parent.component + "Reducer"];
        if (reducer.type == "registro" || reducer.type == "editar") {
            if (reducer.estado == "exito") {
                if (reducer.type == "registro") this.key = reducer.lastRegister?.key;
                if (this.form) {
                    this.form.uploadFiles(SSocket.api.root + "upload/" + Parent.component + "/" + this.key);
                }
                reducer.estado = "";
                SNavigation.goBack();
            }
        }

        return (
            <SPage title={'registro'} center>
                <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center>
                    <SHr />
                    {this.getregistro()}
                    <SHr />

                    <PButtom fontSize={20} onPress={() => {
                        // this.form.submit();
                        var vals = this.form.getValues();
                        SNavigation.navigate('direccion', {
                            longitude: vals.longitude ?? null,
                            latitude: vals.latitude ?? null,
                            callback: (resp) => {
                                this.form.setValues({
                                    direccion: resp.direccion,
                                    latitude: resp.latitude,
                                    longitude: resp.longitude
                                })
                                // this.setState({ direccion: resp })
                            }
                        });
                    }}>marcar mapa</PButtom>
                    <SHr />
                    <PButtom fontSize={20} onPress={() => {
                        this.form.submit();
                    }}>CONFIRMAR</PButtom>
                    <SHr />
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(registro);