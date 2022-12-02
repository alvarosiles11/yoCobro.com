import React, { Component } from 'react';

import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import {
 SGradient, SHr, SIcon, SImage, SLoad, SPage, SScrollView2, SText, STheme, SView, SNavigation, SInput,
} from 'servisofts-component';
import Item2 from '../Components/Item2';

class Categoria extends Component {
 constructor(props) {
  super(props);
  this.state = {
  };

  this.key = SNavigation.getParam("keyCategoria");

 }

 render() {
  return (
   <SPage title={'Categoria: ' + this.key} center>

    <ScrollView>
     <SView col={"xs-12"} row center height border={'transparent'} >
      <SView col={"xs-11 md-5 lg-4 xl-2.5"}    >
       <Item2></Item2>
      </SView>
     </SView >
     <SHr height={80} />

    </ScrollView>

   </SPage>
  );
 }
}
const initStates = (state) => {
 return { state }
};
export default connect(initStates)(Categoria);