import React, { Component } from 'react';

import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import {
	SGradient, SHr, SIcon, SImage, SLoad, SPage, SScrollView2, SText, STheme, SView, SNavigation, SInput, SMapView, SMarker,
} from 'servisofts-component';
import Item2 from '../Components/Item2';
import PBarraFooter from '../../../../../Components/PBarraFooter';
import BarraSuperiorTapeke from '../../../../../Components/BarraSuperiorTapeke';
import Parent from '../index'



class MapaTest extends Component {
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
					// onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
					// onRegionChangeComplete={(region, gesture) => {
					// 	if (Platform.OS === 'android') {
					// 	  if (gesture.isGesture) {
					// 		onRegionChange(region);
					// 	  }
					// 	} else {
					// 	  onRegionChange(region);
					// 	}

					// }}
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
					{/* <SMarker lat={this.state.regionClick?.latitude} lng={this.state.regionClick?.longitude}  >
						<SView col={"xs-12"} height center>
							<SIcon name="Marker" width={20} height={20} fill={"blue"}/>
							<SHr/>
						</SView>
					</SMarker> */}
				</SMapView>
			</SView>
			<SView style={{ position: 'absolute', }} center   >
				{/* {onRegionChange(region) } */}

				<SIcon name="MarcadorMapa" width={20} height={20} />
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