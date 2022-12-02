import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SLoad, SNavigation, SPage, SText, SView, SDate, SInput, SPopup, STheme, SIcon } from 'servisofts-component';
import Parent from '..'
// import Horario from '../../horario';
import Pack from '../../pack';
import SSocket from 'servisofts-socket';
import PButtom from '../../../../../Components/PButtom';

class Ayuda extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");
        this.key_horario = SNavigation.getParam("key_horario");
    }

    render() {

        return (
            <SPage title={'Ayuda'}>
                <SView col={"xs-12"} center>
                    <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} >
                        <SHr height={40} />
                        <SView col={"xs-12"} center backgroundColor={STheme.color.card} style={{ borderRadius: 8, borderLeftWidth: 7, borderColor: STheme.color.primary }} onPress={() => { }}>
                            <SHr height={20} />
                            <SView col={"xs-12"} row center >
                                <SView col={"xs-11"} row >
                                    <SView width={20}></SView>
                                    <SText color={STheme.color.text} font={"Roboto"} fontSize={16}>Preguntas frecuentes</SText>
                                </SView>
                                <SView col={"xs-1"} style={{}} >
                                    <SIcon name={'Cayudaflecha'} height={20} width={14} fill={STheme.color.card} />
                                </SView>
                            </SView>
                            <SHr height={20} />
                        </SView>
                        <SHr height={15} />
                        <SView col={"xs-12"} center backgroundColor={STheme.color.card} style={{ borderRadius: 8, borderLeftWidth: 7, borderColor: STheme.color.primary }} onPress={() => { }}>
                            <SHr height={20} />
                            <SView col={"xs-12"} row center >
                                <SView col={"xs-11"} row >
                                    <SView width={20}></SView>
                                    <SText color={STheme.color.text} font={"Roboto"} fontSize={16}>Términos y condiciones</SText>
                                </SView>
                                <SView col={"xs-1"} style={{}} >
                                    <SIcon name={'Cayudaflecha'} height={20} width={14} fill={STheme.color.card} />
                                </SView>
                            </SView>
                            <SHr height={15} />
                        </SView>
                        <SHr height={15} />
                        <SView col={"xs-12"} center backgroundColor={STheme.color.card} style={{ borderRadius: 8, borderLeftWidth: 7, borderColor: STheme.color.primary }} onPress={() => { }}>
                            <SHr height={20} />
                            <SView col={"xs-12"} row center >
                                <SView col={"xs-11"} row >
                                    <SView width={20}></SView>
                                    <SText color={STheme.color.text} font={"Roboto"} fontSize={16}>Políticas de privacidad</SText>
                                </SView>
                                <SView col={"xs-1"} style={{}} >
                                    <SIcon name={'Cayudaflecha'} height={20} width={14} fill={STheme.color.card} />
                                </SView>
                            </SView>
                            <SHr height={15} />
                        </SView>
                        <SHr height={15} />
                        <SView col={"xs-12"} center backgroundColor={STheme.color.card} style={{ borderRadius: 8, borderLeftWidth: 7, borderColor: STheme.color.primary }} onPress={() => { }}>
                            <SHr height={20} />
                            <SView col={"xs-12"} row center >
                                <SView col={"xs-11"} row >
                                    <SView width={20}></SView>
                                    <SText color={STheme.color.text} font={"Roboto"} fontSize={16}>Consultas</SText>
                                </SView>
                                <SView col={"xs-1"} style={{}} >
                                    <SIcon name={'Cayudaflecha'} height={20} width={14} fill={STheme.color.card} />
                                </SView>
                            </SView>
                            <SHr height={15} />
                        </SView>
                        <SHr height={40} />
                    </SView>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Ayuda);