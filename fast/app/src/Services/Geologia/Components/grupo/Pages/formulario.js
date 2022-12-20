import { Component } from "react";
import { connect } from "react-redux";
import {
	SButtom,
	SForm,
	SHr,
	SIcon,
	SNavigation,
	SPage,
	SView
} from "servisofts-component";
import grupo from "..";

class formulario extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.key = SNavigation.getParam("key");
	}

	getContent() {
		this.data = {};
		if (this.key) {
			this.data = grupo.Actions.getByKey(this.key, this.props);
			if (!this.data) return <SLoad />;
		}
		return (
			<SForm
				ref={form => {
					this.form = form;
				}}
				col={"xs-11 sm-9 md-7 lg-5 xl-4"}
				inputProps={{ customStyle: "Calistenia" }}
				inputs={{
					empresa: {
						defaultValue: this.data["empresa"],
						label: "empresa",
						isRequired: true,
						icon: <SIcon name={"InputUser"} width={40} height={30} />
					},
					nombre_grupo: {
						defaultValue: this.data["nombre_grupo"],
						label: "nombre",
						isRequired: true,
						icon: <SIcon name={"InputUser"} width={40} height={30} />
					}
				}}
				onSubmit={values => {
					if (this.key) {
						grupo.Actions.editar({ ...this.data, ...values }, this.props);
					} else {
						grupo.Actions.registro(values, this.props);
					}
				}}
			/>
		);
	}
	render() {
		var reducer = this.props.state[grupo.component + "Reducer"];
		if (reducer.type == "registro" || reducer.type == "editar") {
			if (reducer.estado == "exito") {
				reducer.estado = "";
				SNavigation.goBack();
			}
		}

		return (
			<SPage title={"Registro de grupo "} center>
				<SView height={30} />
				{this.getContent()}
				<SHr />
				<SButtom style={{ color: "#fff" }} props={{ type: "outline" }} onPress={() => { this.form.submit(); }} >
					{this.key ? "Editar" : "Registrar"}
				</SButtom>
			</SPage>
		);
	}
}
const initStates = state => {
	return { state };
};
export default connect(initStates)(formulario);
