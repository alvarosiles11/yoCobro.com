import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SLoad, SNavigation, SPage, SText, SView, SDate, SInput, SPopup } from 'servisofts-component';
import Parent from '../../restaurante'
// import Horario from '../../horario';
import Pack from '..';
import SSocket from 'servisofts-socket';
import PButtom from '../../../../../Components/PButtom';

class registroPack extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");
        this.key_horario = SNavigation.getParam("key_horario");



    }

    getHorarioForm() {
        let data = {};
        if (this.key) {
            data = Pack.Actions.getByKey(this.key, this.props);
            if (!data) return <SLoad />
        } else {
            data = {
                precio: "15.00",
                cantidad: 10
            }
        }

        return <SForm
            center
            ref={(form) => { this.form = form; }}
            inputs={{
                precio: { label: "Precio", type: "money", isRequired: true, defaultValue: data["precio"] },
                cantidad: { label: "Cantidad", type: "number", isRequired: true, defaultValue: data["cantidad"] },
            }}
            // onSubmitName={"Registrar"}
            onSubmit={(values) => {

                if (this.key) {
                    Pack.Actions.editar({ ...data, ...values }, this.props);
                } else {
                    Pack.Actions.registro({ ...values, key_horario: this.key_horario }, this.props);
                    //alert(JSON.stringify(values))
                }
            }}
        />
    }



    render() {
        var reducer = this.props.state[Pack.component + "Reducer"];
        if (reducer.type == "registro" || reducer.type == "editar") {
            if (reducer.estado == "exito") {
                reducer.estado = "";
                SNavigation.goBack();
            }
        }

        let datas = {};
        datas = Pack.Actions.getAll(this.props);
        if (!datas) return <SLoad />

        return (
            <SPage title={'Registro Horario'} center>
                <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center>
                    <SHr />
                    {this.getHorarioForm()}

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
export default connect(initStates)(registroPack);