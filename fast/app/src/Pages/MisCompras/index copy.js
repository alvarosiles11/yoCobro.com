import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SImage, SLoad, SNavigation, SPage, SSection, SText, STheme, SView } from 'servisofts-component';
import pedido from '../../Services/Tapeke/Components/pedido';
import SSocket from 'servisofts-socket';
import restaurante from '../../Services/Tapeke/Components/restaurante';

class index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			keyRestaurante: '9b8f27e9-696d-446f-ae9b-5d6d5bf1ab24',
		};
	}

	getLista() {
		var data = pedido.Actions.getAll(this.props);
		if (!data) return <SLoad />
		var arr = Object.values(data).filter(itm => itm.key_usuario == this.props.state.usuarioReducer.usuarioLog.key);
		return <SText>{JSON.stringify(arr, "\n", "\t")}</SText>
	}


	getCompras() {
		var data = pedido.Actions.getAll(this.props);
		if (!data) return <SLoad />
		// alert(keyRestaurante);

		var dataRestaurante = restaurante.Actions.getByKey(this.state.keyRestaurante, this.props);
		if (!dataRestaurante) return <SLoad />

		const key_usuario = this.props.state.usuarioReducer.usuarioLog.key;
		var arr = Object.values(data).filter(itm => itm.key_usuario == this.props.state.usuarioReducer.usuarioLog.key && itm.state != "pendiente_pago");

		if (arr.length <= 0) {
			//SNavigation.navigate("/")
			return <SText style={{ fontSize: 15 }}>No hay compras.</SText>
		}
		return arr.map((obj, key) => {
			return <SSection key={"m_compra"+key}>
				<SView col={"xs-12 "} height={90} row border={STheme.color.card} style={{ borderRadius: 8, }}   >
					<SView col={"xs-2"} center   >
						<SView height={40} width={40} style={{ backgroundColor: '#E9EAEE', borderRadius: 50, }} center   >
							<SImage src={`${SSocket.api.root}restaurante/${this.state.keyRestaurante}`} style={{ borderRadius: 8, resizeMode: 'cover' }} />
						</SView>
					</SView>
					<SView col={"xs-10"} row center  >
						<SView col={"xs-10"} height={40} style={{ justifyContent: 'center', }}  >
							{/* <SText fontSize={15} font={"Roboto"} color={STheme.color.text} >{obj['descripcion']}</SText> */}
							<SText fontSize={16} font={"Roboto"} color={STheme.color.text} >{dataRestaurante['nombre']}</SText>
							<SHr height={5} />
							{/* <SText fontSize={12} font={"Roboto"} color={STheme.color.gray} >{obj['direccion']}</SText> */}
							<SText fontSize={12} font={"Roboto"} color={STheme.color.gray} >{new SDate(obj['fecha_on']).toString("dd-MM-yyyy hh:mm")} - {obj['state']} </SText>
						</SView>
						<SView col={"xs-2"} height={40} style={{ alignContent: 'center', }}>
							<SView height={36} width={36} center   >
								<SText fontSize={18} font={"Roboto"} color={STheme.color.gray} >x{obj['cantidad']}</SText>
							</SView>
						</SView>
					</SView>
					<SView col={"xs-12"} row   >

						<SView col={"xs-6"} center onPress={() => { SNavigation.navigate('comoteparecio') }}   >
							<SText width={120} height={20} style={{ backgroundColor: '#EEEEEE', borderRadius: 4, fontSize: 14, alignItems: 'center', }} center >Opinar</SText>
						</SView>
						<SView col={"xs-6"} center>
							<SText width={120} height={20} style={{ backgroundColor: '#EEEEEE', borderRadius: 4, fontSize: 14, alignItems: 'center', }} center>Repetir </SText>
						</SView>
					</SView>
				</SView>
				<SHr height={10} />
			</SSection>

		})
	}

	render() {
		return (

			<SPage title={'MisCompras'}>
				<SView col={"xs-12  "} row center >

					{/* <SView col={"xs-10 sm-6 lg-3 "}  > */}
					<SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} >
						<SHr height={20} />

						{/* {this.getLista()} */}
						{this.getCompras()}

						<SHr height={20} />

					</SView>

				</SView>

			</SPage>
		);
	}
}
const initStates = (state) => {
	return { state }
};
export default connect(initStates)(index);