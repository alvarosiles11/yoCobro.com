import { Text, View } from 'react-native'
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SPage, SText, SNavigation, SLoad, SView, SIcon } from 'servisofts-component';

import React, { Component } from 'react'
import Parent from '../index'
class Registro extends Component {


  
  render() {
    return (
      <View>
        {/* <Text>Registro payment_type</Text> */}
      </View>
    )
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(Registro);