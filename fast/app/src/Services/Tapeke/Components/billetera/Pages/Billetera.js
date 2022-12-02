import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SLoad, SButtom, SIcon, SWebView, STable2, SMath, SDate, SList, } from 'servisofts-component';
import { WebView } from 'react-native';
import PButtom from '../../../../../Components/PButtom';
import usuario from '../../../../Usuario/Components/usuario';
import Parent from '..'
import billetera from '..';


class Billetera extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getHeaderBilletera(data) {
        var montoTotal = 0;
        data.map((obj) => { montoTotal += parseFloat(obj.monto); })
        return <>
            <SHr height={10} />
            <SView col={"xs-10 sm-5 lg-3.5"} height={201} center>
                <SIcon name={'Chip'} width={290} height={181} style={{ position: "absolute" }} />
                <SView width={250} height={140}>
                    <SView style={{ top: 20, left: 0, position: "absolute" }}>
                        <SText fontSize={14} color={'#ffffffbb'} font={"Roboto"} >Monto actual</SText>
                        <SText fontSize={28} color={'#ffffffbb'} font={"Roboto"} >Bs. {SMath.formatMoney(montoTotal)}</SText>
                    </SView>
                    <SView style={{ bottom: 0, right: 0, position: "absolute" }}>
                        <SText fontSize={13} color={'#ffffffbb'} font={"Roboto"} >{this.props.state.usuarioReducer.usuarioLog.key.substring(0, 19).replace(/-/g, "")}</SText>
                    </SView>
                </SView>
            </SView>
            <SHr height={18} color={STheme.color.card} />
            <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} row center>
                <SHr height={8} />
                <PButtom fontSize={16} width={"100%"} onPress={() => { SNavigation.navigate('billetera/cargarcredito', { monto: SMath.formatMoney(montoTotal) }) }}>CARGAR CRÉDITO</PButtom>
                <SHr height={8} />
            </SView>
            <SHr height={18} color={STheme.color.card} />
        </>
    }


    getDetalleBilletera(fecha, descripcion, monto) {
        return <SView key={fecha} col={"xs-12"} center>
            <SHr height={10} />
            <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center >
                <SView col={"xs-12"} row backgroundColor={STheme.color.card} height={52} center style={{ borderRadius: 8 }}>
                    <SView col={"xs-8 md-9"} height style={{
                        justifyContent: "center",
                    }}>
                        <SText font={"Roboto"} color={STheme.color.text} fontSize={12} style={{ paddingLeft: 4 }} >{fecha}</SText>
                        <SHr height={4} />
                        <SText font={"Roboto"} color={STheme.color.gray} fontSize={10} style={{ paddingLeft: 4 }} >{descripcion}</SText>
                    </SView>
                    <SView col={"xs-4 md-3"} style={{ textAlign: "right" }} row >
                        <SIcon name={monto > 0 ? 'Ingreso' : 'Egreso'} width={20} height={15} fill={"#8DBF3B"} /><SView col={"xs-1"} />
                        <SText font={"Roboto"} color={STheme.color.text} fontSize={14}>{SMath.formatMoney(monto)}</SText>
                    </SView>
                </SView>
            </SView>
        </SView>
    }



    getDetalle(obj) {
        if (obj.tipo_pago == 'compra_tapeke') {
            return obj.detalle
        }
        if (obj.tipo_pago == 'Manual') {
            return "Cargado por tapeke"
        }
        return obj.tipo_pago
    }

    getLista(data) {
        // var usuarios = usuario.Actions.getAll(this.props);
        // if (!usuarios) return <SLoad />;
        return <SList
            order={[{ key: "fecha_on", type: "desc", pedo: 1 }]}
            data={data}
            // limit={30}
            render={(obj) => {
                return this.getDetalleBilletera(new SDate(obj.fecha_on).toString("yyyy-MM-dd hh:mm"), this.getDetalle(obj), obj.monto)
            }}
        />

    }

    getContent() {
        var data = Parent.Actions.getByKeyCliente(this.props.state.usuarioReducer.usuarioLog.key, this.props);
        if (!data) return <SLoad />
        return <>
            {this.getHeaderBilletera(data)}
            {this.getLista(data)}
        </>
    }
    render() {

        return (
            <>
                <SPage title={'Billetera'} onRefresh={() => {
                    Parent.Actions.refresh(this.props);
                }}>
                    <SView col={"xs-12"} center>
                        {this.getContent()}
                    </SView>
                </SPage>
            </>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Billetera);