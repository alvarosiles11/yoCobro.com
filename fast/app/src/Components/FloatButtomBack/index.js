import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from "react-native";
import { SIcon, STheme } from 'servisofts-component';
const FloatButtomBack = (props) => {
    if (props.esconder) {
        return <View />
    }
    return (
        <TouchableOpacity onPress={() => {
            props.onPress();
        }}
            style={{
                position: "absolute",
                left: 10,
                top: 0,
                width: 30,
                height: 30,
                // borderWidth: STheme.color.secondary + "22",
                // borderColor: STheme.color.secondary + "22",
                justifyContent: "center",
                alignItems: "center",
                // margin: 4,
                ...props.style
            }}>
            <SIcon name={"Back"} fill={STheme.color.primary} width={16} />
            {/* <Svg name={"Add"} style={{
                width: "100%",
                height: "100%",
                // fill:"#C31"
            }} /> */}
        </TouchableOpacity >
    )
}
export default FloatButtomBack;