import React, { Component } from 'react';

import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import {
	SGradient, SHr, SIcon, SImage, SLoad, SPage, SScrollView2, SText, STheme, SView, SNavigation, SInput, SForm, SButtom
} from 'servisofts-component';
import Item2 from '../../restaurante/Components/Item2';
import PBarraFooter from '../../../../../Components/PBarraFooter';
import BarraSuperiorFiltro from '../../../../../Components/BarraSuperiorFiltro';
import PButtom from '../../../../../Components/PButtom';

import Parent from '..';

class Filtros extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.key = SNavigation.getParam("keyUsuario");

	}

	createFilter(values) {
		var nombre = {
			active: values.nombre ? true : false,
			key: "nombre",
			label: "Nombre: " + values.nombre,
			value: values.nombre,
			validate: (obj, filter) => {
				if (!filter.value) return true;
				if (obj.nombre.toLowerCase().indexOf(filter.value.toLowerCase()) > -1) return true;
				return false;
			}
		}
		var pack = {
			active: values.pack,
			key: "sinPack",
			label: "Ocultar sin Packs",
			value: values.pack,
			validate: (obj,filter) => {
				return !!obj?.pack?.disponibles
			}
		}
		var horario = {
			active: !!values.horario,
			key: "horario",
			label: "Hora: " + values.horario,
			value: values.horario,
			validate: (obj,filter) => {
				if(obj.horario.hora_inicio.indexOf(filter.value) > -1) return true;
				return false
			}
		}
		Parent.Actions.setCustom({
			nombre,
			pack,
			horario
		}, this.props);
	}

	getHoraOptions() {
		return [
			{ key: "", content: "Todo el dia" },
			{ key: "00", content: "12 am." },
			{ key: "01", content: "1 am." },
			{ key: "02", content: "2 am." },
			{ key: "03", content: "3 am." },
			{ key: "04", content: "4 am." },
			{ key: "05", content: "5 am." },
			{ key: "06", content: "6 am." },
			{ key: "07", content: "7 am." },
			{ key: "08", content: "8 am." },
			{ key: "09", content: "9 am." },
			{ key: "10", content: "10 am." },
			{ key: "11", content: "11 am." },
			{ key: "12", content: "12 pm." },
			{ key: "13", content: "1 pm." },
			{ key: "14", content: "2 pm." },
			{ key: "15", content: "3 pm." },
			{ key: "16", content: "4 pm." },
			{ key: "17", content: "5 pm." },
			{ key: "18", content: "6 pm." },
			{ key: "19", content: "7 pm." },
			{ key: "20", content: "8 pm." },
			{ key: "21", content: "9 pm." },
			{ key: "22", content: "10 pm." },
			{ key: "23", content: "11 pm." },

		]
	}
	getContent() {
		this.data = Parent.Actions.getCustom(this.props);
		return <SForm
			ref={(form) => { this.form = form; }}
			col={"xs-11 sm-9 md-7 lg-5 xl-4"}
			inputs={{
				nombre: { label: "Nombre del establecimiento", placeholder: "Buscar", defaultValue: this.data?.nombre?.value },
				// categoria: { label: "Categoría", placeholder: "Todas", defaultValue: this.data?.categoria?.value },
				// preferencias: { label: "Preferencias alimenticias", placeholder: "Ninguna", defaultValue: this.data?.preferencias?.value },
				horario: { label: "Horario de recogida", type: "number", placeholder: "HH24 ( 17 )", defaultValue: this.data?.horario?.value?? "", type: "select", options: this.getHoraOptions() },
				// pack: { label: "Ocultar sin packs", placeholder: "No", defaultValue: this.data?.pack?.value ?? "", type: "select", options: [{ key: "", content: "NO" }, { key: "true", content: "SI" }] },
			}}
			// onSubmitName={"APLICAR"}
			onSubmit={(values) => {
				this.createFilter(values);
				SNavigation.goBack();
			}}
		/>
	}

	render() {
		return (

			<SPage title={'Mis Favoritos'} hidden disableScroll>

				<BarraSuperiorFiltro clearAlvaro={() => { this.form.clear() }}  >
					<SText font={"Roboto"} fontSize={20} color={"#fff"}>Filtros</SText>
				</BarraSuperiorFiltro>



				{/* <PButtom onPress={() => { this.form.clear() }} >{("Limpiar")}</PButtom> */}


				<SScrollView2 disableHorizontal={true}>
					<SView center col={"xs-12"} row>
						<SHr height={10} />
						{this.getContent()}
						<SHr height={20} />
						<PButtom
							props={{
								type: "outline"
							}}
							onPress={() => { this.form.submit() }}
						>{("APLICAR")}</PButtom>
						<SHr height={30} />
					</SView>
				</SScrollView2>

				<SHr height={50} />
				<PBarraFooter />

			</ SPage >
		);
	}
}
const initStates = (state) => {
	return { state }
};
export default connect(initStates)(Filtros);