import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SInput, SMapView, SMarker, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import PopUpDirecciones from '../Services/Tapeke/Components/direccion_usuario/Pages/PopUpDirecciones';
import PButtom from "../Components/PButtom"
import direccion_usuario from '../Services/Tapeke/Components/direccion_usuario';
class SelectDireccion extends Component {
    constructor(props) {
        super(props);

        this.callback = SNavigation.getParam("callback");
        this.showDescripcion = SNavigation.getParam("showDescripcion", false);
        this.latitude = SNavigation.getParam("latitude", -17.808690397665742);
        this.longitude = SNavigation.getParam("longitude", -63.16250034566757);
        this.state = {
            region: {
                latitude: this.latitude,
                longitude: this.longitude,
            },
            dirType: "moveMap",
            nombre: " "
        };
    }

    showMapa() {
        return <>
            <SView col={"xs-12"} flex>
                <SMapView
                    initialRegion={{
                        latitude: this.latitude,
                        longitude: this.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    // para ejecutar centar mapa
                    ref={(map) => this.map = map}
                    // onPress={(e) => {
                    //      this.setState({ regionClick: e });
                    // }}
                    onRegionChangeComplete={(region) => {
                        // cuando cambio de posicion (mouse)
                        this.setState({ region: region, dirType: "moveMap" });
                    }}
                    preventCenter>
                    {/* <SMarker lat={this.state.region?.latitude} lng={this.state.region?.longitude}  >
                        <SIcon name="Marker" width={20} height={30} />
                    </SMarker> */}
                </SMapView>
            </SView>

            <SView style={{ position: 'absolute', }} center   >
                <SIcon name="MarcadorMapa" width={20} height={20} />
            </SView>
        </>
    }

    getImput() {
        if (!this.showDescripcion) return null;
        //  if (!this.props.state.direccion_usuarioReducer.miDireccion) return null;
        return <SView col={"xs-10"} >
            <SInput fontSize={16} placeholder={"Nombre de la Ubicación"}
                isRequired={true}
                height={55}
                ref={(ref) => { this.inpNombreUbicacion = ref }}
            />
        </SView>
    }
    getComponentBottom() {
        return <SView col={"xs-12 md-10 lg-8 xl-6"} height={280} row center>
            <SHr height={20} />

            <SView col={"xs-12"} center row border={'transparent'}>
                {this.getImput()}
                <SHr height={10} />

                <SView col={"xs-10"}>
                    <SInput
                        style={{
                            backgroundColor: STheme.color.card + 1,
                            height: 55,
                            borderRadius: 16,
                            color: STheme.color.text,
                            fontSize: 16
                        }}
                        placeholder={"Busca una direccion!"}
                        // value={this.getGeocode()}
                        value={this.state.nombre}
                        onPress={() => {
                            SPopup.open({
                                key: "autocomplete", content:
                                    <PopUpDirecciones region={this.state.region} callback={(resp) => {
                                        SPopup.close("autocomplete");
                                        this.state.region = resp;
                                        this.map.animateToRegion(resp, 1000);
                                        this.state.dirType = "autoComplete"
                                        this.state.nombre = resp.direccion;
                                        this.setState({ ...this.state });
                                    }} />
                            });
                        }}
                        iconR={<SIcon name={"SearchTapeke"} width={40} height={18} fill={STheme.color.primary} />}
                    />
                </SView>
            </SView>

            <SView col={"xs-12"} row center border={'transparent'}>
                <SView width={40} center>
                    <SIcon name={'LocationTapeke'} height={14} width={14} />
                </SView>
                <SView width={200} onPress={() => { this.map.center(); }}>
                    <SText fontSize={15} font={"Roboto"} bold>Utilizar mi ubicación actual</SText>
                </SView>
            </SView>

            <SView col={"xs-8.8"} row center border={'transparent'}  >
                <PButtom fontSize={16} onPress={() => {
                    var descripcion = "";
                    if (this.showDescripcion) {
                        if (!this.inpNombreUbicacion.verify()) {
                            return null;
                        }
                        descripcion = this.inpNombreUbicacion.getValue();
                    }
                    var data = {
                        descripcion: descripcion,
                        latitude: this.state.region?.latitude,
                        longitude: this.state.region?.longitude,
                        direccion: this.state.nombre,
                    }
                    if (this.callback) {
                        this.callback(data);
                        SNavigation.goBack();
                    }

                }}>ELEGIR ESTA UBICACIÓN</PButtom>
            </SView>
            <SHr height={10} />
        </SView>
    }
    getGeocode() {
        if (this.state.dirType != "moveMap") return null;
        var geocode = direccion_usuario.Actions.geocode(this.state.region, this.props);
        if (!geocode) return 'cargando...';
        var aux = geocode.direccion;
        if (this.state.nombre != aux) {
            this.state.nombre = aux;
            this.setState({ ...this.state });
        }
        return aux;
    }

    render() {
        this.getGeocode()
        return (
            <SPage title={'SelectDireccion'} disableScroll center>
                <SView col={"xs-12"} center flex>
                    {this.showMapa()}
                </SView >
                {this.getComponentBottom()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(SelectDireccion);