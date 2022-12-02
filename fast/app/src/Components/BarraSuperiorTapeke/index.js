import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, STheme, SView } from 'servisofts-component';
import NavBar from '../NavBar';


class BarraSuperiorTapeke extends Component {
 constructor(props) {
  super(props);
  this.state = {

  };

 }


 render() {
  var usuario = this.props.state.usuarioReducer.usuarioLog
  if (!usuario) {
   // SNavigation.navigate("login");
   return <SView />
  }

  return (
   <SView col={"xs-12"} height={60} backgroundColor={STheme.color.primary} style={{
    borderBottomLeftRadius: 8, borderBottomRightRadius: 8,
   }} >


    <SView col={"xs-12"} height row center flex style={{ paddingLeft: 16, paddingRight: 16 }}>


     <SView height width={35} center backgroundColor={'transparent'} onPress={() => { NavBar.open(); }} >
      <SIcon name={"KMenu"} width={32} />
     </SView>

     <SView flex center >
      {this.props.children}
     </SView>

     <SView height width={35} center backgroundColor={'transparent'}>
      <SIcon name={"AppAlert"} width={24} height={24} fill={STheme.color.secondary} />
     </SView>
    </SView>
   </SView >
  );
 }
}
const initStates = (state) => {
 return { state }
};
export default connect(initStates)(BarraSuperiorTapeke);