import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SImage, SLoad, SNavigation, SOrdenador, SPage, STable2, SText, STheme, SView } from 'servisofts-component';
import Parent from '../index'
import SSocket from 'servisofts-socket'
class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    getContent() {
        var key_usuario = this.props.state.usuarioReducer.usuarioLog.key;
        var data = Parent.Actions.getAll(key_usuario, this.props);
        if (!data) return <SLoad />;

        return new SOrdenador([{ key: "descripcion", order: "asc", peso: 1 }]).ordernarObject(data).map((key) => {
            var obj = data[key];
            return <SView key={"page_"+key} width={130} height={130} style={{
                padding: 12,
            }}>
                <SView col={"xs-12"} height center style={{
                    overflow: "hidden",
                }} onPress={() => {
                    SNavigation.navigate(obj.url)
                }}>
                    <SView flex col={"xs-12"}>
                        <SImage src={`${SSocket.api.roles_permisos}page/${obj.key}`} />
                    </SView>
                    <SView col={"xs-12"} height={34} center>
                        <SText center >{obj.descripcion}</SText>
                    </SView>
                </SView>
            </SView>
        })
    }

    render() {
        return (
            // <SPage title={'Inicio'} preventBack center hidden>
            <SView col={"xs-12"} row center>
                {this.getContent()}
            </SView>
            // </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);