import { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SList, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';

const datos=[
	{'codigo': 1,'descripcion':'anillo 10','estado':'1'},
	{'codigo': 2,'descripcion':'anillo 1','estado':'1'},
	{'codigo': 3,'descripcion':'anillo 2','estado':'1'},
	{'codigo': 4,'descripcion':'anillo 3','estado':'0'}
];
	


class TestListaGrupos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getBotones(obj) {
		var OPINAR = (
			<SView col={"xs-6"} center onPress={() => { SNavigation.navigate('calificacion', { key_pedido: obj.codigo }) }}   >
				<SView width={120} height={24} style={{ backgroundColor: '#EEEEEE', borderRadius: 4 }} center>
					<SText font={"Roboto"} fontSize={12} color={"#666"}>Opinar {obj.codigo}  </SText>
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
						order={[{ key: "fecha", order: "desc", peso: 1 }]}
						render={(obj, key) => {
							// console.log("resta ", obj.state);
							return <SView col={"xs-12 "} height={120} row center border={STheme.color.card} style={{ borderRadius: 8, }}
								// onPress={() => {
								// 	if (obj.state == "pagado") {
								// 		SNavigation.navigate("pedido/confirmacion", { key_pedido: obj.key });
								// 		if (obj.delivery == 0) {
								// 			SNavigation.navigate("pedido/usuario/pagado", { key_pedido: obj.key })
								// 		}
								// 		if (obj.delivery != 0) {
								// 			SNavigation.navigate("pedido/delivery/pagado", { key_pedido: obj.key })
								// 		}
								// 	}
								// 	if (obj.state == "no_recogido") {
								// 		SNavigation.navigate("pedido/noRecogido", { key_pedido: obj.key });
								// 	}
								// }}
                                
                                >
								<SView col={"xs-12"} row center border={"transparent"}  >
									<SView col={"xs-2"} center border={"transparent"}  >
										<SView height={40} width={40} style={{ backgroundColor: '#E9EAEE', borderRadius: 50, }} center   >
 											{/* <SImage src={`${SSocket.api.root}restaurante/${obj?.restaurante?.key}`} style={{ borderRadius: 8, resizeMode: 'cover' }} /> */}
										</SView>
									</SView>
									<SView col={"xs-8"} border={"transparent"} style={{}} >
										<SText fontSize={16} font={"Roboto"} color={STheme.color.text} >{obj?.codigo}</SText>
										{/* <SText fontSize={16} font={"Roboto"} color={STheme.color.text} >{obj?.restaurante?.nombre}</SText> */}
										<SText fontSize={12} font={"Roboto"} color={STheme.color.text} >{new SDate(obj.fecha, "yyyy-MM-dd").toString("dd de MONTH")}  </SText>
										<SView height={8} />
										{/* <SText fontSize={12} font={"Roboto"} color={STheme.color.primary} bold >{pedido.Actions.getDetalleEstado(obj)}</SText> */}
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
 
			<SPage title={'Mis Compras'} onRefresh={() => {
				console.log("refrescando");
				// pedido.Actions.refresh(this.props);
			}}>
				{this.getCompras()}
			</SPage>
	 
		);
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(TestListaGrupos);