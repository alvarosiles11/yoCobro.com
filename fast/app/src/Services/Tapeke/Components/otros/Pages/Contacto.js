import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SLoad, SNavigation, SPage, SText, SView, SDate, SInput, SPopup, STheme, SIcon } from 'servisofts-component';
import Parent from '..'
// import Horario from '../../horario';
import Pack from '../../pack';
import SSocket from 'servisofts-socket';
import PButtom from '../../../../../Components/PButtom';

class Contacto extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");
        this.key_horario = SNavigation.getParam("key_horario");
    }

    render() {

        return (
            <SPage title={'Contáctanos'} center>
                <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} >
                    <SHr height={40} />
                    <SText color={STheme.color.primary} font={"Roboto"} fontSize={18} style={{}}>Síguenos</SText>
                    <SHr height={20} />
                    <SView col={"xs-12"} center backgroundColor={STheme.color.card} style={{ borderRadius: 8 }}>
                        <SHr height={20} />
                        <SView col={"xs-11"} row center >
                            <SView col={"xs-12"} row center style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }} onPress={() => { }}>
                                <SView col={"xs-1.5"} >
                                    <SIcon name={'Cfacebook'} height={35} width={35} />
                                </SView>
                                <SView col={"xs-10"}  >
                                    <SText color={STheme.color.text} font={"Roboto"} fontSize={16}>Facebook</SText>
                                </SView>
                                <SHr height={10} />
                            </SView>
                            <SHr height={20} />
                            <SView col={"xs-12"} row center style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }} onPress={() => { }}>
                                <SView col={"xs-1.5"} >
                                    <SIcon name={'Cinstagram'} height={35} width={35} />
                                </SView>
                                <SView col={"xs-10"}  >
                                    <SText color={STheme.color.text} font={"Roboto"} fontSize={16}>Instagram</SText>
                                </SView>
                                <SHr height={10} />
                            </SView>
                            <SHr height={20} />
                            <SView col={"xs-12"} row center onPress={() => { }}>
                                <SView col={"xs-1.5"} >
                                    <SIcon name={'Ctiktok'} height={35} width={35} />
                                </SView>
                                <SView col={"xs-10"}  >
                                    <SText color={STheme.color.text} font={"Roboto"} fontSize={16}>TikTok</SText>
                                </SView>
                                <SHr height={10} />
                            </SView>

                        </SView>
                        <SHr height={15} />
                    </SView>
                    <SHr height={50} />
                    <SText color={STheme.color.primary} font={"Roboto"} fontSize={18} style={{}}>Llámanos</SText>
                    <SHr height={20} />
                    <SView col={"xs-12"} center backgroundColor={STheme.color.card} style={{ borderRadius: 8 }}>
                        <SHr height={20} />
                        <SView col={"xs-12"} row center onPress={() => { }}>
                            <SView col={"xs-1.5"} >
                                <SIcon name={'Ccall'} height={35} width={35} />
                            </SView>
                            <SView col={"xs-10"}  >
                                <SText color={STheme.color.text} font={"Roboto"} fontSize={16}>Toca para llamar</SText>
                            </SView>
                            <SHr height={10} />
                        </SView>
                        <SHr height={15} />
                    </SView>
                    <SHr />
                    <SHr height={50} />
                    <SText color={STheme.color.primary} font={"Roboto"} fontSize={18} style={{}}>WhatsApp</SText>
                    <SHr height={20} />
                    <SView col={"xs-12"} center backgroundColor={STheme.color.card} style={{ borderRadius: 8 }}>
                        <SHr height={20} />
                        <SView col={"xs-12"} row center onPress={() => { }}>
                            <SView col={"xs-1.5"} >
                                <SIcon name={'Cwhatsapp'} height={35} width={35} />
                            </SView>
                            <SView col={"xs-10"}  >
                                <SText color={STheme.color.text} font={"Roboto"} fontSize={16}>Escríbenos</SText>
                            </SView>
                            <SHr height={10} />
                        </SView>
                        <SHr height={15} />
                    </SView>
                    <SHr height={40} />
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Contacto);