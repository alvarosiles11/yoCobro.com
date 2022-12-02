import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SLoad, SButtom, SIcon, SWebView, SImage, SInput, SPopup } from 'servisofts-component';
import SSocket from 'servisofts-socket';

class QR extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.data = JSON.parse(SNavigation.getParam("data"));
    }
    success() {
        SNavigation.navigate("billetera");
    }
    render() {
        const { transaction_id, image_data, checkout_amount } = this.data;
        var transaction_id_reducer = this.props.state.billeteraReducer.transaction_id;
        if (transaction_id_reducer == transaction_id) {
            this.success();
        }
        return (
            <SPage disableScroll>
                <SView col={"xs-12"} center height>
                    <SText bold >{checkout_amount}</SText>
                    <SImage src={image_data} style={{
                        width: "100%",
                        height: 400
                    }} />
                    <SButtom type='danger' loading={this.state.loading} onPress={() => {
                        SSocket.sendPromise(
                            {
                                "component": "billetera",
                                "type": "getByTransactionId",
                                "transaction_id": transaction_id,
                            }
                        ).then((resp) => {
                            this.setState({ loading: false });
                            if (!!resp?.data?.key) {
                                this.success();
                            }
                            // console.log("Exito en el pago", resp);
                        }).catch((err) => {
                            this.setState({ loading: false });
                            console.error("Error en el pago", err);
                        });
                    }}>Verificar pago</SButtom>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(QR);