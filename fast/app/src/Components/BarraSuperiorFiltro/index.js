import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SLoad, SNavigation, SText, STheme, SView } from 'servisofts-component';
import SSocket from "servisofts-socket"
import NavBar from '../NavBar';

import { View, Text, Animated, Dimensions, TouchableOpacity, Platform } from 'react-native';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.Value(0),

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
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
            }} >


                <SView col={"xs-12"} height row center flex style={{ paddingLeft: 16, paddingRight: 16 }}>


                    <SView height width={80} center backgroundColor={'transparent'} onPress={() => {
                        if(this.props.clearAlvaro){
                            this.props.clearAlvaro()
                        }

                    }} >
                        <SText font={"Roboto"} fontSize={14} color={"#fff"}>Limpiar todo</SText>
                        <SHr color='#fff' height={0.3}></SHr>
                    </SView>

                    <SView flex center  >
                        {this.props.children}
                    </SView>

                    <SView height width={80} center backgroundColor={'transparent'} onPress={() => {
                        // SNavigation.navigate("restaurante/explorador");
                        SNavigation.goBack();
                    }}>

                        <SText font={"Arial"} fontSize={24} color={"#fff"} bold>X</SText>

                    </SView>
                </SView>
            </SView >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);