import React, { Component } from 'react';

import { connect } from 'react-redux';
import {
	SGradient, SHr, SIcon, SImage, SLoad, SPage, SScrollView2, SText, STheme, SView, SNavigation, SInput,
} from 'servisofts-component';
import Item2 from '../../restaurante/Components/Item2';
import PBarraFooter from '../../../../../Components/PBarraFooter';
import BarraSuperiorTapeke from '../../../../../Components/BarraSuperiorTapeke';
import restaurante from '../../restaurante';
import PButtom3 from '../../../../../Components/PButtom3';

import Parent from ".."


class Favoritos extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.key = SNavigation.getParam("keyUsuario");

	}

	sinFavorito() {
		return <>
			<SView center col={"xs-11 sm-10 md-8 lg-6 xl-4"}  >
				<SView col={"xs-12"} center row style={{}}>
					<SView col={"xs-12"} row center   >
						<SView col={"xs-11"} border={'transparent'}  >
							<SHr height={20} />
							<SText fontSize={24} color={STheme.color.primary} font={"Roboto"} bold center> Usted no tiene Favoritos</SText>
							<SHr height={20} />
							<SText fontSize={18} color={STheme.color.text} bold center font={"Roboto"} >Guarda en Favorito tus restaurantes más visitados.</SText>
						</SView>
					</SView>
					<SView col={"xs-11"} center  >
						<SHr height={30} />
						<SView center col={"xs-12"}   >
							<SIcon name="SinFavorito" height={320}></SIcon >
						</SView>
					</SView>
					<SHr height={30} />
				</SView>
			</SView>
		</>
	}

	getRestaurante() {
		var data = restaurante.Actions.getAllFilter({}, this.props);
		var favUsuario = Parent.Actions.getByKeyUsuario(this.props.state.usuarioReducer.usuarioLog.key, this.props)
		if (!data) return <SLoad />;
		if (!favUsuario) return <SLoad />;
		var arr = Object.values(data).filter((itm) => favUsuario.find((elm) => elm.key_restaurante == itm.key))
		if (arr.length == 0) return this.sinFavorito();
		return arr.map((obj, index) => {
			return <SView key={"itmDav" + index} row col={"xs-10 md-5 lg-4 xl-3"} border={'transparent'} >
				<Item2 data={obj} ></Item2>
				<SHr />
				<SHr />
			</SView>
		})
	}


	render() {
		return (

			<SPage title={''} hidden disableScroll center>
				<BarraSuperiorTapeke  >
					<SText font={"Roboto"} fontSize={25} color={STheme.color.secondary}>Mis Favoritos</SText>
				</BarraSuperiorTapeke>
				<SScrollView2 disableHorizontal={true}>
					<SHr height={20} />
					<SView col={"xs-12"} height border={'transparent'} style={{ alignItems: 'center', }} >
						{this.getRestaurante()}
					</SView >
					<SHr height={20} />
				</SScrollView2>
				<PBarraFooter url={"favorito"} />
			</ SPage >
		);
	}
}
const initStates = (state) => {
	return { state }
};
export default connect(initStates)(Favoritos);