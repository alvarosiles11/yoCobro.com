import React from 'react';
import { connect } from 'react-redux';
import { SIcon, SMapView, SMarker, SNavigation, SPage, SView } from 'servisofts-component';
import Parent from "..";
import BarraSuperiorTapeke from '../../../../../Components/BarraSuperiorTapeke';
import Direccion from '../../../../../Components/BarraSuperiorTapeke/Direccion';
import PBarraFooter from '../../../../../Components/PBarraFooter';
import filtros from '../../filtros';
import BarraFiltros from '../../filtros/Components/BarraFiltros';

class exploradorMapa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.key = SNavigation.getParam("keyUsuario");
    }

    // getBotonos() {
    //     return <>
    //         <SView col={"xs-10 md-5 lg-4 xl-3"} row center height={40}  >
    //             <SView col={"xs-6"} center height={40} backgroundColor={STheme.color.white} border={STheme.color.primary} onPress={() => { SNavigation.navigate("explorar"); }} style={{
    //                 borderRadius: 4,
    //             }}>
    //                 <SText fontSize={20} font={"Roboto"} bold color={STheme.color.primary}>Lista</SText>
    //             </SView>
    //             <SView col={"xs-6"} center height={40} backgroundColor={STheme.color.primary} style={{
    //                 borderRadius: 4,
    //             }}>
    //                 <SText fontSize={20} font={"Roboto"} bold color={STheme.color.white}>Mapa</SText>
    //             </SView>
    //         </SView>
    //     </>
    // }

    getRestaurante() {
        var filtro = filtros.Actions.getFiltrosActivos(this.props);
        var data = Parent.Actions.getAllFilter(filtro, this.props);
        if (!data) return null;
        let size = 70;
        return data.map((obj, index) => {
            return <Parent.Components.Marker key={"marker" + index} lat={obj.latitude} lng={obj.longitude} data={obj} onPress={() => {
                SNavigation.navigate("restaurante/perfil", { key: obj.key });
            }} />
        })
    }


    showMapa() {
        var miDireccion = this.props.state.direccion_usuarioReducer.miDireccion;
        var miDistancia = this.props.state.direccion_usuarioReducer.miDistancia;
        return <>
            <SView col={"xs-12"} flex>
                <SMapView initialRegion={
                    {
                        latitude: miDireccion.latitude,
                        longitude: miDireccion.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    
                    preventCenter>
                    {this.getRestaurante()}

                    <SMarker lat={miDireccion.latitude} lng={miDireccion.longitude} >
                        <SIcon name={"Marker"} width={30} height={30} fill={"#4285F4"} />
                    </SMarker>
                </SMapView>
            </SView>
            <SView col={"xs-12"} border={'transparent'} style={{ position: 'absolute' }} center   >
                <SView backgroundColor={"#ffffffcc"} style={{
                    borderRadius: 4,
                }}>
                    <BarraFiltros />
                </SView>
                {/* {this.getBotonos()} */}
            </SView>
        </>
    }



    render() {
        return (
            < SPage title={''} hidden disableScroll center >
                <BarraSuperiorTapeke>
                    <Direccion />
                </BarraSuperiorTapeke>
                <SView col={"xs-12"} flex >
                    {this.showMapa()}
                </SView>
                <PBarraFooter  url={"explorar"} />
            </ SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(exploradorMapa);