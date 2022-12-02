import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SImage, SLoad, SNavigation, SPage, SSection, SText, STheme, SView, SList } from 'servisofts-component';
import pedido from '../../Services/Tapeke/Components/pedido';
import SSocket from 'servisofts-socket';
import BarraCargando from '../../Components/BarraCargando';
import PButtom from '../../Components/PButtom';

class index extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	getBotones(obj) {
		var OPINAR = (
			<SView col={"xs-6"} center onPress={() => { SNavigation.navigate('calificacion', { key_pedido: obj.key }) }}   >
				<SView width={120} height={24} style={{ backgroundColor: '#EEEEEE', borderRadius: 4 }} center>
					<SText font={"Roboto"} fontSize={12} color={"#666"}>Opinar</SText>
				</SView>
			</SView>
		)
		var REPETIR = (
			<SView col={"xs-6"} center>
				<SView width={120} height={24} style={{ backgroundColor: '#EEEEEE', borderRadius: 4 }} center onPress={() => {
					SNavigation.navigate('restaurante/perfil', { key: obj?.restaurante?.key })
				}}>
					<SText font={"Roboto"} fontSize={12} color={"#666"}>Repetir</SText>
				</SView>
			</SView>
		)

		if (obj.state == "pagado") return <BarraCargando />
		if (obj.state == "no_recogido") {
			OPINAR = <SView col={"xs-6"} />
		}

		return (<SView col={"xs-12"} row   >
			{OPINAR}
			{REPETIR}
		</SView>);
	}

	sinCompras() {
		return <>
			{/* <SPage title={'Mis Compras'} disableScroll center> */}
			<SView col={"xs-12"} row center >
				<SView col={"xs-11 sm-6 md-6 lg-4 xl-4"} >
					<SView col={"xs-12"} center row  >
						<SView col={"xs-12"} row center   >
							<SView col={"xs-11"} border={'transparent'}  >
								<SHr height={20} />
								<SText fontSize={24} color={STheme.color.primary} font={"Roboto"} bold center>Usted no realizó compras</SText>
								<SHr height={20} />
								<SText fontSize={18} color={STheme.color.text} bold center font={"Roboto"} >No tiene compras realizadas en este momento.</SText>
							</SView>
						</SView>
						<SView col={"xs-11"} center  >
							<SHr height={30} />
							<SView center col={"xs-12"}   >
								<SIcon name="NoCompras" height={320}></SIcon >
							</SView>
						</SView>
						<SHr height={50} />
						<SView col={"xs-12"} row center>
							<PButtom fontSize={20} onPress={() => {
								SNavigation.navigate("/");
							}}>COMPRAR</PButtom>
						</SView>
						<SHr height={30} />
					</SView>
				</SView>
			</SView>
			{/* </SPage> */}
		</>
	}

	getCompras() {
		const key_usuario = this.props.state.usuarioReducer.usuarioLog.key;
		var dataPedido = pedido.Actions.getPedidoByKeyUsuarioDetalle(this.props.state.usuarioReducer.usuarioLog.key, this.props)
		if (!dataPedido) return <SLoad />
		var arr = dataPedido.filter((item) => item.estado == '1' && item.key_usuario == key_usuario && item.state != "pendiente_pago" && item.state != "timeout_pago")
		if (arr.length == 0) return this.sinCompras();
		return <>

			<SView col={"xs-12"} row center >
				<SView col={"xs-11 sm-6 md-6 lg-4 xl-4"} >
					<SList
						data={arr}
						space={16}
						order={[{ key: "fecha", order: "desc", peso: 1 }]}
						render={(obj, key) => {
							// console.log("resta ", obj.state);
							return <SView col={"xs-12 "} height={120} row center border={STheme.color.card} style={{ borderRadius: 8, }}
								onPress={() => {
									if (obj.state == "pagado") {
										// SNavigation.navigate("pedido/confirmacion", { key_pedido: obj.key });
										if (obj.delivery == 0) {
											SNavigation.navigate("pedido/usuario/pagado", { key_pedido: obj.key })
										}
										if (obj.delivery != 0) {
											SNavigation.navigate("pedido/delivery/pagado", { key_pedido: obj.key })
										}
									}
									if (obj.state == "no_recogido") {
										SNavigation.navigate("pedido/noRecogido", { key_pedido: obj.key });
									}
								}} >
								<SView col={"xs-12"} row center border={"transparent"}  >
									<SView col={"xs-2"} center border={"transparent"}  >
										<SView height={40} width={40} style={{ backgroundColor: '#E9EAEE', borderRadius: 50, }} center   >
											<SImage src={`${SSocket.api.root}restaurante/${obj?.restaurante?.key}`} style={{ borderRadius: 8, resizeMode: 'cover' }} />
										</SView>
									</SView>
									<SView col={"xs-8"} border={"transparent"} style={{}} >
										<SText fontSize={16} font={"Roboto"} color={STheme.color.text} >{obj?.restaurante?.nombre}</SText>
										<SText fontSize={12} font={"Roboto"} color={STheme.color.text} >{new SDate(obj.fecha, "yyyy-MM-dd").toString("dd de MONTH")}  {obj.horario.hora_inicio} - {obj.horario.hora_fin}</SText>
										<SView height={8} />
										<SText fontSize={12} font={"Roboto"} color={STheme.color.primary} bold >{pedido.Actions.getDetalleEstado(obj)}</SText>
									</SView>
									<SView col={"xs-2"} height={40} row center style={{ alignContent: 'center', }}>
										<SText fontSize={18} font={"Roboto"} color={STheme.color.gray} >x {obj?.cantidad}</SText>
									</SView>
								</SView>
								<SView col={"xs-12"} center>
									<SView col={"xs-11"} row center border={"transparent"}>
										{this.getBotones(obj)}
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
			// <SPage title={'Mis Compras'}>
			// 	<SView col={"xs-12"} row center >
			// 		<SView col={"xs-11 sm-6 md-6 lg-4 xl-4"} >
			<SPage title={'Mis Compras'} onRefresh={() => {
				console.log("refrescando");
				pedido.Actions.refresh(this.props);
			}}>
				{this.getCompras()}
			</SPage>
			// 	</SView>
			// </SPage>
		);
	}
}
const initStates = (state) => {
	return { state }
};
export default connect(initStates)(index);