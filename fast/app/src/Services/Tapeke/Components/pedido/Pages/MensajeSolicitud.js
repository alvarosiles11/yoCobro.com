import React from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SPage, SText, STheme, SView, SNavigation, SThread, SStorage, SPopup, SLoad, SDate } from 'servisofts-component';
import SSocket from "servisofts-socket";
import Contador from '../../../../../Components/Contador';
import Validations from '../../../../../Validations';
// import ImgSaveGallery from '../../../../../Components/ImgSaveGallery';
// import ImgShared from '../../../../../Components/ImgShared';

class MensajeSolicitud extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
        this.key_pedido = SNavigation.getParam('key_pedido');
    }

    componentDidMount() {
        this.isRun = true;
        this.getParams();
        this.getDetallePedido();
    }
    componentWillUnmount() {
        this.isRun = false;
    }

    async getParams() {
        if (!this.isRun) return;
        SSocket.sendPromise(
            {
                component: "pedido",
                type: "get_payment_order",
                key_pedido: this.key_pedido,
            }
        ).then((resp) => {
            this.setState({ pay_order: resp.data });
        }).catch((err) => {
            if (err.error == "noIniciado") {
                new SThread(500, "getPaymentStatus", false).start(() => {
                    if (!this.isRun) return;
                    this.getParams();
                })
            }

        });
    }
    async getDetallePedido() {
        if (!this.isRun) return;
        if (this.state.isLoading) return;
        // this.setState({ isLoading: true });
        SSocket.sendPromise({
            component: "pedido",
            type: "getDetalle",
            estado: "cargando",
            key_pedido: this.key_pedido,
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        }).then((resp) => {

            if (!this.isRun) return;
            Validations.set_pedido_en_curso(resp.data);
            Validations.pedido_en_curso("pedido/mensajeSolicitud");
            // this.setState({ pedido: { ...resp.data } });
            new SThread(5000, "getDetallePedido", false).start(() => {
                this.getDetallePedido();
            });
        }).catch((err) => {
            if (err.error == "noIniciado") {
                new SThread(500, "reintent_get_detalle", false).start(() => {
                    if (!this.isRun) return;
                    this.getDetallePedido();
                })
                return;
            }
        })
    }

    getQr() {
        var po = this.state.pay_order;
        if (!po) return null;
        var obj = po.data;
        if (!obj) return null;
        return obj?.image_data;
    }
    render() {
        return (
            <SPage hidden center>
                <SHr height={40} />

                <SView flex center col={"xs-11 sm-10 md-8 lg-6 xl-4"}  >
                    <SView col={"xs-12"} center row flex style={{ backgroundColor: STheme.color.primary, borderRadius: 12 }}>
                        <SHr height={50} />
                        <SView col={"xs-12"} row center   >
                            <SView col={"xs-11"} border={'transparent'}  >
                                <SText fontSize={24} color='white' bold center> El restaurante está confirmando tu pedido</SText>
                            </SView>
                        </SView>
                        <SHr height={60} />
                        <SView col={"xs-12"} center  >
                            <SView center col={"xs-12"} height={250}   >
                                <SImage src={`${this.getQr()}`} />
                            </SView>
                        </SView>
                        <SHr height={50} />
                        <SView col={"xs-12"} height={100} row center  >
                            <SView col={"xs-2"} height center>
                            </SView>
                            <SView flex center height={60} >
                                <SView height={60} colSquare center style={{ backgroundColor: 'white', borderRadius: 8, borderColor: STheme.color.primary, borderWidth: 2, padding: 8 }} onPress={() => {
                                    // ImgSaveGallery.guardar(this.key_qr);
                                }}>
                                    <SIcon name={"ImgSave"} />
                                </SView>
                            </SView>
                            <SView flex center height={60} >
                                <SView height={60} colSquare center style={{ backgroundColor: 'white', borderRadius: 8, borderColor: STheme.color.primary, borderWidth: 2, padding: 8 }} onPress={() => {
                                    // ImgShared.compartir(this.key_qr);
                                }}>
                                    <SIcon name={"ImgShare"} />
                                </SView>
                            </SView>
                            <SView col={"xs-2"} height center>
                            </SView>
                        </SView>
                        <SHr height={30} />
                        <Contador date={this.state?.pay_order?.fecha_exp} ></Contador>
                        <SHr height={30} />
                        <SView col={"xs-12"} row center   >
                            <SView col={"xs-11"} border={'transparent'}  >
                                <SText fontSize={18} color='white' bold center>¡Recuerda usar tapaboca para recoger tu pedido!</SText>
                                <SHr height={20} />
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
export default connect(initStates)(MensajeSolicitud);