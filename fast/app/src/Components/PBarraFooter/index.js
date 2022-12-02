import React, { Component } from 'react';

import { SView, SText, STheme, SGradient, SIcon, SNavigation } from 'servisofts-component'

export default class PBarraFooter extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	getItem({ key, title, icon, url, params }) {
		var color = "#ffffff";
		var isSelect = (key == this.props.url)
		return <SView flex center height onPress={() => {
			SNavigation.navigate(url, params);
		}} >
			<SView style={{
				borderRadius: 16,
				backgroundColor: (isSelect ? "#ffffff44" : ""),
				width: 55,
				height: 45,
			}} center>
				<SView height={23} colSquare center >
					<SIcon name={icon} />
				</SView>
				<SView height={2} />
				<SText font={"Arial"} fontSize={8} center color={color}  >{title}</SText>
			</SView>
		</SView>
	}
	render() {
		return (
			<SView col={"xs-12"} height={50} border={'transparent'} style={{ backgroundColor: STheme.color.primary }}
			// style={{ position: 'absolute', bottom: 0, backgroundColor: STheme.color.primary, overflow: 'hidden' }}	
			>
				<SView col={'xs-12'} row height >
					{this.getItem({ key: "/", title: 'Descrubir', icon: 'MenuLocation', url: '/' })}
					{this.getItem({ key: "explorar", title: 'Explorar', icon: 'MenuExplorar', url: 'explorar' })}
					{this.getItem({ key: "favorito", title: 'Favoritos', icon: 'MenuFavoritos', url: 'favorito' })}
				</SView>
			</SView >
		);
	}
}
