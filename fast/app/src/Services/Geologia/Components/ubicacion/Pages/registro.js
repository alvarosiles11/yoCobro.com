import { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SInput, SMapView, SPage, SText, SThread, SView } from 'servisofts-component';
import PButtom from '../../../../../Components/PButtom';

class registrosss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: false, dirType: "moveMap", nombre: " "};
    }

    componentDidMount() {
        new SThread(100, "sad", false).start(() => {
            this.setState({
                region: {
                    latitude: -17.7833276,
                    longitude: -63.1821408,
                }
            })
        })

    }

    showMapa() {
        return <>
            <SView col={"xs-12"} flex>
                <SMapView
                    initialRegion={{
                        latitude: -17.7833276,
                        longitude: -63.1821408,
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

    getGeocode() {
        if (!this.state.region) return null;
        if (this.state.dirType != "moveMap") return null;
        var geocode = Parent.Actions.geocode(this.state.region, this.props);
        if (!geocode) return 'cargando...';
        var aux = geocode.direccion;
        if (!aux) return "cargando..."
        // alert('getGeocode');

        if (this.state.nombre != aux) {
            this.state.nombre = aux;
            // this.setState({ ...this.state });
        }

        return aux;
    }

    getAlgo() {
        //  if (!this.props.state.direccion_usuarioReducer.miDireccion) return null;
        return <SView col={"xs-11"} >
            <SInput fontSize={12} placeholder={"Nombre de la Ubicación"}
                isRequired={true}
                height={55}
                ref={(ref) => { this.inpNombreUbicacion = ref }}
            />
        </SView>
    }

    render() {
        var _direcion;
        var _latitude;
        var _longitude;

        // let reducer = this.props.state.direccion_usuarioReducer
        // if (reducer.type == "registro" && reducer.estado == "exito") {
        //     reducer.estado = "";
        //     this.props.dispatch({
        //         component: "direccion_usuario",
        //         type: "editarMiDireccion",
        //         data: reducer.lastRegister
        //     })

        //     _direcion = this.state?.nombre;
        //     _latitude = this.state?.latitude;
        //     _longitude = this.state?.longitude;
        //     SNavigation.replace("/");
        // }
        // this.getGeocode()


        return (<SPage title={'Elegir mi dirección'} disableScroll center>

            <SView col={"xs-12"} center flex>
                {this.showMapa()}
            </SView >
            <SView col={"xs-12 md-10 lg-8 xl-6"} height={280} row center>
                <SHr height={20} />
                <SView col={"xs-12"} center row border={'transparent'}>
                    {this.getAlgo()}
                    <SHr height={10} />
                </SView>

                <SView col={"xs-12"} row center height={40} border={'transparent'}>
                    <SView width={40} center>
                        <SIcon name={'LocationTapeke'} height={14} width={14} />
                    </SView>
                    <SView onPress={() => { this.map.center(); }}>
                        <SText fontSize={14} font={"Roboto"} bold>Utilizar mi ubicación actual</SText>
                    </SView>
                </SView>

                <SView col={"xs-8.8"} row center border={'transparent'}  >
                    <PButtom fontSize={16} onPress={() => {
                        if (!this.inpNombreUbicacion.verify()) return null;
                        var data = {
                            descripcion: this.inpNombreUbicacion.getValue(),
                            latitude: this.state.region?.latitude,
                            longitude: this.state.region?.longitude,
                            direccion: this.state.nombre,
                        }
                        console.log(data);
                        // Parent.Actions.registro(data, this.props);
                     }}>ELEGIR ESTA UBICACIÓN</PButtom>
                </SView>
                <SHr height={10} />
            </SView>


        </ SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(registrosss);