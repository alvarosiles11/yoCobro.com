import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SNavigation, SText, STheme, SView,SLoad } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import restaurante from '../../restaurante';


class Horario extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }



    item() {

        var data_restaurante = restaurante.Actions.getByKey(this.props.data.key_restaurante, this.props);
        if (!data_restaurante) return <SLoad />;

        return <>
            <SView col={"xs-11"} height={100} border={'blue'} row>
                <SText col={"xs-12"} fontSize={12} font={"Roboto"}>Restaurante: {data_restaurante.nombre}</SText>
                 <SText col={"xs-12"} fontSize={12} font={"Roboto"}>Dia: {this.props.data.dia}</SText>
                <SText col={"xs-12"} fontSize={12} font={"Roboto"}>Apertura: {this.props.data.hora_inicio}</SText>
                <SText col={"xs-12"} fontSize={12} font={"Roboto"}>Cierre: {this.props.data.hora_fin}</SText>
                <SText col={"xs-12"} fontSize={12} font={"Roboto"}>Estado: {this.props.data.estado}</SText>
            </SView>
            <SHr height={10} />
        </>
    }


    render() {
        return (
            this.item()
        );
    }
}

const initStates = (state) => {
	return { state }
};
export default connect(initStates)(Horario);