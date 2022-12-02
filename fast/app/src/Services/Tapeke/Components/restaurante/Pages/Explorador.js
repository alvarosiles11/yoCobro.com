import React from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SLoad, SNavigation, SPage, SPopup, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import BarraSuperiorTapeke from '../../../../../Components/BarraSuperiorTapeke';
import Direccion from '../../../../../Components/BarraSuperiorTapeke/Direccion';
import PBarraFooter from '../../../../../Components/PBarraFooter';
import Item2 from '../Components/Item2';
import Parent from '../index'
import favorito from '../../favorito';
import BarraFiltros from '../../filtros/Components/BarraFiltros';
import filtros from '../../filtros';
import general from '../../general';
class Explorador extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.key = SNavigation.getParam("keyUsuario");
    }





    getBotonos() {
        return <>
            <SView col={"xs-10 md-5 lg-4 xl-3"} row center height={40}  >
                <SView col={"xs-6"} center height={40} backgroundColor={STheme.color.primary} style={{
                    borderRadius: 4,
                }}>
                    <SText fontSize={20} font={"Roboto"} bold color={STheme.color.white}>Lista</SText>
                </SView>
                <SView col={"xs-6"} center height={40} border={STheme.color.primary} backgroundColor={STheme.color.white}
                    onPress={() => { SNavigation.navigate("mapa"); }} style={{
                        borderRadius: 4,
                    }}>
                    <SText fontSize={20} font={"Roboto"} bold color={STheme.color.primary}>Mapa</SText>
                </SView>
            </SView>
        </>
    }

    getRestaurante() {
        var filtro = filtros.Actions.getFiltrosActivos(this.props);
        var data = Parent.Actions.getAllFilter(filtro, this.props);
        var data_favoritos = favorito.Actions.getByKeyUsuario(this.props.state.usuarioReducer.usuarioLog.key, this.props);
        if (!data) return <SLoad />;
        if (!filtro) return <SLoad />;
        if (!data_favoritos) return <SLoad />;
        // var listaKeys = Object.keys(data);
        return data.map((obj) => {
            return <SView key={obj.key} col={"xs-10 md-5 lg-4 xl-3"} border={'transparent'} >
                <Item2 data={obj} ></Item2>
                <SHr />
                <SHr />
            </SView>
        })
    }

    showLista() {
        return <>
            <SScrollView2 disableHorizontal={true} border={'transparent'} >
                <SView col={"xs-12 "} center border={'transparent'} >
                    {this.getRestaurante()}
                </SView >

            </SScrollView2>
        </>
    }



    getContent() {
        var generalTime = general.Actions.getAllComponents(this.props);
        if (!generalTime) return <SLoad />
        return <SView flex center col={"xs-12"}>
            <BarraFiltros />
            {this.getBotonos()}
            <SView height={20} />
            {this.showLista()}
        </SView>
    }
    render() {

        return (
            <>
                <BarraSuperiorTapeke>
                    <Direccion />
                </BarraSuperiorTapeke>
                <SPage title={''} hidden center onRefresh={() => {
                    general.Actions.getAllComponents(this.props, true);
                }} >
                    {this.getContent()}
                </SPage>
                <PBarraFooter url={"explorar"} />
            </>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Explorador);