import React from 'react';
import { connect } from 'react-redux';
import { SDate, SGradient, SHr, SIcon, SImage, SLoad, SMapView, SMarker, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import restaurante from '..';
import PButtom from '../../../../../Components/PButtom';
import Calificacion from '../../calificacion';
import FavoritoButtom from '../../favorito/Components/FavoritoButtom';
import general from '../../general';
import horario from '../../horario';
import Parent from '../index';

class Paso1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_restaurante = SNavigation.getParam('key');
        // this.key_servicio = SNavigation.getParam('key_servicio');
    }


    getHorarioText() {
        var NroDia = new SDate().getDayOfWeek();
        var data_horario = horario.Actions.getAll(this.props);
        if (!data_horario) return <SLoad />;
        // filtro tabla {horario} y tabla {restaurante} por key_restaurante
        var misDatas = Object.values(data_horario).filter(itm => itm.key_restaurante == this.key_restaurante && itm.dia == NroDia)
        if (misDatas.length <= 0) return " Sin atención";
        return misDatas.map((obj) => {
            // filtro tabla {horario.dia} y el numero del dia
            if (obj.dia == NroDia) {
                return " Hoy " + obj.hora_inicio + " - " + obj.hora_fin;
            }
        })
    }

    calificacion() {
        return <>
            <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} style={{ backgroundColor: STheme.color.white }} center>
                <SView col={"xs-11"}>
                    <SHr height={15} />
                    <SText fontSize={15} font={"Roboto"} style={{ fontWeight: "bold" }}>Qué piensan otros usuarios</SText>
                    <SHr height={20} />
                    <SView col={"xs-12"} row style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}>
                        <SView col={"xs-2"} center >
                            <SIcon name={'CalGusto'} height={40} width={40} />
                        </SView>
                        <SView col={"xs-10"}  >
                            <SText fontSize={15} font={"Roboto"} style={{ fontWeight: "bold" }}>A muchos les gusta este pack</SText>
                            <SText fontSize={13} font={"Roboto"} >El 91% han putuado 3 estrellas sobre 5.</SText>
                        </SView>
                        <SHr height={10} />
                    </SView>
                    <SHr height={15} />
                    <SView col={"xs-12"} row style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}>
                        <SView col={"xs-2"} center >
                            <SIcon name={'CalServicio'} height={40} width={40} />
                        </SView>
                        <SView col={"xs-10"}  >
                            <SText fontSize={15} font={"Roboto"} style={{ fontWeight: "bold" }}>Buen servicio</SText>
                            <SText fontSize={13} font={"Roboto"} >El Servicio es genial.</SText>
                        </SView>
                        <SHr height={10} />
                    </SView>
                    <SHr height={15} />
                    <SView col={"xs-12"} row >
                        <SView col={"xs-2"} center >
                            <SIcon name={'CalCalidad'} height={40} width={40} fill={"#ffffff"} />
                        </SView>
                        <SView col={"xs-10"}  >
                            <SText fontSize={15} font={"Roboto"} style={{ fontWeight: "bold" }}>Buen calidad</SText>
                            <SText fontSize={13} font={"Roboto"} >La calidad de la comida es muy buena</SText>
                        </SView>
                        <SHr height={10} />
                    </SView>
                    <SHr height={15} />
                </SView>
            </SView>
        </>
    }

    hayDelivery(delivery) {
        if (delivery == true) {
            return <>
                <SView col={"xs-12"} center row  >
                    <SHr height={30} />
                    <SView col={"xs-4"} center >
                        <SIcon name={'Bicicleta'} height={37} width={52} />
                    </SView>
                    <SView col={"xs-8"} center >
                        <SText color={STheme.color.gray} fontSize={15} font={"Roboto"} style={{ fontWeight: "bold" }}>Este establecimiento te proporcionará todo lo necesario para llevarte tu pack a casa.</SText>
                    </SView>
                    <SHr height={30} />
                </SView>
            </>
        }
    }

    recoger() {
        this.dataRestaurante = restaurante.Actions.getByKey(this.key_restaurante, this.props)
        if (!this.dataRestaurante) return <SLoad />
        return <>
            <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} center style={{ backgroundColor: STheme.color.white }}>
                <SView col={"xs-11"} style={{ backgroundColor: STheme.color.white }}>
                    <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} row>
                        <SHr height={15} />
                        <SText fontSize={12} font={"Roboto"} style={{ fontWeight: "bold" }}>RECOGE TU PACK AQUÍ</SText>
                        <SHr height={15} />
                    </SView>
                    <SView col={"xs-12"} height={200}>
                        <SMapView initialRegion={
                            {
                                latitude: this.dataRestaurante.latitude,
                                longitude: this.dataRestaurante.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            options={{
                                fullscreenControl: false,
                                zoomControl: false,
                                gestureHandling: "none",
                                scrollwheel: false,

                            }}
                            preventCenter>
                            <SMarker lat={this.dataRestaurante.latitude} lng={this.dataRestaurante.longitude}  >
                                <SIcon name="MarcadorMapa" width={20} height={30} />
                            </SMarker>
                        </SMapView>
                    </SView>
                    <SView center col={"xs-12"} row style={{ borderBottomWidth: 1, borderTopWidth: 1, borderColor: STheme.color.lightGray }}>
                        <SView col={"xs-6"} row center style={{ borderRightWidth: 1, borderColor: STheme.color.lightGray }}
                            onPress={() => {
                                SNavigation.navigate(Parent.component + "/detalle", { key: this.key_restaurante });
                            }}>
                            <SHr height={20} />
                            <SIcon name={'Detalle'} height={17} width={22} />
                            <SText center color={STheme.color.primary} fontSize={15} font={"Roboto"} style={{ fontWeight: "bold" }}>Detalles {">"}</SText>
                            <SHr height={20} />
                        </SView>
                        <SView col={"xs-6"} center row
                            onPress={() => { SNavigation.navigate("restaurante/comollegar", { key: this.key_restaurante }); }}>
                            <SIcon name={'ComoLlegar'} height={26} width={26} />
                            <SText color={STheme.color.primary} fontSize={15} font={"Roboto"} style={{ fontWeight: "bold" }}>Cómo llegar {">"}</SText>
                        </SView>
                    </SView>
                    <SHr height={18} />
                    {this.hayDelivery(this.dataRestaurante.delivery)}
                </SView>
            </SView>
            <SHr height={18} />

        </>
    }

    getReservar() {
        if (!this.dataRestaurante.pack) return null;
        if (!this.dataRestaurante.pack.disponibles) return null;
        if (this.dataRestaurante.pack.disponibles <= 0) return null;
        return <>
            <PButtom fontSize={20} onPress={() => {
                SNavigation.navigate("pedido/detalle", { key: this.key_restaurante });
            }}>RESERVAR</PButtom>
            <SHr height={28} />
        </>
    }
    render() {
        var generalTime = general.Actions.getAllComponents(this.props);
        if (!generalTime) return <SLoad />
        return <SPage >
            <SView col={"xs-12"} backgroundColor={STheme.color.card} height>
                {this.subrender()}
            </SView>
        </SPage>
    }
    subrender() {

        this.dataRestaurante = restaurante.Actions.getByKeyDetalle(this.key_restaurante, this.props)
        if (!this.dataRestaurante) return <SLoad />
        var cantidad = 0;
        if (this.dataRestaurante.pack) {
            cantidad = this.dataRestaurante.pack.disponibles;
        }
        return <SView col={"xs-12"} row center>
            <SView col={"xs-12  "} center >
                <SView center col={"xs-12 sm-10 md-8 lg-6 xl-4  "} backgroundColor={"#9B060C"} height={216} >
                    <SImage src={`${SSocket.api.root}restaurante/${this.dataRestaurante.key}`} style={{ width: "100%", position: "relative", resizeMode: "cover" }} />
                    {/* <SImage src={require('../../../../../Assets/img/restPerfil.jpg')} style={{ width: "100%", position: "relative", resizeMode: "cover" }} /> */}
                    <SView style={{ position: "absolute", zIndex: 9999, top: 20, left: 20 }} >
                        <SView width={114} height={26} center style={{ borderRadius: 8, overflow: 'hidden', backgroundColor: STheme.color.primary }}>
                            <SText fontSize={12} font={"Roboto"} color={STheme.color.secondary} >{cantidad} disponible(s)</SText>
                        </SView>
                    </SView>
                    <SView center style={{ overflow: 'hidden', position: "absolute", zIndex: 9999, borderRadius: 30, left: 20, bottom: 20 }}
                        width={50} height={50} backgroundColor={STheme.color.white}>
                        <SImage src={`${SSocket.api.root}restaurante/${this.dataRestaurante.key}`} style={{ resizeMode: 'cover', }} />
                        {/* <SImage src={require('../../../../../Pages/fotos/perfil001.png')} /> */}

                    </SView>
                    <SGradient colors={["#00000045", "#00000045",]} />
                </SView>
            </SView>
            <SView col={"xs-12 "} center>
                <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} style={{ backgroundColor: STheme.color.white, }} center>
                    <SHr height={10} />
                    <SView col={"xs-11"} row >
                        <SView col={"xs-12"} >
                            <SText color={STheme.color.text} fontSize={14} style={{ fontWeight: "bold" }}  >{this.dataRestaurante.nombre} </SText>
                            {/* <SText color={STheme.color.text} fontSize={14} style={{ fontWeight: "bold" }}  >Veggie Garden - Gran Via</SText> */}
                        </SView>
                        <SHr height={15} border={'blue'} />

                        <SView col={"xs-6"} height={20} row center style={{ justifyContent: 'flex-start', }}>
                            <SIcon name={'Reloj'} width={13} />
                            <SView width={4} />
                            <SText fontSize={12} font={"Roboto"} >{this.dataRestaurante.horario.text}</SText>
                        </SView>
                        <SView col={"xs-6"} height={20} row center style={{ justifyContent: 'flex-end', }}>
                            <SText fontSize={15} font={"Roboto"} style={{ fontWeight: "bold" }}>Bs. {SMath.formatMoney(this.dataRestaurante.pack?.precio ?? 0)}</SText>
                        </SView>
                        <SHr height={10} border={'blue'} />
                    </SView>
                </SView>
            </SView>

            <SView col={"xs-12  "} center >
                <SView flex col={"xs-12 sm-10 md-8 lg-6 xl-4"} style={{ justifyContent: "flex-end" }} >
                    <SView center style={{ position: 'absolute', zIndex: 9999999, borderRadius: 30, right: 20, top: -100 }} width={50} height={50} backgroundColor={STheme.color.white}>
                        <FavoritoButtom data={this.dataRestaurante} />
                    </SView>
                </SView>
            </SView>

            <SHr height={18} />
            <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} row style={{ backgroundColor: STheme.color.white }} center>
                <SView col={"xs-11"}>
                    <SHr height={15} />
                    <SText fontSize={24} font={"Roboto"} style={{ fontWeight: "bold" }}>Sobre Nosotros</SText>
                    <SHr height={10} />
                    <SText style={{ textAlign: "justify" }} fontSize={14} font={"Roboto"} >{this.dataRestaurante.descripcion}</SText>
                    <SHr height={15} />
                </SView>
            </SView>
            <SHr height={18} />

            <Calificacion.Components.MediaRestaurante data={this.dataRestaurante} />
            {/* {this.calificacion()} */}

            {this.recoger()}
            {this.getReservar()}
        </SView>

    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Paso1);