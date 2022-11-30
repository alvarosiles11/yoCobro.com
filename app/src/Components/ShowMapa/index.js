import React, { Component } from "react";
import { connect } from "react-redux";
import { SIcon, SLoad, SMapView, SMarker, SView } from "servisofts-component";

// import { SBLocation } from 'servisofts-background-location';

// import usuario from '../../../../../Usuario/Components/usuario';
// import conductor_horario from '../../../conductor_horario';

class ShowMapa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conductor: null,
    };
  }

  componentDidMount() {
    // if (!usuario.Actions.validateSession(this.props)) { return <SLoad />; }
    // SBLocation.addListener((data) => {
    //     this.setState({ conductor: data });
    //     // console.log(data);
    // })
  }

  render() {
    var dataPedido = conductor_horario.Actions.getPedidoProximoByKey(
      this.props.state.usuarioReducer.usuarioLog.key,
      this.props
    );
    if (!dataPedido) return <SLoad />;
    var dataConductor = this.state.conductor;
    return (
      <>
        <SView col={"xs-12"} flex>
          <SMapView
            initialRegion={{
              latitude: dataPedido?.restaurante["latitude"],
              longitude: dataPedido?.restaurante["longitude"],
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            preventCenter={true}
            // showUserLocation={true}
          >
            <SMarker
              lat={dataPedido?.restaurante["latitude"]}
              lng={dataPedido?.restaurante["longitude"]}
            >
              <SIcon name="MarcadorMapa" width={40} height={40} />
            </SMarker>

            <SMarker
              lat={dataConductor?.data?.latitude ?? 0}
              lng={dataConductor?.data?.longitude ?? 0}
            >
              <SIcon name="LocationConductor" width={40} height={40} />
            </SMarker>
          </SMapView>
        </SView>
      </>
    );
  }
}
const initStates = (state) => {
  return { state };
};
export default connect(initStates)(ShowMapa);
