import React from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SLoad, SMapView, SMarker, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import Parent from '../../index';
import SSocket from 'servisofts-socket';
import Restaurante from '../../../restaurante';
import BotonesEstado from '../../Components/BotonesEstado'

class Pagado extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     isLoading: false,
        // };

        this.state = {
            region: {
                latitude: -17.7833276,
                longitude: -63.1821408,
            }
        };
        // this.key_pedido = "226dd263-666b-4af8-9e93-1d101bf28efb";
        this.key_pedido = SNavigation.getParam('key_pedido');
    }
    componentDidMount() {
        this.isRun = true;
    }
    componentWillUnmount() {
        this.isRun = false;
    }
    showMapa() {
        this.auxPedido = Parent.Actions.getDetalle(this.key_pedido, this.props)
        if (!this.auxPedido) return <SLoad />
        // this.auxPedido.direccion.latitude
        return <>
            <SMapView initialRegion={
                {
                    latitude: (this.auxPedido.restaurante.latitude + this.auxPedido.direccion.latitude) / 2,
                    longitude: (this.auxPedido.restaurante.longitude + this.auxPedido.direccion.longitude) / 2,
                    latitudeDelta: 0.0722,
                    longitudeDelta: 0.0421,
                }}
                preventCenter>
                <Restaurante.Components.Marker data={this.auxPedido.restaurante} lat={this.auxPedido.restaurante.latitude} lng={this.auxPedido.restaurante.longitude} />
                <SMarker lat={this.auxPedido.direccion.latitude} lng={this.auxPedido.direccion.longitude} >
                    <SIcon name={"Marker"} width={50} height={50} fill={"#FA790E"} />
                </SMarker>
            </SMapView>
        </>
    }

    getBotones(data) {
        if (data.state == "pagado") {
            var estadoPagado = data.state;
        }
        if (data.state == "listo") {
            var estadoListo = data.state;
        }
        if (data.state == "en_camino") {
            var estadoEnCamino = data.state;
        }
        if (data.state == "conductor_cerca") {
            var estadoConductor = data.state;
        }

        return (
            <>
                <SView col={"xs-12"} border={'transparent'} center >
                    <SText color={STheme.color.darkGray} style={{ fontSize: 15 }} bold>{Parent.Actions.getDetalleEstado(data)}</SText>
                </SView>
                <SView col={"xs-12"} height={90} row>
                    <SView col={"xs-3.5"} style={{ borderBottomWidth: 3, }} border={'transparent'} center  >
                        <SIcon name="PedConfirmacion" width={48} fill={estadoPagado ? STheme.color.primary : STheme.color.primary + 22}  > </SIcon>
                        <SView col={"xs-12"} height={10} backgroundColor={estadoPagado ? STheme.color.primary : STheme.color.primary + 22} style={{ borderRadius: 16, }}></SView>
                        <SText color={estadoPagado ? STheme.color.primary : STheme.color.primary + 22} style={{ fontSize: 12 }} bold>Confirmación</SText>
                    </SView>

                    <SView width={5} height />
                    <SView flex border={'transparent'} center>
                        <SIcon name="PedPreparacion" width={48} fill={estadoListo ? STheme.color.primary : STheme.color.primary + 22} />
                        <SView col={"xs-12"} height={10} backgroundColor={estadoListo ? STheme.color.primary : STheme.color.primary + 22} />
                        <SText color={estadoListo ? STheme.color.primary : STheme.color.primary + 22} style={{ fontSize: 12 }} bold>Preparación</SText>
                    </SView>
                    <SView width={5} height />

                    <SView col={"xs-3.5"} style={{ borderBottomWidth: 3, }} border={'transparent'} center>
                        <SIcon name="PedDelivery" width={48} fill={STheme.color.primary + 22} />
                        <SView col={"xs-12"} height={10} backgroundColor={STheme.color.primary + 22} style={{ borderRadius: 16, }} />
                        <SText color={STheme.color.primary + 22} style={{ fontSize: 12 }} bold>Delivery</SText>
                    </SView>
                </SView>
            </>
        );
    }



    render() {

        this.auxPedido = Parent.Actions.getDetalle(this.key_pedido, this.props)
        if (!this.auxPedido) return <SLoad />

        // console.log("hora ", this.auxPedido.horario.hora_inicio);
        // console.log("hora ", this.auxPedido.horario.hora_fin);
        return (
            <SPage disableScroll center onBack={() => {
                SNavigation.goBack();
                SNavigation.reset("/");
                return true;
            }}>
                <SView col={"xs-12"} row center flex border={"transparent"} >
                    {this.showMapa()}
                </SView >
                {/* <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} height={230} row center backgroundColor={'transparent'} >
                    <SHr height={20} />
                    <SText fontSize={14.5} font={"Roboto"} bold >El restaurante esta preparando tu pedido!!!</SText>
                    <SHr height={15} />
                    <SView col={"xs-10"} height={5} backgroundColor={STheme.color.card} style={{ borderRadius: 8 }}></SView>
                    <SHr height={15} />
                    <SView col={"xs-11"} height={40} row center border={'transparent'}  >
                        <SView flex row center style={{ justifyContent: 'flex-start', }}>
                            <SText fontSize={16} font={"Roboto"}>Hora de entrega:</SText>
                        </SView>
                        <SView flex row center style={{ justifyContent: 'flex-end', }}>
                            <SText fontSize={20} font={"Roboto"}>  {this.auxPedido.horario.hora_inicio} - {this.auxPedido.horario.hora_fin}</SText>
                        </SView>
                    </SView>
                    <SHr height={5} />
                    <SView col={"xs-11"} height={80} row style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray, }} >
                        <SView flex row center style={{ justifyContent: 'flex-start', }}>
                            <SView width={46} height={48} row center   >
                                <SView width={46} height={48} style={{ backgroundColor: '#E9EAEE', borderRadius: 50, }} center   >
                                    <SImage src={`${SSocket.api.root}restaurante/${this.auxPedido.restaurante.key}`} style={{ width: "100%", position: "relative", resizeMode: "cover", borderRadius: 50, }} />
                                </SView>
                            </SView>
                            <SView width={10} height={48} row center />
                            <SView flex row height={40}   >
                                <SText fontSize={14} font={"Roboto"} color={STheme.color.text} bold>
                                    {this.auxPedido?.restaurante.nombre}
                                </SText>
                                <SHr height={3} />
                                <SText fontSize={14} font={"Roboto"} color={STheme.color.gray} >Restaurant</SText>
                            </SView>
                        </SView>
                        <SView width={100} row center border={'transparent'}   >
                            <SHr height={15} />
                            <SView width={90} height={20} row center border={STheme.color.card} style={{ backgroundColor: '#E9EAEE', borderRadius: 50, }} >
                                <SText fontSize={12} font={"Roboto"} > Contactar</SText>
                            </SView>
                        </SView>
                    </SView>
                    <SHr height={15} />
                </SView> */}

                <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} height={225} row center backgroundColor={'transparent'}>
                    <SHr height={10} />

                    <SView col={"xs-3"} height={7} backgroundColor={STheme.color.card} style={{ borderRadius: 16, }}
                        onPress={() => {
                            SNavigation.navigate("pedido/pedidoqr", { key_pedido: this.key_pedido })
                        }} />
                    <SHr height={5} />

                    {/* <SView col={"xs-12"} border={'transparent'} row center >
                        <SText color={STheme.color.darkGray} style={{ fontSize: 12 }} bold>Llegada estimada</SText>
                    </SView> */}
                    <SView col={"xs-12"} border={'transparent'} row center >
                        <SText color={STheme.color.darkGray} style={{ fontSize: 38 }} bold>{this.auxPedido.horario.hora_inicio} - {this.auxPedido.horario.hora_fin}</SText>
                    </SView>

                    {/* {this.getBotones(this.auxPedido)}
                    <SHr height={20}/> */}
                    <BotonesEstado data={this.auxPedido}/>
                </SView>
                <SHr height={5} />
            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Pagado);