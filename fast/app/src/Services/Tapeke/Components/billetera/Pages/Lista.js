import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SLoad, SMath, SNavigation, SPage, STable2, SText } from 'servisofts-component';
import Parent from '..'
import usuario from '../../../../Usuario/Components/usuario';
import FloatButtom from '../../../../../Components/FloatButtom';
class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLista() {
        var data = Parent.Actions.getAll(this.props);
        var usuarios = usuario.Actions.getAll(this.props);
        if (!data) return <SLoad />;
        if (!usuarios) return <SLoad />;
        return <STable2
            header={[
                { key: "index", label: "#", width: 50 },
                {
                    key: "fecha_on", label: "Fecha", order:"desc", width: 150, render: (item) => {
                        return new SDate(item).toString("yyyy-MM-dd hh:mm:ss")
                    }
                },
                {
                    key: "key_cliente", label: "Cliente", width: 200, render: (item) => {
                        var cliente = usuarios[item];
                        return cliente ? cliente.Nombres + " " + cliente.Apellidos : "";
                    }
                },
                { key: "monto", label: "Monto", width: 100, render: (item) => { return SMath.formatMoney(item) } },
                { key: "tipo_pago", label: "Tipo pago", width: 100 },
                {
                    key: "key_usuario", label: "Administrador", width: 200, render: (item) => {
                        var cliente = usuarios[item];
                        return cliente ? cliente.Nombres + " " + cliente.Apellidos : "";
                    }
                },

            ]}
            data={data}
        />
    }
    render() {
        return (
            <SPage title={'Lista'} disableScroll center>

                {this.getLista()}
                <FloatButtom onPress={() => {
                    SNavigation.navigate("admin/" + Parent.component + "/registro");
                }} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);