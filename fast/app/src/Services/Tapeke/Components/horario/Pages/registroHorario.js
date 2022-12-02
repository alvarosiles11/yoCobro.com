import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SLoad, SNavigation, SPage, SText, SView, SDate, SInput, SPopup } from 'servisofts-component';
import Parent from '../../restaurante'
import Horario from '..';
import Pack from '../../pack';
import SSocket from 'servisofts-socket';
import PButtom from '../../../../../Components/PButtom';

class registroHorario extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");
        this.key_restaurante = SNavigation.getParam("key_restaurante");
      
    }

    getHorarioForm() {
        let data = {};
      
        if (this.key) {
            data = Horario.Actions.getByKey(this.key, this.props);
            if (!data) return <SLoad />
            var dia = data["dia"].toString();
           
        }
        return <SForm
            center
            ref={(form) => { this.form = form; }}
            inputs={{
                dia: { label: "Dia", type: "select", isRequired: true, defaultValue: dia, options: [{ key: "", content: "Vacío" }, { key: "0", content: "Lunes" }, { key: "1", content: "Martes" }, { key: "2", content: "Miércoles" }, { key: "3", content: "Jueves" }, { key: "4", content: "Viernes" }, { key: "5", content: "Sábado" }, { key: "6", content: "Domingo" }, { key: "-1", content: "Feriado" }] },
                hora_inicio: { label: "Hora Inicio", type: "text", isRequired: true, defaultValue: data["hora_inicio"] },
                hora_fin: { label: "Hora Fin", type: "text", isRequired: true, defaultValue: data["hora_fin"] },
            }}
            // onSubmitName={"Registrar"}
            onSubmit={(values) => {
                //validar hora
                var date_regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
                if (!date_regex.test(values.hora_inicio) || !date_regex.test(values.hora_fin)) {
                    SPopup.alert("Hora no valida")
                    return;
                }
                if (this.key) {
                    Horario.Actions.editar({ ...data, ...values, dia: parseInt(values.dia) }, this.props);
                } else {
                    // //validar hora
                    // var date_regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
                    // if (!date_regex.test(values.hora_inicio) || !date_regex.test(values.hora_fin)) {
                    //     SPopup.alert("Hora no valida")
                    //     return;
                    // } else {
                    Horario.Actions.registro({ ...values, key_restaurante: this.key_restaurante, dia: parseInt(values.dia) }, this.props);
                    // }
                }
            }}
        />
    }

    getPackForm() {
        let data2 = {};
        if (this.key ) {
            data2 = Pack.Actions.getByKey(this.key, this.props);
            if (!data2) return <SLoad />

        }
        return <SForm
            center
            ref={(form2) => { this.form2 = form2; }}
            inputs={{
                cantidad: { label: "Cantidad de Pack", type: "text", isRequired: true, defaultValue: data2["cantidad"] },
            }}
            // onSubmitName={"Registrar"}
            onSubmit={(values) => {

                if (this.key) {
                    Pack.Actions.editar({ ...data2, ...values }, this.props);
                } else {
                    // this.key_h = reducer.lastRegister?.key;
                    // Pack.Actions.registro({ ...values, key_horario: this.key_h }, this.props);
                    Pack.Actions.registro({ ...values, key_horario: this.key_restaurante }, this.props);
                }
            }}
        />
    }

    render() {
        var reducer = this.props.state[Horario.component + "Reducer"];
        if (reducer.type == "registro" || reducer.type == "editar") {
            if (reducer.estado == "exito") {
                reducer.estado = "";
                SNavigation.goBack();
            }
        }

        return (
            <SPage title={'Registro Horario'} center>
                <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center>
                    <SHr />
                    {this.getHorarioForm()}
                    {/* {this.getPackForm()} */}
                    <SHr />
                    <PButtom fontSize={20} onPress={() => {
                        this.form.submit();
                        // this.form2.submit();
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
export default connect(initStates)(registroHorario);