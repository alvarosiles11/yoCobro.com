import React, { Component } from 'react';
import { SDate, SIcon, SImage, SLoad, SMath, SNavigation, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
// import restaurante from '..';
import horario from '../../horario';
import { connect } from 'react-redux';
import FavoritoButtom from '../../favorito/Components/FavoritoButtom';
import restaurante from '..';
import { SHr } from 'servisofts-component';


class Item2 extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    HeaderItemFoto() {
        return <>
            <SView col={"xs-12"} center height={110} border={'transparent'} style={{ position: 'absolute', top: 0 }}  >
                <SImage src={`${SSocket.api.root}restaurante/${this.props.data.key}`} style={{ borderRadius: 8, resizeMode: 'cover' }} />
            </SView>
        </>

    }
    getNoDisponible(cantidad) {
        if (cantidad) return null;
        return <SView col={"xs-10"} style={{
            position: 'absolute',
            backgroundColor: "#ff0000",
            height: 2,
        }}>
        </SView>
    }

    getNoDisponible2(cantidad) {
        if (cantidad) return null;
        return <SView col={"xs-1.6"} style={{
            position: 'absolute',
            // backgroundColor: "#ff0000",
            // height: 2,
            top: 5,
            right: 8,
        }}>
            <SIcon name={"NoDisponible"} size={5} />
        </SView>
    }

    HeaderItemDisponible() {
        var cantidad = 0;
        if (this.props.data.pack) {
            cantidad = this.props.data.pack.disponibles;
        }

        return <>
            {/* <SView col={"xs-12"} row height={30} style={{ position: 'absolute', top: 0 }} border={'transparent'}> */}
            {/* <SView col={"xs-10"} row center style={{ justifyContent: 'flex-start', }}> */}

            {/* ANTES */}
            {/* <SView width={112} height={24} center style={{ borderRadius: 4, overflow: 'hidden', backgroundColor: '#FFBB3E' , position: 'absolute', top: 8, left: 8 }}>
                <SText fontSize={10} font={"Roboto"} color={STheme.color.secondary} >{cantidad} disponible(s)</SText>
                {this.getNoDisponible(cantidad)}
            </SView> */}

            {/* CAMBIO ESTILO */}
            <SView width={112} height={24} center style={{ borderRadius: 4, overflow: 'hidden', backgroundColor: cantidad != 0 ? '#FFBB3E' : '#979797', position: 'absolute', top: 8, left: 8 }}>
                <SText center fontSize={10} font={"Roboto"} color={STheme.color.secondary} >{cantidad} disponible(s)  </SText>
                {this.getNoDisponible2(cantidad)}
            </SView>
            {/* <SView flex /> */}
            <SView width={40} center style={{
                position: 'absolute', top: 4, right: 4,
            }} >
                <FavoritoButtom data={this.props.data} size={20} />
            </SView>

            {/* </SView> */}

        </>

    }
    HeaderItemTitle() {
        var cantidad = 0;
        if (this.props.data.pack) {
            cantidad = this.props.data.pack.disponibles;
        }
        return <>
            <SView col={"xs-11"} height={50} row center style={{ position: 'absolute', top: 85, justifyContent: 'flex-start', }} >
                <SView width={250} height={21} row center style={{ borderRadius: 8, overflow: 'hidden', backgroundColor: cantidad != 0 ? STheme.color.primary : STheme.color.lightGray, left: 1, position: 'absolute' }}>
                    <SText col={"xs-12"} fontSize={12} font={"Roboto"} color={STheme.color.secondary} center style={{ position: 'absolute' }} >{this.props.data.nombre}</SText>
                </SView>
                <SView height={50} width={50} style={{ borderRadius: 50, overflow: 'hidden', backgroundColor: 'white', position: 'absolute' }}>
                    <SImage src={`${SSocket.api.root}restaurante/${this.props.data.key}`} style={{
                        resizeMode: 'cover',
                    }} />
                </SView>
            </SView>
        </>
    }
    getItems() {
        var cantidad = 0;
        var precio = 0;
        if (this.props.data.pack) {
            cantidad = this.props.data.pack.cantidad;
            precio = this.props.data.pack.precio;
        }
        return <>
            <SView col={"xs-12"} height={190} center border={'transparent'} onPress={() => { SNavigation.navigate("restaurante/perfil", { key: this.props.data.key }); }} >
                <SView col={"xs-11.9"} center border={STheme.color.card} style={{ borderRadius: 8, borderWidth: 2 }}>
                    <SView col={"xs-12"} height={130} border={'transparent'} />
                    <SView col={"xs-11"} height={45} row center border={'transparent'}  >
                        <SView flex height row center border={'transparent'} style={{ justifyContent: 'flex-start', alignContent: 'center', }} >
                            <SView col={"xs-12"} row >
                                <SIcon name={'Reloj'} width={13} />
                                <SView width={6} />
                                <SText fontSize={12} font={"Roboto"} >{this.props.data.horario?.extraData?.text}</SText>
                            </SView>
                            <SHr height={1} />
                            <SText fontSize={11.5} font={"Roboto"} >{this.props.data.horario?.extraData?.hora_inicio} - {this.props.data.horario?.extraData?.hora_fin}</SText>
                        </SView>

                        <SView flex height row center style={{ alignContent: 'center', }} border={'transparent'}>
                            <SView width={5} />
                            <SIcon name={'Location'} height={15} width={11} />
                            <SView width={6} />
                            <SText fontSize={14} font={"Roboto"}>{this.props.data.distancia} Km</SText>
                        </SView>

                        <SView flex height row center border={'transparent'} style={{ justifyContent: 'flex-end', alignContent: 'center', }} >
                            <SText fontSize={14} font={"Roboto"} center >Bs {SMath.formatMoney(precio)}</SText>
                        </SView>

                    </SView>
                    <SHr height={5} />

                </SView>
                {this.HeaderItemFoto()}
                {this.HeaderItemDisponible()}
                {this.HeaderItemTitle()}

            </SView>

        </>
    }

    render() {
        return (this.getItems());
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Item2);