import { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SLoad, SMapView, SNavigation, SPage, SThread, SView } from 'servisofts-component';
import Marker from '../../../../../Components/Marker';
import ubicacion from '../../ubicacion';



class grafico extends Component {
	constructor(props) {
		super(props);
		this.state = { region: false, dirType: "moveMap", nombre: " " };
		this.key = SNavigation.getParam("key");
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

	getDirecciones() {
		var data = ubicacion.Actions.getAll(this.props);
		if (!data) return <SLoad />
		return Object.keys(data).map((key) => {
			var obj = data[key];
			if (obj.key_grupo == this.key)
				return <Marker key={"marker" + key} lat={obj.latitud} lng={obj.longitud} data={obj} />
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
					ref={(map) => this.map = map}
					onRegionChangeComplete={(region) => {	this.setState({ region: region, dirType: "moveMap" });}}
					preventCenter>
					{this.getDirecciones()}
				</SMapView>
			</SView>
			<SView style={{ position: 'absolute', }} center   >
				<SIcon name="MarcadorMapa" width={20} height={20} />
			</SView>
		</>
	}





	render() {
		return (<SPage title={'grafico'} disableScroll center>
			<SView col={"xs-12"} center flex>
				{this.showMapa()}
			</SView >
		</ SPage >
		);
	}
}
const initStates = (state) => {
	return { state }
};
export default connect(initStates)(grafico);