import { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SInput, SLoad, SNavigation, SPage, SPopup, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import ubicacion from '..';
import FloatButtomTap from '../../../../../Components/FloatButtomTap';




class lista extends Component {
	constructor(props) {
		super(props);


		this.state = {
			find: "",

			latitudeQuemado: -17.808690397665742,
			longitudeQuemado: -63.16250034566757,

			region: {
				latitude: -17.808690397665742,
				longitude: -63.16250034566757,

			}
		};
		this.key = SNavigation.getParam("key");

	}

	example() {

		const datos = [
			{ 'codigo': 1, 'empresa': 'servisofts', 'descripcion': 'doña juana', 'fecha': '06/01/2022', 'hora': '16:18:00', 'latitud': '-17.780430023320765', 'longitud': '-63.17495535880358', 'grupo': 'anillo 10', 'estado': '1' },
			{ 'codigo': 2, 'empresa': 'servisofts', 'descripcion': 'Maria lopez', 'fecha': '07/01/2022', 'hora': '17:18:00', 'latitud': '-17.78322832197151', 'longitud': '-63.174300205346256', 'grupo': '1', 'estado': '1' },
			{ 'codigo': 3, 'empresa': 'servisofts', 'descripcion': 'Sra. sandra ', 'fecha': '08/01/2022', 'hora': '18:18:00', 'latitud': '-17.785726853340996', 'longitud': '-63.173299390435176', 'grupo': 'anillo 1', 'estado': '1' },
			{ 'codigo': 4, 'empresa': 'servisofts', 'descripcion': 'Don marcelo', 'fecha': '09/01/2022', 'hora': '19:18:00', 'latitud': '-17.788011950409174', 'longitud': '-63.17283025476309', 'grupo': 'anillo 1', 'estado': '1' },
			{ 'codigo': 5, 'empresa': 'servisofts', 'descripcion': 'Casa roja ', 'fecha': '10/01/2022', 'hora': '20:18:00', 'latitud': '-17.78893972583567', 'longitud': '-63.17494136528752', 'grupo': '1', 'estado': '1' },
			{ 'codigo': 6, 'empresa': 'servisofts', 'descripcion': 'costa azul', 'fecha': '11/01/2022', 'hora': '21:18:00', 'latitud': '-17.789085740165323', 'longitud': '-63.17750111141945', 'grupo': 'anillo 1', 'estado': '1' },
			{ 'codigo': 7, 'empresa': 'servisofts', 'descripcion': 'don marcos', 'fecha': '12/01/2022', 'hora': '22:18:00', 'latitud': '-17.790328213462328', 'longitud': '-63.18399509788528', 'grupo': 'anillo 1', 'estado': '1' },
			{ 'codigo': 8, 'empresa': 'servisofts', 'descripcion': 'a', 'fecha': '13/01/2022', 'hora': '23:18:00', 'latitud': '-17.78691861488884', 'longitud': '-63.18554273017388', 'grupo': '1', 'estado': '1' },
			{ 'codigo': 9, 'empresa': 'servisofts', 'descripcion': 'b', 'fecha': '14/01/2022', 'hora': '0:18:00', 'latitud': '-17.783335576753103', 'longitud': '-63.1849358155509', 'grupo': 'anillo 1', 'estado': '1' },
			{ 'codigo': 10, 'empresa': 'servisofts', 'descripcion': 'c', 'fecha': '15/01/2022', 'hora': '1:18:00', 'latitud': '-17.780287162122978', 'longitud': '-63.18185786356161', 'grupo': 'anillo 1', 'estado': '1' },
			{ 'codigo': 11, 'empresa': 'servisofts', 'descripcion': 'd', 'fecha': '16/01/2022', 'hora': '2:18:00', 'latitud': '-17.78089068004462', 'longitud': '-63.178863989391196', 'grupo': '2', 'estado': '1' },
			{ 'codigo': 12, 'empresa': 'servisofts', 'descripcion': 'f', 'fecha': '17/01/2022', 'hora': '3:18:00', 'latitud': '-17.785701824917552', 'longitud': '-63.18024472015847', 'grupo': 'anillo 1', 'estado': '1' },
			{ 'codigo': 13, 'empresa': 'servisofts', 'descripcion': 'g', 'fecha': '18/01/2022', 'hora': '4:18:00', 'latitud': '-17.784358184886056', 'longitud': '-63.182535822860196', 'grupo': '3', 'estado': '1' },
			{ 'codigo': 14, 'empresa': 'servisofts', 'descripcion': 'y', 'fecha': '19/01/2022', 'hora': '5:18:00', 'latitud': '-17.775725966748137', 'longitud': '-63.19019177230439', 'grupo': 'anillo 1', 'estado': '1' },
			{ 'codigo': 15, 'empresa': 'servisofts', 'descripcion': 'doña juana', 'fecha': '20/01/2022', 'hora': '6:18:00', 'latitud': '-17.772841669303233', 'longitud': '-63.18671500247983', 'grupo': 'anillo 1', 'estado': '0' },
			{ 'codigo': 16, 'empresa': 'servisofts', 'descripcion': 'Maria lopez', 'fecha': '21/01/2022', 'hora': '7:18:00', 'latitud': '-17.7720379662059 ', 'longitud': '-63.18236556971132', 'grupo': '4', 'estado': '1' },
			{ 'codigo': 17, 'empresa': 'servisofts', 'descripcion': 'Sra. sandra ', 'fecha': '22/01/2022', 'hora': '8:18:00', 'latitud': '-17.772160957624944', 'longitud': '-63.17831499339745', 'grupo': 'anillo 1', 'estado': '1' },
			{ 'codigo': 18, 'empresa': 'servisofts', 'descripcion': 'Don marcelo', 'fecha': '23/01/2022', 'hora': '9:18:00', 'latitud': '-17.774245506628485', 'longitud': '-63.17532689956337', 'grupo': 'anillo 1', 'estado': '1' },
			{ 'codigo': 19, 'empresa': 'servisofts', 'descripcion': 'Casa roja ', 'fecha': '24/01/2022', 'hora': '10:18:00', 'latitud': '-17.774918865813515', 'longitud': '-63.16792261094122', 'grupo': 'anillo 1', 'estado': '1' },
			{ 'codigo': 20, 'empresa': 'servisofts', 'descripcion': 'costa azul', 'fecha': '05/01/2022', 'hora': '11:18:00', 'latitud': '-17.77873324492316', 'longitud': '-63.168984711531415', 'grupo': 'anillo 1', 'estado': '1' },
			{ 'codigo': 21, 'empresa': 'servisofts', 'descripcion': 'don marcos', 'fecha': '06/01/2022', 'hora': '16:18:00', 'latitud': '-17.785924506964655', 'longitud': '-63.16860025957565', 'grupo': 'anillo 2', 'estado': '1' },
			{ 'codigo': 22, 'empresa': 'servisofts', 'descripcion': 'a', 'fecha': '07/01/2022', 'hora': '17:18:00', 'latitud': '-17.795512295458874', 'longitud': '-63.174393943219016', 'grupo': 'anillo 2', 'estado': '1' },
			{ 'codigo': 23, 'empresa': 'servisofts', 'descripcion': 'b', 'fecha': '08/01/2022', 'hora': '18:18:00', 'latitud': '-17.797893472519387', 'longitud': '-63.18487114615332', 'grupo': 'anillo 2', 'estado': '1' },
			{ 'codigo': 24, 'empresa': 'servisofts', 'descripcion': 'c', 'fecha': '09/01/2022', 'hora': '19:18:00', 'latitud': '-17.796866643724535', 'longitud': '-63.18946406495324', 'grupo': '3', 'estado': '1' }];

		return datos.map((obj, i) => {

			if (obj.grupo != this.key) return;

			return <SView key={"itmDirection" + i}>
				<SView col={"xs-12"} height={70} row center border={"transparent"} onPress={() => {
					// this.props.dispatch({ component: "direccion_usuario", type: "editarMiDireccion", data: obj });
					// SNavigation.goBack()
				}} >
					<SView col={"xs-2"} height center backgroundColor={"transparent"}      >
						<SView height={36} width={36} style={{ backgroundColor: '#E9EAEE', borderRadius: 50, }} center   >
							<SIcon name={'Marker'} height={24} width={40} fill={'#484848'} />
						</SView>
					</SView>

					<SView col={"xs-10"} height row style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray, justifyContent: 'center', }}  >
						<SView flex row center style={{ justifyContent: 'flex-start', }}  >
							<SText col={"xs-12"} height={20} backgroundColor={"transparent"} fontSize={15} font={"Roboto"} color={STheme.color.primary} >{obj.descripcion}</SText>
							<SView col={"xs-12"} height={40} row backgroundColor={"transparent"} style={{ overflow: 'hidden', }}   >
								<SText col={"xs-12"} fontSize={12} font={"Roboto"} color={STheme.color.gray} >{obj.latitud + " " + obj.longitud}</SText>
								{/* <SText col={"xs-12"} fontSize={12} font={"Roboto"} color={STheme.color.gray} >{obj.direccion}</SText> */}
							</SView>
						</SView>
						<SView width={36} height center backgroundColor={"transparent"} onPress={() => {
							// Parent.Actions.eliminar(obj, this.props);
						}} >
							<SView height={36} width={36} center   >
								<SIcon name={'DeleteDir'} height={20} width={40} fill={'#484848'} />
							</SView>
						</SView>
					</SView>

				</SView>
				<SHr height={10} />
			</SView>

		})
	}
	getDirecciones() {
		var data = ubicacion.Actions.getAll(this.props);
		if (!data) return <SLoad />

		return Object.keys(data).map((key) => {
			var obj = data[key];
			if (obj.key_grupo != this.key) return;
			if (obj.estado != 1) return;

			return <SView key={"itmDirection" + key}>
				<SView col={"xs-12"} height={70} row center border={"transparent"} onPress={() => {

				}} >
					<SView col={"xs-2"} height center backgroundColor={"transparent"}      >
						<SView height={36} width={36} style={{ backgroundColor: '#E9EAEE', borderRadius: 50, }} center   >
							<SIcon name={'Marker'} height={24} width={40} fill={'#484848'} />
						</SView>
					</SView>

					<SView col={"xs-10"} height row style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray, justifyContent: 'center', }}  >
						<SView flex row center style={{ justifyContent: 'flex-start', }}  >
							<SText col={"xs-12"} height={20} backgroundColor={"transparent"} fontSize={15} font={"Roboto"} color={STheme.color.primary} >{obj.descripcion_ubicacion}</SText>
							<SView col={"xs-12"} height={40} row backgroundColor={"transparent"} style={{ overflow: 'hidden', }}   >
								<SText col={"xs-12"} fontSize={12} font={"Roboto"} color={STheme.color.gray} >{obj.direccion_ubicacion}</SText>
								<SText col={"xs-12"} fontSize={12} font={"Roboto"} color={STheme.color.gray} >{obj.latitud + " " + obj.longitud}</SText>
							</SView>
						</SView>
						<SView width={36} height center backgroundColor={"transparent"} onPress={() => {
						}} >
							<SView height={36} width={36} center onPress={() => { SPopup.confirm({ title: "Eliminar", message: "¿Esta seguro de eliminar?", onPress: () => { ubicacion.Actions.eliminar(obj, this.props) } }) }} >
								<SIcon name={'DeleteDir'} height={20} width={40} fill={'#484848'} />
							</SView>
							<SView height={36} width={36} center  onPress={() => {
							SNavigation.navigate('ubicacion/registro', { key_edit: obj.key })
						 }} >
							<SIcon name={'Edit'} height={20} width={40} fill={'#484848'} />
						</SView>
						</SView>
					</SView>

				</SView>
				<SHr height={10} />
			</SView>
		})
	}


	render() {
		return (<>
			<SPage title={'Mis Direcciones' + this.key} disableScroll center>

				<SView col={"xs-11 sm-10 md-8 lg-4 xl-4"} flex >
					<SHr height={20} />

					<SView col={"xs-12"} center>
						<SInput col={"xs-12"} placeholder={"Escribir el nombre de la direccion..."}
							style={{ borderWidth: 0, height: "100%" }}
							color={STheme.color.text} placeholderTextColor={STheme.color.gray} height={40} fontSize={12}
							onChangeText={(text) => { this.setState({ find: text }) }} />
					</SView>

					<SHr height={10} />
					<SView col={"xs-12"} flex>
						<SScrollView2 disableHorizontal>
							{this.getDirecciones()}
						</SScrollView2>
					</SView>
					<SHr height={10} />

				</SView >
			</ SPage >
			<FloatButtomTap onPress={() => {
				SNavigation.navigate('ubicacion/registro', { key: this.key })


			}} />
		</>
		);
	}
}
const initStates = (state) => {
	return { state }
};
export default connect(initStates)(lista);