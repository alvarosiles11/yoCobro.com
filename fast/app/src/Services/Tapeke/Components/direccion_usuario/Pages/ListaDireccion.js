import React from 'react';
import { connect } from 'react-redux';
import { SIcon, SPage, SScrollView2, SText, STheme, SView, SMapView, SMarker, SInput, SNavigation, SHr, SLoad, SPopup, SLocation, SBuscador, } from 'servisofts-component';
import BarraSuperiorTapeke from '../../../../../Components/BarraSuperiorTapeke';
import PButtom from '../../../../../Components/PButtom';
import Parent from '../index'
import FloatButtomTap from '../../../../../Components/FloatButtomTap';

import locationGoogleReducer from '../locationGoogleReducer';

class Direccion extends React.Component {
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
	}

	getDirecciones() {
		var data = Parent.Actions.getAll(this.props);
		if (!data) return <SLoad />

		const key_usuario = this.props.state.usuarioReducer.usuarioLog.key;
		var arr = Object.values(data).filter(x => x.key_usuario == key_usuario && x.estado == 1);
		if (arr.length <= 0) {
			SNavigation.navigate("direccion_usuario")
			return <SText>No hay direcciones</SText>
		}
		return arr.map((obj, i) => {
			if (!SBuscador.validate(obj, this.state.find)) {
				return null;
			}

			return <SView key={"itmDirection" + i}>
				<SView col={"xs-12"} height={70} row center border={"transparent"} onPress={() => {
					this.props.dispatch({ component: "direccion_usuario", type: "editarMiDireccion", data: obj });
					SNavigation.goBack()
				}} >
					<SView col={"xs-2"} height center backgroundColor={"transparent"}      >
						<SView height={36} width={36} style={{ backgroundColor: '#E9EAEE', borderRadius: 50, }} center   >
							<SIcon name={'Marker'} height={24} width={40} fill={'#484848'} />
						</SView>
					</SView>

					<SView col={"xs-10"} height row style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray, justifyContent: 'center', }}  >
						<SView flex row center style={{ justifyContent: 'flex-start', }}  >
							<SText col={"xs-12r"} height={20} backgroundColor={"transparent"} fontSize={15} font={"Roboto"} color={STheme.color.primary} >{obj['descripcion']}</SText>
							<SView col={"xs-12"} height={40} row backgroundColor={"transparent"} style={{ overflow: 'hidden', }}   >
								<SText col={"xs-12"} fontSize={12} font={"Roboto"} color={STheme.color.gray} >{obj['direccion']}</SText>
							</SView>
						</SView>
						<SView width={36} height center backgroundColor={"transparent"} onPress={() => {
							Parent.Actions.eliminar(obj, this.props);
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


	render() {

		return (<>
			<SPage title={'Mis Direcciones'} disableScroll center>
				{/* <BarraSuperiorTapeke  >
					<SText font={"Roboto"} fontSize={25} color={STheme.color.secondary}>Mis Favoritos</SText>
				</BarraSuperiorTapeke> */}
				<SView col={"xs-11 sm-10 md-8 lg-4 xl-4"} flex >
					<SHr height={20} />

					<SView col={"xs-12"} center>
						<SInput col={"xs-12"} placeholder={"Escribir el nombre de la direccion..."}
							style={{ borderWidth: 0, height: "100%" }}
							color={STheme.color.text} placeholderTextColor={STheme.color.gray} height={40} fontSize={12}
							onChangeText={(text) => { this.setState({ find: text }) }} />
					</SView>
					{/* <SView SView col={"xs-12"}   style={{ position: "absolute", top: 60 }} border={"blue"} >
						<SText fontSize={14} font={"Roboto"} color={STheme.color.primary} bold>aqui {this.state.find} </SText>
					</SView> */}
					<SHr height={10} />
					<SView col={"xs-12"} flex>
						<SScrollView2 disableHorizontal>
							{this.getDirecciones()}
						</SScrollView2>
					</SView>
					<SHr height={10} />
					{/* <SView col={"xs-12"} row center height={40} border={'transparent'} onPress={() => { alert('alvaro') }}>
						<SView width={40} center>
							<SIcon name={'LocationTapeke'} height={14} width={14} fill={STheme.color.primary} />
						</SView>

						<SView onPress={() => {
							SLocation.getCurrentPosition().then((position) => {
								alert(JSON.stringify(position))
							}).catch((error) => {
								console.log(error);
							})
							// alert("datos quemado " + this.state.latitudeQuemado + " long " + this.state.longitudeQuemado); ç
							var data = {
								// descripcion: this.inpNombreUbicacion.getValue(),
								latitude: this.state.region?.latitudeQuemado,
								longitude: this.state.region?.longitudeQuemado,
								// direccion: this.state.nombre,
							}
							// Parent.Actions.registro(data, this.props)
							// this.map.center();
						}}>
							<SText fontSize={14} font={"Roboto"} color={STheme.color.primary} bold>Utilizar mi ubicación actual</SText>
						</SView>
					</SView> */}
				</SView >
			</ SPage >
			<FloatButtomTap onPress={() => {
				SNavigation.navigate("direccion_usuario");
				this.props.state.direccion_usuarioReducer.estado = 0;
			}} />
		</>
		);
	}
}
const initStates = (state) => {
	return { state }
};
export default connect(initStates)(Direccion);