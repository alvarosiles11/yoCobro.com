import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SInput, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import calificacion from '..';
import PButtom from '../../../../../Components/PButtom';


class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = { selectValue: 5 };
        this.key_pedido = SNavigation.getParam('key_pedido');
    }



    getEstrella() {
        let arr = Array(5).fill(0);
        return arr.map((x, i) => {
            return <>
                <SView col={"xs-2.2"} height={40} row center onPress={() => {
                    if (this.state.selectValue == i) { }
                    this.setState({ selectValue: i });
                }}>
                    <SIcon name={i > this.state.selectValue ? "EstrellaOff" : "EstrellaOn"} width={i > this.state.selectValue ? 40 : 40} fill={STheme.color.card} />
                </SView>
            </>
        })
    }



    getMedal({ key, title, icon }) {
        var isSelect = this.state[key];
        return <SView col={"xs-4"}>
            <SView col={"xs-12"} center>
                <SView width={70} height={70}
                    backgroundColor={!isSelect ? '#F39773' : "#ffffff"}
                    style={{ borderRadius: 35 }}
                    center
                    onPress={() => { this.setState({ [key]: !this.state[key] }); }} >
                    <SIcon name={icon} width={40} height={40} fill={!isSelect ? '#ffffff' : STheme.color.primary} stroke={!isSelect ? '#ffffff' : STheme.color.primary} />
                </SView>
            </SView>
            <SText col={"xs-12 "} fontSize={12} font={"Roboto"} bold={isSelect} color={STheme.color.secondary} center  >{title}</SText>
        </SView>
    }

    getMedals() {
        return <SView col={"xs-12 "} row>
            {this.getMedal({ key: "buena_calidad", title: 'Buena calidad', icon: 'Medalla1' })}
            {this.getMedal({ key: "buena_cantidad", title: 'Buena cantidad', icon: 'Medalla2' })}
            {this.getMedal({ key: "buen_servicio", title: 'Buen servicio', icon: 'Medalla3' })}
        </SView>
    }

    calificar() {
        var obj = {
            key_pedido: this.key_pedido,
            star: this.state.selectValue,
            buena_calidad: this.state.buena_calidad == true,
            buena_cantidad: this.state.buena_cantidad == true,
            buen_servicio: this.state.buen_servicio == true,
            comentario: this.inp_comentario.getValue() ?? "",
        }
        calificacion.Actions.registro(obj, this.props);
    }
    render() {
        var reducer = calificacion.Actions._getReducer(this.props);
        if (reducer.estado == "exito") {
            reducer.estado = "";
            SNavigation.goBack();
        } else if (reducer.estado == "error") {
            reducer.estado = "";
            SPopup.alert("Ya existe una calificación para este pedido");
        }
        return (
            <>
                <SPage title={'Ayuda'}>

                    <SHr height={20} />
                    <SView col={"xs-12  "} row center >
                        <SView col={"xs-11 sm-6 lg-3.5 "} backgroundColor={STheme.color.primary} style={{ borderRadius: 16 }} center >
                            <SView col={"xs-11  "} center >
                                <SHr height={50} />
                                <SText fontSize={32} font={"Roboto"} color={STheme.color.secondary} bold center>¿Cómo te pareció?</SText>
                                <SHr height={5} />
                                <SText fontSize={24} font={"Roboto"} color={STheme.color.secondary} >Califica tu experiencia</SText>
                                <SHr height={20} />
                                {<SView col={"xs-12"} center row  >
                                    {this.getEstrella()}
                                </SView>}
                                <SHr height={20} />
                                {this.getMedals()}
                                <SHr height={40} />
                                <SText col={"xs-12"} fontSize={14} font={"Roboto"} color={STheme.color.secondary} style={{ justifyContent: 'flex-start' }} >Describe tu experiencia (opcional)</SText>
                                <SHr height={5} />
                                <SInput ref={r => this.inp_comentario = r} type={'textArea'} fontSize={14} height={110} font={"Roboto"} color={STheme.color.secondary} style={{
                                    borderRadius: 8, placeholderTextColor: STheme.color.secondary,
                                    fontSize: 14,
                                }} center backgroundColor={"#F39773"} placeholder={"\n\nDescribe tu experiencia "}
                                />
                                <SHr height={5} />
                                <PButtom fontSize={20} height={50} bold withe center onPress={() => {
                                    this.calificar()
                                }} >Enviar</PButtom>
                                <SHr height={60} />
                            </SView>
                        </SView>
                    </SView>
                    <SHr height={20} />



                </SPage>
            </>
        );
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Registro);