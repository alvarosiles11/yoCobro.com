import { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SInput, SLoad, SMapView, SNavigation, SPage, SText, STheme, SThread, SView } from 'servisofts-component';
import grupo from '..';
import BarraSuperiorTapeke from '../../../../../Components/BarraSuperiorTapeke';
import Marker from '../../../../../Components/Marker';
// import Marker from '../Components/Marker';
import PButtom from '../../../../../Components/PButtom';
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
		// if (!data) return null;

		// var filtro = filtros.Actions.getFiltrosActivos(this.props);
		// var data = Parent.Actions.getAllFilter(filtro, this.props);
		// let size = 70;

		return Object.keys(data).map((key) => {
			var obj = data[key];

			if (obj.key_grupo == this.key)
				// return data.map((obj, index) => {

				return <Marker key={"marker" + key} lat={obj.latitud} lng={obj.longitud} data={obj} />

		})


	}
	// 	example() {const datos = [
	// 		{ 'codigo': 1, 'empresa': 'servisofts', 'descripcion': 'doña juana', 'fecha': '06/01/2022', 'hora': '16:18:00', 'latitud': '-17.780430023320765', 'longitud': '-63.17495535880358', 'grupo': 'anillo 10', 'estado': '1' },
	// 		{ 'codigo': 2, 'empresa': 'servisofts', 'descripcion': 'Maria lopez', 'fecha': '07/01/2022', 'hora': '17:18:00', 'latitud': '-17.78322832197151', 'longitud': '-63.174300205346256', 'grupo': '1', 'estado': '1' },
	// 		{ 'codigo': 3, 'empresa': 'servisofts', 'descripcion': 'Sra. sandra ', 'fecha': '08/01/2022', 'hora': '18:18:00', 'latitud': '-17.785726853340996', 'longitud': '-63.173299390435176', 'grupo': 'anillo 1', 'estado': '1' },
	// 		{ 'codigo': 4, 'empresa': 'servisofts', 'descripcion': 'Don marcelo', 'fecha': '09/01/2022', 'hora': '19:18:00', 'latitud': '-17.788011950409174', 'longitud': '-63.17283025476309', 'grupo': 'anillo 1', 'estado': '1' },
	// 		{ 'codigo': 5, 'empresa': 'servisofts', 'descripcion': 'Casa roja ', 'fecha': '10/01/2022', 'hora': '20:18:00', 'latitud': '-17.78893972583567', 'longitud': '-63.17494136528752', 'grupo': '1', 'estado': '1' },
	// 		{ 'codigo': 6, 'empresa': 'servisofts', 'descripcion': 'costa azul', 'fecha': '11/01/2022', 'hora': '21:18:00', 'latitud': '-17.789085740165323', 'longitud': '-63.17750111141945', 'grupo': 'anillo 1', 'estado': '1' },
	// 		{ 'codigo': 7, 'empresa': 'servisofts', 'descripcion': 'don marcos', 'fecha': '12/01/2022', 'hora': '22:18:00', 'latitud': '-17.790328213462328', 'longitud': '-63.18399509788528', 'grupo': 'anillo 1', 'estado': '1' },
	// 		{ 'codigo': 8, 'empresa': 'servisofts', 'descripcion': 'a', 'fecha': '13/01/2022', 'hora': '23:18:00', 'latitud': '-17.78691861488884', 'longitud': '-63.18554273017388', 'grupo': '1', 'estado': '1' },
	// 		{ 'codigo': 9, 'empresa': 'servisofts', 'descripcion': 'b', 'fecha': '14/01/2022', 'hora': '0:18:00', 'latitud': '-17.783335576753103', 'longitud': '-63.1849358155509', 'grupo': 'anillo 1', 'estado': '1' },
	// 		{ 'codigo': 10, 'empresa': 'servisofts', 'descripcion': 'c', 'fecha': '15/01/2022', 'hora': '1:18:00', 'latitud': '-17.780287162122978', 'longitud': '-63.18185786356161', 'grupo': 'anillo 1', 'estado': '1' },
	// 		{ 'codigo': 11, 'empresa': 'servisofts', 'descripcion': 'd', 'fecha': '16/01/2022', 'hora': '2:18:00', 'latitud': '-17.78089068004462', 'longitud': '-63.178863989391196', 'grupo': '2', 'estado': '1' },
	// 		{ 'codigo': 12, 'empresa': 'servisofts', 'descripcion': 'f', 'fecha': '17/01/2022', 'hora': '3:18:00', 'latitud': '-17.785701824917552', 'longitud': '-63.18024472015847', 'grupo': 'anillo 1', 'estado': '1' },
	// 		{ 'codigo': 13, 'empresa': 'servisofts', 'descripcion': 'g', 'fecha': '18/01/2022', 'hora': '4:18:00', 'latitud': '-17.784358184886056', 'longitud': '-63.182535822860196', 'grupo': '3', 'estado': '1' },
	// 		{ 'codigo': 14, 'empresa': 'servisofts', 'descripcion': 'y', 'fecha': '19/01/2022', 'hora': '5:18:00', 'latitud': '-17.775725966748137', 'longitud': '-63.19019177230439', 'grupo': 'anillo 1', 'estado': '1' },
	// 		{ 'codigo': 15, 'empresa': 'servisofts', 'descripcion': 'doña juana', 'fecha': '20/01/2022', 'hora': '6:18:00', 'latitud': '-17.772841669303233', 'longitud': '-63.18671500247983', 'grupo': 'anillo 1', 'estado': '0' },
	// 		{ 'codigo': 16, 'empresa': 'servisofts', 'descripcion': 'Maria lopez', 'fecha': '21/01/2022', 'hora': '7:18:00', 'latitud': '-17.7720379662059 ', 'longitud': '-63.18236556971132', 'grupo': '4', 'estado': '1' },
	// 		{ 'codigo': 17, 'empresa': 'servisofts', 'descripcion': 'Sra. sandra ', 'fecha': '22/01/2022', 'hora': '8:18:00', 'latitud': '-17.772160957624944', 'longitud': '-63.17831499339745', 'grupo': 'anillo 1', 'estado': '1' },
	// 		{ 'codigo': 18, 'empresa': 'servisofts', 'descripcion': 'Don marcelo', 'fecha': '23/01/2022', 'hora': '9:18:00', 'latitud': '-17.774245506628485', 'longitud': '-63.17532689956337', 'grupo': 'anillo 1', 'estado': '1' },
	// 		{ 'codigo': 19, 'empresa': 'servisofts', 'descripcion': 'Casa roja ', 'fecha': '24/01/2022', 'hora': '10:18:00', 'latitud': '-17.774918865813515', 'longitud': '-63.16792261094122', 'grupo': 'anillo 1', 'estado': '1' },
	// 		{ 'codigo': 20, 'empresa': 'servisofts', 'descripcion': 'costa azul', 'fecha': '05/01/2022', 'hora': '11:18:00', 'latitud': '-17.77873324492316', 'longitud': '-63.168984711531415', 'grupo': 'anillo 1', 'estado': '1' },
	// 		{ 'codigo': 21, 'empresa': 'servisofts', 'descripcion': 'don marcos', 'fecha': '06/01/2022', 'hora': '16:18:00', 'latitud': '-17.785924506964655', 'longitud': '-63.16860025957565', 'grupo': 'anillo 2', 'estado': '1' },
	// 		{ 'codigo': 22, 'empresa': 'servisofts', 'descripcion': 'a', 'fecha': '07/01/2022', 'hora': '17:18:00', 'latitud': '-17.795512295458874', 'longitud': '-63.174393943219016', 'grupo': 'anillo 2', 'estado': '1' },
	// 		{ 'codigo': 23, 'empresa': 'servisofts', 'descripcion': 'b', 'fecha': '08/01/2022', 'hora': '18:18:00', 'latitud': '-17.797893472519387', 'longitud': '-63.18487114615332', 'grupo': 'anillo 2', 'estado': '1' },
	// 		{ 'codigo': 24, 'empresa': 'servisofts', 'descripcion': 'c', 'fecha': '09/01/2022', 'hora': '19:18:00', 'latitud': '-17.796866643724535', 'longitud': '-63.18946406495324', 'grupo': '3', 'estado': '1' }];
	// 		return datos.map((obj, index) => {
	// 				return <Marker key={"marker" + index} lat={obj.latitud} lng={obj.longitud} data={obj} onPress={() => {
	// 						SNavigation.navigate("restaurante/perfil", { key: obj.codigo });
	// 				}} />
	// 		})
	// }

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

					onRegionChangeComplete={(region) => {
						this.setState({ region: region, dirType: "moveMap" });
					}}
					preventCenter>
					{this.getDirecciones()}

				</SMapView>
			</SView>

			<SView style={{ position: 'absolute', }} center   >
				<SIcon name="MarcadorMapa" width={20} height={20} />
			</SView>
		</>
	}






	selectGrupo(direccion) {

		const data = grupo.Actions.getAll(this.props);
		if (!data) return <SLoad />

		// if (!direccion) return "Elejir mi ubicación...";
		// var dir = direccion.direccion;

		// var chars = 40;
		// if (dir.length > chars) {
		// 		dir = dir.substring(0, chars) + "...";

		// }
		// if (direccion.descripcion) {
		// 		//   return direccion.descripcion + "\n" + dir;
		// }
		// return data.;
}

	render() {


		return (
			<>
				<BarraSuperiorTapeke>
					<SView row border={'transparent'} >
						<SView height={50} width={15}>
							<SView style={{ top: 6 }} center>
								<SIcon name={"Location"} height={18} fill={STheme.color.secondary} />
							</SView>
						</SView>
						<SView height={50} style={{ justifyContent: 'center', paddingLeft: 8, paddingRight: 8, }}>
						{/* <SText font={"Roboto-Bold"} fontSize={11} center color={STheme.color.secondary}>{this.selectGrupo(miDireccion)}</SText> */}

							<SText font={"Roboto"} fontSize={10} center bold color={STheme.color.secondary}>{" "}Grupo Abasto test</SText>
							<SText font={"Roboto"} fontSize={12} center bold color={STheme.color.secondary}>{" "}A menos de 30 km</SText>
						</SView>
						<SView height={50} width={25}>
							<SView style={{ top: 6 }} center>
								<SIcon name={"Back"} height={18} fill={STheme.color.secondary} style={{ transform: [{ rotate: "-90deg" }] }} />
							</SView>
						</SView>
					</SView>
				</BarraSuperiorTapeke>

				{/* <SPage title={'grupo direccion'} disableScroll center> */}


				<SView col={"xs-12"} center flex>
					{this.showMapa()}
				</SView >




				{/* </ SPage > */}
			</>

		);
	}
}
const initStates = (state) => {
	return { state }
};
export default connect(initStates)(grafico);