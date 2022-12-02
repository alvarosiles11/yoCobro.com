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


class Registro extends Component {
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
        return <SForm
            center
            row
            ref={(form) => { this.form = form; }}
            inputs={{
                foto_p: { type: "image", isRequired: false, defaultValue: `${SSocket.api.root}${Parent.component}/${this.key}?time=${new Date().getTime()}`, col: "xs-4 sm-3.5 md-3 lg-2.5 xl-2.5", style: { borderRadius: 8, overflow: 'hidden', width: 130, height: 130, borderWidth: 0 } },
                titulo: { label: "titulo", isRequired: true, defaultValue: data["titulo"] },
                fecha: { label: "fecha", type: "date", isRequired: true, defaultValue: data["fecha"] },
                descripcion: { label: "descripcion", type: "textArea", isRequired: true, defaultValue: data["descripcion"] },
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
export default connect(initStates)(Registro);