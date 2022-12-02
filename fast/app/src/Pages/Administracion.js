import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SPage, SText } from 'servisofts-component';
import Pages from '.';


class Administracion extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const UsuaioPage = Pages["usuarioPage/lista"];
        return (
            <SPage title={'Administracion'} >
                <UsuaioPage />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Administracion);