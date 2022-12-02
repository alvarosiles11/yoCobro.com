import React, { Component } from 'react';
import { View, Text, Animated, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { SIcon, SImage, SNavigation, SView, STheme, SText } from 'servisofts-component';
// import RelojEntrenamiento from '../../Pages/EntrenamientoPage/Entrenamiento/RelojEntrenamiento';
// import AppParams from '../../Params';
// import Svg from '../../Svg';
// import SImage from '../SImage';

class BarraSuperior extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.Value(0),
        };

    }

    startAnimation() {
        Animated.timing(this.state.anim, {
            toValue: 100,
            duration: !this.props.duration ? 300 : this.props.duration,
            useNativeDriver: true,
        }).start();
    }
    componentDidMount() {

        this.startAnimation();
    }


    getTitle() {
        var text = ""
        if (this.props.title) {
            text = this.props.title;
        }
        return (<SText font={"LondonTwo"} secondary>{text}</SText>)
    }
    getBack() {
        if (this.props.preventBack) {
            return <View />
        }
        // if (!SNavigation.lastRoute) {
        //     return <View />
        // }
        // if (!SNavigation.lastRoute.navigation.canGoBack()) {
        //     return <View />
        // }
        return <SView col={"xs-12"} height center >
            <SView onPress={() => {
                if (this.props.onBack) {
                    var prevent_default = this.props.onBack();
                    if (prevent_default) {
                        return;
                    }
                }
                SNavigation.goBack();
            }} col={"xs-12"} style={{
                paddingBottom: 4,
            }} center height>
                <SIcon height={18} name={"BackArrow"} fill={STheme.color.secondary} />
            </SView>
        </SView>
    }
    render() {
        return (
            <Animated.View style={{
                width: "100%",
                height: 45,
                flexDirection: "row",
                // backgroundColor: "#fff",
                transform: [
                    {
                        translateY: this.state.anim.interpolate({
                            inputRange: [0, 100],
                            outputRange: [-45, 0]
                        })
                    }
                ]
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    backgroundColor: STheme.color.barColor,
                    //borderBottomEndRadius: 16,
                    //borderBottomStartRadius: 16,
                    borderColor: "#000",
                    // overflow: "hidden",
                }}>
                    <SView height width={50} center>
                        {this.getBack()}
                    </SView>
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }} center>
                        {this.getTitle()}
                    </View>
                    <SView height width={50} center>
                    </SView>
                </View>
            </Animated.View>
        );
    }
}
export default BarraSuperior;