import { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SList, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import FloatButtomTap from '../../../../../Components/FloatButtomTap';

const datos = [
	{ 'codigo': 1, 'descripcion': 'Anillo 10', 'estado': '1' },
	{ 'codigo': 2, 'descripcion': 'Anillo 1', 'estado': '1' },
	{ 'codigo': 3, 'descripcion': 'Anillo 2', 'estado': '1' },
	{ 'codigo': 4, 'descripcion': 'Anillo 3', 'estado': '0' }
];



class TestListaGrupos extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};

	}


	getCompras() {
		// const key_usuario = this.props.state.usuarioReducer.usuarioLog.key;
		// var dataPedido = pedido.Actions.getPedidoByKeyUsuarioDetalle(this.props.state.usuarioReducer.usuarioLog.key, this.props)
		// if (!dataPedido) return <SLoad />
		// var arr = dataPedido.filter((item) => item.estado == '1' && item.key_usuario == key_usuario && item.state != "pendiente_pago" && item.state != "timeout_pago")
		// if (arr.length == 0) return this.sinCompras();
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
											}} center onPress={() => { SNavigation.navigate('testUbicacion', { key: obj.codigo }) }}>
												<SText font={"Roboto"} fontSize={12} color={"#666"}>Lista</SText>
											</SView>
										</SView>
										<SView col={"xs-6"} center>
											<SView width={120} height={24} style={{ backgroundColor: '#E75248', borderRadius: 8 }} center onPress={() => {
												SNavigation.navigate('testMapa', { key: obj.codigo })
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


	render() {
		return (<>
			<SPage title={'Mis Grupos'} onRefresh={() => { // pedido.Actions.refresh(this.props);
			}}> {this.getCompras()}
			</SPage>
			<FloatButtomTap onPress={() => { SNavigation.navigate("testRegistroGrupo"); }} />
		</>

		);
	}
}
const initStates = (state) => {
	return { state }
};
export default connect(initStates)(TestListaGrupos);