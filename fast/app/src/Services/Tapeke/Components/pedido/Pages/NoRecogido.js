import React from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SPage, SText, STheme, SView, SNavigation, SThread, SStorage, SPopup, SLoad } from 'servisofts-component';
import SSocket from "servisofts-socket";

class NoRecogido extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
        this.key_pedido = SNavigation.getParam('key_pedido');
    }

    render() {
        return (
            <SPage  center>
                <SHr height={20} />
                <SView flex center col={"xs-11 sm-10 md-8 lg-6 xl-4"}  >
                    <SView col={"xs-12"} center row flex style={{ backgroundColor: STheme.color.primary, borderRadius: 12 }}>
                        <SHr height={50} />
                        <SView col={"xs-12"} row center   >
                            <SView col={"xs-11"} border={'transparent'}  >
                                <SText fontSize={24} color='white' bold center>Tapeke no recogido</SText>
                                <SHr height={30} />
                                <SText fontSize={18} color='white' bold center>Lo sentimos, no llegaste a tiempo para recoger tu pedido.</SText>
                            </SView>
                        </SView>
                        <SHr height={30} />
                        <SView col={"xs-11"} center  >
                            <SView center col={"xs-12"}  >
                                <SIcon name="NoRecogido" height={280}></SIcon >
                                {/* <SImage src={`data:image/png;base64,${this.getQr()}`} /> */}
                            </SView>
                        </SView>
                        <SHr height={40} />
                    </SView>
                </SView>
                <SHr height={20} />
            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(NoRecogido);