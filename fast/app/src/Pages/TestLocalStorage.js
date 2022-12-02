import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SPage, SText } from 'servisofts-component';
import { SStorage } from 'servisofts-component'
import TipoPago_QR from '../Services/Multipagos/Components/payment_type/Components/TipoPago_QR';
import TipoPago_TigoMoney from '../Services/Multipagos/Components/payment_type/Components/TipoPago_TigoMoney';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'PRESIONA EL BOTON',
        };
    }


    componentDidMount() {
        //asi trae el pedido en curso de local storage
        SStorage.getItem("pedido_en_curso", (val) => {
            if (!val) SNavigation.goBack();
            this.setState({ pedido_en_curso: JSON.parse(val) })
            // console.log(this.state.pedido_en_curso)
        })
    }

    registrar_informacion() {
        SSocket.sendPromise(
            {
                "component": "pedido",
                "version": "1.0",
                "key_pedido": this.state.key_pedido,
                "type": "registro",
                "estado": "cargando",
                "key_usuario": this.props.state.usuarioReducer.usuarioLog.key,
                "data": {
                    "key_pack": this.aux.pack.key,
                    "cantidad": this.state.cantidad,
                    "delivery": this.state.delivery,
                    "fecha": this.auxRestaurante.horario.fecha,
                    "direccion": {
                        "key_direccion_usuario": this.props.state.direccion_usuarioReducer.miDireccion.key,
                    }
                }
            }
        ).then((resp) => {

            SStorage.setItem("pedido_en_curso", JSON.stringify(resp.data));

            SNavigation.navigate(Parent.component + "/confirmar", { keyPedido: resp.data.key })
        }).catch((err) => {
            console.log("SPromiseerror ", err);
        });
    }

    mostrarContenido() {
        switch (this.key_tipoPago) {
            case "QR": return <TipoPago_QR />;
            case "TigoMoney": return <TipoPago_TigoMoney />;
            default: return <TipoPago_QR />;
        }
    }


    render() {
        //asi se trae el local storage del redux
        if (!this.state.midato) {
            SStorage.getItem("miInformation_log", (val) => {
                this.setState({ midato: val })
            })
        }
        return (
            <SPage title={'Test'} center>
                <SHr />
                <SText>{this.state.pedido_en_curso?.key}</SText>
                <SText>{this.state.midato?.key}</SText>
                {this.mostrarContenido()}
                <SHr />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Test);