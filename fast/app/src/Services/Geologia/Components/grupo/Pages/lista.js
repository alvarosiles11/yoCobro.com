import { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SList, SLoad, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import grupo from '..';
import FloatButtomTap from '../../../../../Components/FloatButtomTap';




class lista extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};

	}

	getGrupos() {
		const data = grupo.Actions.getAll(this.props);
		if (!data) return <SLoad />
		return <>
			<SView col={"xs-12"} row center >
				<SView col={"xs-11 sm-6 md-6 lg-4 xl-4"} >
				<SHr height={24} />

					<SList
						data={data}
						space={16}
						order={[{ key: "fecha", order: "desc"}]}
						render={(obj, key) => {
							if (obj.estado == "0") return;
							// if (obj.estado_grupo == "0") return;
							return <SView col={"xs-12 "} height={100} row center border={STheme.color.card} style={{ borderRadius: 8, }}>
								<SView col={"xs-12"} row center border={"transparent"}  >
									<SView col={"xs-2"} center border={"transparent"}  >
										<SView height={40} width={40} style={{ backgroundColor: '#E9EAEE', borderRadius: 50, }} center   >
											<SIcon name={'IconTienda'} height={24} width={40} fill={'#E75248'} />
										</SView>
									</SView>
									<SView col={"xs-8"} border={"transparent"} style={{}} >
										<SText fontSize={16} font={"Roboto"} color={STheme.color.text} bold >Grupo: {obj?.nombre_grupo}</SText>
										<SHr height={4} />
										<SText fontSize={12} font={"Roboto"} color={STheme.color.text} >empresa: {obj?.empresa}  </SText>
									</SView>
									<SView col={"xs-2"} center border={"transparent"}  >




										<SView height={40} width={40}  center onPress={() => {
											SPopup.confirm({ title: "Eliminar", message: "¿Esta seguro de eliminar?", onPress: () => { grupo.Actions.eliminar(obj, this.props) } }) }} >
											<SIcon name={'Delete'} height={24} width={40} fill={'#E75248'} />
										</SView>
										<SView height={40} width={40}  center onPress={() => { SNavigation.navigate('grupo/registro', { key: obj.key }) }} >
											<SIcon name={'Edit'} height={24} width={40} fill={'#E75248'} />
										</SView>
									</SView>

									<SHr height={8} />
									<SView col={"xs-11"} row>
										<SView col={"xs-6"} center    >
											<SView width={120} height={24} style={{
												backgroundColor: '#EEEEEE', borderRadius: 8,
												borderColor: "red", borderWidth: 1.5
											}} center onPress={() => { SNavigation.navigate('ubicacion/lista', { key: obj.key }) }}>
												<SText font={"Roboto"} fontSize={12} color={"#666"}>Lista</SText>
											</SView>
										</SView>
										<SView col={"xs-6"} center>
											<SView width={120} height={24} style={{ backgroundColor: '#E75248', borderRadius: 8 }} center onPress={() => {
												SNavigation.navigate('grupo/grafico', { key: obj.key })
											}}>
												<SText font={"Roboto"} fontSize={12} color={"#ffff"}>Mapa</SText>
											</SView>
										</SView>
									</SView>
								</SView>
							</SView>
						}} />
				</SView>
			</SView>
		</>
	}

	example() {
		 const datos = [
			{ 'codigo': 1, 'descripcion': 'Anillo 10', 'estado': '1' },
			{ 'codigo': 2, 'descripcion': 'Anillo 1', 'estado': '1' },
			{ 'codigo': 3, 'descripcion': 'Anillo 2', 'estado': '1' },
			{ 'codigo': 4, 'descripcion': 'Anillo 3', 'estado': '0' }
		];
		return <>
			<SView col={"xs-12"} row center >
				<SView col={"xs-11 sm-6 md-6 lg-4 xl-4"} >
					<SList
						data={datos}
						space={16}
						order={[{ key: "codigo", order: "desc", estado: "0" }]}
						render={(obj, key) => {

							if (obj.estado == "0") return;

							return <SView col={"xs-12 "} height={100} row center border={STheme.color.card} style={{ borderRadius: 8, }}>
								<SView col={"xs-12"} row center border={"transparent"}  >
									<SView col={"xs-2"} center border={"transparent"}  >
										<SView height={40} width={40} style={{ backgroundColor: '#E9EAEE', borderRadius: 50, }} center   >
											<SIcon name={'IconTienda'} height={24} width={40} fill={'#E75248'} />
										</SView>
									</SView>
									<SView col={"xs-8"} border={"transparent"} style={{}} >
										<SText fontSize={16} font={"Roboto"} color={STheme.color.text} bold >Grupo {obj?.descripcion}</SText>
										<SHr height={4} />
										<SText fontSize={12} font={"Roboto"} color={STheme.color.text} >Descripción {obj?.descripcion}  </SText>
									</SView>
									<SHr height={8} />
									<SView col={"xs-11"} row>
										<SView col={"xs-6"} center    >
											<SView width={120} height={24} style={{
												backgroundColor: '#EEEEEE', borderRadius: 8,
												borderColor: "red", borderWidth: 1.5
											}} center onPress={() => { SNavigation.navigate('ubicacion/lista', { key: obj.key }) }}>
												<SText font={"Roboto"} fontSize={12} color={"#666"}>Lista</SText>
											</SView>
										</SView>
										<SView col={"xs-6"} center>
											<SView width={120} height={24} style={{ backgroundColor: '#E75248', borderRadius: 8 }} center 	onPress={() => { 	SNavigation.navigate('grupo/grafico', { key: 1 }) }}>
												<SText font={"Roboto"} fontSize={12} color={"#ffff"}>Mapa</SText>
											</SView>
										</SView>
									</SView>
								</SView>
							</SView>
						}} />
				</SView>
			</SView>
		</>
	}


	render() {
		return (
		<>
			<SPage title={'Mis Grupos'}  > {this.getGrupos()} 	</SPage>
			<FloatButtomTap onPress={() => { SNavigation.navigate("grupo/registro"); }} />
		</>
		);
	}
}
const initStates = (state) => {
	return { state }
};
export default connect(initStates)(lista);