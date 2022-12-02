import React, { Component } from "react";
import { connect } from "react-redux";
import { SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView } from "servisofts-component";
import SSocket from 'servisofts-socket';
import BarraSuperiorTapeke from "../Components/BarraSuperiorTapeke";
import Direccion from "../Components/BarraSuperiorTapeke/Direccion";
import PBarraFooter from "../Components/PBarraFooter";
import favorito from "../Services/Tapeke/Components/favorito";
import general from "../Services/Tapeke/Components/general";
import novedades from "../Services/Tapeke/Components/novedades";
import PedidosEnCurso from "../Services/Tapeke/Components/pedido/Components/PedidosEnCurso";
import restaurante from "../Services/Tapeke/Components/restaurante";
import Item2 from "../Services/Tapeke/Components/restaurante/Components/Item2";
import usuario from "../Services/Usuario/Components/usuario";

class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!usuario.Actions.validateSession(this.props)) { return <SLoad />; }
  }

  publicidad() {
    var data = novedades.Actions.getAll(this.props);
    if (!data) return <SLoad />
    return <SList
      data={data}
      space={16}
      center
      horizontal={true}
      // filter={(item) => item.fecha > fecha}
      render={(obj) => {
        // if (obj.fecha > fechas) return null;
        return <SView width={290} height={160} row backgroundColor={"transparent"}  >
          <SView col={"xs-12"} height={160} style={{ resizeMode: "cover", maxWidth: "100%", minWidth: "100%", overflow: "hidden", borderRadius: 8, }} backgroundColor={"transparentred"} center  >
            <SImage src={SSocket.api.root + "novedades/" + obj.key} style={{
              borderTopLeftRadius: 8, borderTopRightRadius: 8,
              maxWidth: "100%", minWidth: "100%", overflow: "hidden",
              resizeMode: "cover", height: 165,
            }} />
          </SView>
        </SView>
      }} />
  }

  favoritos() {
    var data = restaurante.Actions.getAllFilter({}, this.props);
    var favUsuario = favorito.Actions.getByKeyUsuario(this.props.state.usuarioReducer.usuarioLog.key, this.props)
    if (!data) return <SLoad />;
    if (!favUsuario) return <SLoad />;
    var arr = Object.values(data).filter((itm) => favUsuario.find((elm) => elm.key_restaurante == itm.key))
    if (arr.length == 0) return null;
    return <>
      {this.categoria("Favoritos", "favorito")}
      <SView col={"xs-12"} height={195} border={"transparent"} >
        <SScrollView2>
          <SList
            data={arr}
            space={16}
            center
            horizontal={true}
            render={(obj) => {
              return <SView width={320}   >
                <Item2 data={obj} ></Item2>
              </SView>
            }} />
        </SScrollView2>
      </SView>
    </>

  }
  cerca() {
    var data = restaurante.Actions.getAllFilter({}, this.props);
    if (!data) return <SLoad />;
    var sort = Object.values(data).sort((a, b) => {
      return a.distancia - b.distancia;
    });
    var arr = sort.slice(0, 6);
    var i = 0;
    return <SList
      data={arr}
      space={16}
      center
      order={[{ key: "distancia", order: "asc" }]}
      horizontal={true}
      render={(obj) => {
        return <SView width={320}      >
          <Item2 data={obj} ></Item2>
        </SView>
      }} />
  }
  paraTi() {
    // TODO::
    var data = restaurante.Actions.getAllFilter({}, this.props);
    if (!data) return <SLoad />;
    var arr = Object.values(data).slice(0, 6);
    return <SList
      data={arr}
      space={16}
      center
      order={[{ key: "distancia", order: "desc" }]}
      horizontal={true}
      render={(obj) => {
        return <SView width={320}      >
          <Item2 data={obj} ></Item2>
        </SView>
      }} />
  }

  pedidoencurso() {
    return <PedidosEnCurso categoria={this.categoria("Pedido en curso", "compras")} />
  }

  categoria(title, url) {

    return (
      <>
        <SHr height={8} />
        <SView col={"xs-12"} height={35} row center border={'transparent'} >
          <SView width={12} />
          <SView col={"xs-8"} row style={{ justifyContent: "flex-start" }}>
            <SText fontSize={18} font={"Roboto"} >{title}</SText>
          </SView>
          <SView flex row center style={{ justifyContent: "flex-end" }} onPress={() => {
            SNavigation.navigate(url);
          }}>
            <SText fontSize={12} font={"Roboto"} center style={{ right: 2 }}>Ver todos</SText>
            <SIcon name={"Back"} width={12} height={12} fill={STheme.color.primary} style={{ transform: [{ rotate: "180deg" }] }} />
          </SView>
          <SView width={8} />
        </SView>
      </>
    );
  }

  getContent() {
    if (!this.props.state.direccion_usuarioReducer.miDireccion) {
      return <SLoad />
    }
    return <SView col={"xs-12"} center>

      {this.pedidoencurso()}

      {this.categoria("Recomendado Para Ti", "explorar")}
      <SView col={"xs-12"} height={195} border={"transparent"} >
        <SScrollView2>
          {this.paraTi()}
        </SScrollView2>
      </SView>
      {this.categoria("Cerca", "explorar")}
      <SView col={"xs-12"} height={195} border={"transparent"} >
        <SScrollView2>
          {this.cerca()}
        </SScrollView2>
      </SView>
      <SHr height={20} />
      <SHr height={20} />
      <SHr height={20} />
      <SView col={"xs-12"} height={170} border={"transparent"} >
        <SScrollView2>
          {this.publicidad()}
        </SScrollView2>
      </SView>
      <SHr height={20} />
      <SHr height={20} />

      {this.favoritos()}

      <SHr height={20} />
    </SView>
  }
  getDireccion() {
    if (!usuario.Actions.validateSession(this.props, true)) {
      return <SLoad />
    }
    return <Direccion />
  }

  subRender() {
    var generalTime = general.Actions.getAllComponents(this.props);
    if (!generalTime) return <SLoad />
    return <SView col={"xs-12"} center>
      {this.getContent()}
    </SView>
  }
  render() {
    if (!usuario.Actions.validateSession(this.props)) return null;

    return (
      <>
        <BarraSuperiorTapeke>
          {this.getDireccion()}
        </BarraSuperiorTapeke>
        <SPage title={"as"} hidden onRefresh={() => {
          general.Actions.getAllComponents(this.props, true);

        }}>
          {this.subRender()}
        </SPage>
        <PBarraFooter url={"/"} />
      </>
    );
  }
}
const initStates = (state) => {
  return { state };
};
export default connect(initStates)(Inicio);