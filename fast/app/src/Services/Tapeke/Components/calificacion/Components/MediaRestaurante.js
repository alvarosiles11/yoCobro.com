import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SImage, SText, STheme, SView, SNavigation, SHr, SLoad, SMath } from 'servisofts-component';
import calificacion from '..';
class MediaRestaurante extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getcalificacion1() {
        this.dataRestaurante = calificacion.Actions.getMediaByRestaurante(this.props.data.key, this.props)
        if (!this.dataRestaurante) return <SLoad />
        return <SView col={"xs-12"} row style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}>
            <SView col={"xs-2"} center >
                <SIcon name={'CalGusto'} height={40} width={40} />
            </SView>
            <SView col={"xs-10"}  >
                <SText fontSize={15} font={"Roboto"} style={{ fontWeight: "bold" }}>A muchos les gusta este pack</SText>
                <SText fontSize={13} font={"Roboto"} >El 91% han putuado {parseFloat(this.dataRestaurante.star_media).toFixed(0)} estrellas sobre 5.</SText>
            </SView>
            <SHr height={10} />
        </SView>
    }
    getcalificacion2() {
        // this.dataRestaurante = calificacion.Actions.getMediaByRestaurante(this.props.data.key, this.props)
        // if (!this.dataRestaurante) return <SLoad />
        return <SView col={"xs-12"} row style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}>
            <SView col={"xs-2"} center >
                <SIcon name={'CalServicio'} height={40} width={40} />
            </SView>
            <SView col={"xs-10"}  >
                <SText fontSize={15} font={"Roboto"} style={{ fontWeight: "bold" }}>Buen servicio</SText>
                <SText fontSize={13} font={"Roboto"} >El Servicio es genial.</SText>
            </SView>
            <SHr height={10} />
        </SView>
    }
    getcalificacion3() {
        // this.dataRestaurante = calificacion.Actions.getMediaByRestaurante(this.props.data.key, this.props)
        // if (!this.dataRestaurante) return <SLoad />
        return <SView col={"xs-12"} row >
            <SView col={"xs-2"} center >
                <SIcon name={'CalCalidad'} height={40} width={40} fill={"#ffffff"} />
            </SView>
            <SView col={"xs-10"}  >
                <SText fontSize={15} font={"Roboto"} style={{ fontWeight: "bold" }}>Buena calidad</SText>
                <SText fontSize={13} font={"Roboto"} >La calidad de la comida es muy buena</SText>
            </SView>
            <SHr height={10} />
        </SView>
    }
    calificacion() {
        this.dataRestaurante = calificacion.Actions.getMediaByRestaurante(this.props.data.key, this.props)
        if (!this.dataRestaurante) return null;
        var cl = this.dataRestaurante;
        if (!cl.buen_servicio_media && !cl.buena_calidad_media && !cl.buena_cantidad_media) return null;
        return <>
            <SView col={"xs-12"} center>
                <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} row style={{ backgroundColor: STheme.color.white }} center>
                    <SView col={"xs-11"}>
                        <SHr height={15} />
                        <SText fontSize={15} font={"Roboto"} style={{ fontWeight: "bold" }}>Qué piensan otros usuarios</SText>
                        <SHr height={20} />
                        {this.dataRestaurante.buen_servicio_media ? this.getcalificacion1() : null}
                        <SHr height={15} />
                        {this.dataRestaurante.buena_calidad_media ? this.getcalificacion2() : null}
                        <SHr height={15} />
                        {this.dataRestaurante.buena_cantidad_media ? this.getcalificacion2() : null}
                        <SHr height={15} />
                    </SView>
                </SView>
                <SHr height={18} />
            </SView>
        </>
    }

    render() {
        return (
            this.calificacion()
        );
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(MediaRestaurante);