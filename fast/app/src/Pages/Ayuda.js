import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SLoad, SButtom, SIcon, SWebView } from 'servisofts-component';
import { WebView } from 'react-native';
import PButtom from '../Components/PButtom';


class Ayuda extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getHeaderAyuda() {
        return <><SHr height={10} />
            <SView col={"xs-12"} height={201} center>
                <SText fontSize={13} font={"Roboto"} >Header</SText>
            </SView>
        </>
    }

    getBodyAyuda() {
        return <><SHr height={10} />
            <SView col={"xs-12"} center >
                <SText fontSize={13} font={"Roboto"} >Body</SText>
            </SView>
        </>
    }

    render() {
        return (
            <>
                <SPage title={'Ayuda'}>
                    <SView col={"xs-12"} center>
                        {this.getHeaderAyuda()}
                        <SHr height={18} color={STheme.color.card} />
                        {this.getBodyAyuda()}
                    </SView>
                </SPage>
            </>
        );
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Ayuda);