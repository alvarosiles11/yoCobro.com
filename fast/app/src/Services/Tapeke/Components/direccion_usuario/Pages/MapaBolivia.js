import React from 'react';
import { connect } from 'react-redux';
import { SIcon, SPage, SScrollView2, SText, STheme, SView, SMapView, SMarker, } from 'servisofts-component';
import PBarraFooter from '../../../../../Components/PBarraFooter';
import BarraSuperiorTapeke from '../../../../../Components/BarraSuperiorTapeke';

class MapaTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			region: {
				latitude: -17.808690397665742,
				longitude: -63.16250034566757,
			}
		};
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
					onPress={(e) => {
						console.log(e)
						this.setState({ regionClick: e })
					}}

					onRegionChangeComplete={(region) => {
						// console.log(region);
						this.setState({ region: region })
					}}

					preventCenter>
					<SMarker lat={this.state.region?.latitude} lng={this.state.region?.longitude}  >
						<SIcon name="Marker" width={20} height={30} />
					</SMarker>
				</SMapView>
			</SView>
			<SView style={{ position: 'absolute', }} center   >
				<SIcon name="MarcadorMapa" width={20} height={20} />
			</SView>

			<SView col={"xs-12"} height={50} style={{ position: 'absolute',backgroundColor:'cyan', top:50 }} center   >
				{/* <SIcon name="MarcadorMapa" width={20} height={20} /> */}

				<SText fontSize={18} font={"Roboto"} style={{ fontWeight: "bold" }}>latitude: {this.state.region?.latitude}</SText>
				<SText fontSize={18} font={"Roboto"} style={{ fontWeight: "bold" }}>longitude: {this.state.region?.longitude}</SText>

			</SView>
		</>
	}


	render() {
		return (
			<SPage title={''} hidden disableScroll center>
				<BarraSuperiorTapeke  >
					<SText font={"Roboto"} fontSize={25} color={STheme.color.secondary}>Mis Favoritos</SText>
				</BarraSuperiorTapeke>
				<SScrollView2 disableHorizontal={true}>
					<SView col={"xs-12"} center height  >
						{this.showMapa()}
					</SView >
				</SScrollView2>
				<PBarraFooter />
			</ SPage >
		);
	}
}
const initStates = (state) => {
	return { state }
};
export default connect(initStates)(MapaTest);