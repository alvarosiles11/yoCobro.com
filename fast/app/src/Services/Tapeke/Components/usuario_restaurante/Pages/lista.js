import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SImage, SInput, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
import Parent from '..'
import SSocket from 'servisofts-socket'
import FloatButtom from '../../../../../Components/FloatButtom';
import usuario from '../../../../Usuario/Components/usuario';
class lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_restaurante = SNavigation.getParam("key_restaurante");
    }

    getLista() {
        var data = Parent.Actions.getByKeyRestaurante(this.key_restaurante, this.props);
        var usuarios = usuario.Actions.getAll(this.props);
        if (!data) return <SLoad />
        if (!usuarios) return <SLoad />
        return <STable2
            header={[
                { key: "index", label: "#", width: 50 },
                {
                    key: "key_usuario", label: "Usuario", width: 130, render: (key_usuario) => {
                        if (!key_usuario) return "";
                        var usr = usuarios[key_usuario];
                        return usr.Nombres + " " + usr.Apellidos;
                    }
                },
                // { key: "key_restaurante", label: "key_restaurante", width: 130 },
                {
                    key: "-eliminar", label: "Eliminar", width: 70, center: true,
                    component: (obj) => {
                        return <SView width={35} height={35} onPress={() => { SPopup.confirm({ title: "Eliminar", message: "¿Esta seguro de eliminar?", onPress: () => { Parent.Actions.eliminar(obj, this.props) } }) }}>
                            <SIcon name={'Delete'} />
                        </SView>
                    }
                },
            ]}

            data={data}
            filter={(dta) => {
                if (dta.estado != 1) return false;
                return true;
            }}
        />
    }
    render() {
        return (
            <SPage title={'lista'} disableScroll>
                <SView col={"xs-12"} center height>
                    {this.getLista()}
                </SView>
                <FloatButtom onPress={() => {
                    SNavigation.navigate("admin/usuario_restaurante/registro", { key_restaurante: this.key_restaurante });
                }} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(lista);