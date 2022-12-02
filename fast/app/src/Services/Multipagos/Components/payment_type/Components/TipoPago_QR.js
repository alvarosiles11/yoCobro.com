import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SIcon, SText, STheme } from 'servisofts-component'

export default class TipoPago_QR extends Component {
    render() {
        return (
            <View>
                <SIcon name={"QrPedido"} height={290} fill={"white"} />
                {/* <SText font={"Roboto"} fontSize={50} center bold color={STheme.color.secondary}>QR</SText> */}
            </View>
        )
    }
}