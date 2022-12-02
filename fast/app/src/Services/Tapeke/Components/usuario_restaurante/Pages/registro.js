import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SLoad, SNavigation, SPage, SText, SView, SDate, SInput, SPopup, SList, SImage } from 'servisofts-component';
import Parent from '..'
import SSocket from 'servisofts-socket';
import usuario from '../../../../Usuario/Components/usuario';
class registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            direccion: null
        };
        this.key_restaurante = SNavigation.getParam("key_restaurante");
    }

    getUsuarios() {
        var data = Parent.Actions.getByKeyRestaurante(this.key_restaurante, this.props);
        var usuarios = usuario.Actions.getAll(this.props);
        if (!usuarios) return <SLoad />
        return <SList data={usuarios} center space={16}
            filter={obj => {
                if (obj.estado != 1) return false;
                return !data.find(o => o.key_usuario == obj.key)
            }}
            render={obj => {
                return <SView col={"xs-11"} height={48}
                    style={{
                        borderBottomWidth: 2,
                        borderBottomColor: "#eee",
                    }} row center onPress={() => {
                        SPopup.confirm({
                            title: "¿Está seguro de que desea agregar este usuario?",
                            message: `${obj.Nombres} ${obj.Apellidos}`,
                            onPress: () => {
                                Parent.Actions.registro({
                                    key_usuario: obj.key,
                                    key_restaurante: this.key_restaurante
                                }, this.props);
                                SNavigation.goBack();
                            }
                        })
                    }}>
                    <SView width={8} />
                    <SView width={40} height={40} center style={{
                        borderRadius: 20,
                        overflow: 'hidden',
                        backgroundColor: '#eee',
                    }}>
                        <SImage src={SSocket.api.root + "usuario/" + obj.key} style={{
                            resizeMode: "cover",
                        }} />
                    </SView>
                    <SView width={8} />
                    <SView flex>
                        <SText fontSize={14} bold>{`${obj.Nombres} ${obj.Apellidos}`}</SText>
                        <SText fontSize={12}>{`${obj.Correo}`}</SText>
                    </SView>
                </SView>
            }} />

    }

    render() {
        return (
            <SPage title={'registro'}>
                <SView col={"xs-12"} center>
                    {this.getUsuarios()}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(registro);