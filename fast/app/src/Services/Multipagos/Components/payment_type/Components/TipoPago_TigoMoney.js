import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SButtom, SForm, SText, STheme, SView } from 'servisofts-component'


export default class TipoPago_TigoMoney extends Component {
    render() {
        return (
            <SView center col={"xs-12"}>
                {/* <SText font={"Roboto"} fontSize={50} center bold color={STheme.color.secondary}>TigoMoney</SText> */}
                <SForm
                    ref={(form) => { this.form = form; }}
                    col={"xs-11 sm-9 md-7 lg-5 xl-8"}
                    center
                    inputProps={{ customStyle: "Calistenia", backgroundColor: "white", color: STheme.color.primary }}
                    inputs={{  telefono: { label: "INGRESA TU TELEFONO" },  }}
                    onSubmit={(values) => {
                        // Parent.Actions.registro(values, this.props);
                    }}
                />
                <SButtom type="secondary" style={{ fontSize: 15, color: STheme.color.secondary, backgroundColor: STheme.color.secondary, width: 300, borderRadius: 5 }} onPress={() => {
                    this.form.submit()
                }}>GENERAR CUPON</SButtom>

            </SView>
        )
    }
}