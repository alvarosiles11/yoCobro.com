import React from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';



class Mapa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }


    showMapa() {
        return <>
         <SView col={"xs-12"} flex>
          <SMapView initialRegion={
           {
            latitude: -17.808690397665742,
            longitude: -63.16250034566757,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
           }}
           preventCenter>
           <SMarker lat={-17.808690397665742} lng={-63.16250034566757} />
          </SMapView>
         </SView>
         <SView col={"xs-12"} height={50} border={'transparent'} style={{ position: 'absolute', top: 90, }} center   >
          {this.getBotonos()}
         </SView>
        </>
       }

    render() {


        return (
            <SPage center>
                <SView col={"xs-12"} row backgroundColor={STheme.color.card} center>
                    <SHr height={18} />
                    <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} center row style={{ backgroundColor: STheme.color.white }}>
                        <SView col={"xs-11"} row center>
                            {this.showMapa()}
                         </SView>
                    </SView>
                    <SHr height={18} />
                </SView>
            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Mapa);