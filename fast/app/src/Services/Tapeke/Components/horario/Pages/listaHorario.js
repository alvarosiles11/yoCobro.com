import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SImage, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView, SDate } from 'servisofts-component';
import Parent from '../../restaurante'
import Horario from '..';
import Pack from '../../pack';
import SSocket from 'servisofts-socket'
import FloatButtom from '../../../../../Components/FloatButtom';
class listaHorario extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");
    }

    getLista() {
        var data = Horario.Actions.getAll(this.props);
        if (!data) return <SLoad />
        var dataHorario = Object.values(data).filter(item => item.key_restaurante == this.key)

        var datas = {};
        datas = Pack.Actions.getAll(this.props);
        if (!datas) return <SLoad />

        return <STable2
            header={[
                { key: "index", label: "#", width: 100 },
                { key: "hora_inicio", label: "Hora Inicio", width: 100 },
                { key: "hora_fin", label: "Hora Fin", width: 100 },
                // { key: "dia", label: "Dia", width: 200 },
                {
                    key: "dia-a", label: "Dia", width: 100, order: "asc", center: true, render: (itm) => { return itm + 2 }, component: (item) => {
                        var dias = new SDate.getDaysOfWeek();
                        dias[-1] = { text: "Feriado", value: "Fer" };
                        return dias[item - 2].text;
                    }
                },

                {
                    key: "key-cantidad", label: "Cantidad Pack", width: 100, center: true,
                    component: (item) => {
                        var dataPack = {};
                        dataPack = Object.values(datas).filter(items => items.key_horario == item);
                        dataPack.sort((a, b) => {
                            return new SDate(a.fecha_on).getTime() < new SDate(b.fecha_on).getTime() ? 1 : -1;
                        })
                        //TODO:  ordenar por fecha on el ultimo ya sea en server o en front end //SORT
                        if (!dataPack) return <SLoad />
                        return dataPack[0]?.cantidad
                    }
                },
                {
                    key: "key-precio", label: "Precio Pack", width: 100, center: true,
                    component: (item) => {
                        var dataPack = {};
                        dataPack = Object.values(datas).filter(items => items.key_horario == item);
                        dataPack.sort((a, b) => {
                            return new SDate(a.fecha_on).getTime() < new SDate(b.fecha_on).getTime() ? 1 : -1;
                        })
                        if (!dataPack) return <SLoad />
                        return dataPack[0]?.precio
                    }
                },
                {
                    key: "key-editar", label: "Editar", width: 60, center: true,
                    component: (item) => {
                        return <SView onPress={() => { SNavigation.navigate("admin/" + Parent.component + "/horario/registro", { key: item, key_restaurante: this.key }) }}>
                            <SIcon name={"Edit"} width={35} />
                        </SView>
                    }
                },
                {
                    key: "key-eliminar", label: "Eliminar", width: 60, center: true,
                    component: (key) => {
                        return <SView width={35} height={35} onPress={() => { SPopup.confirm({ title: "Eliminar", message: "¿Esta seguro de eliminar?", onPress: () => { Horario.Actions.eliminar(data[key], this.props) } }) }}>
                            <SIcon name={'Delete'} />
                        </SView>
                    }
                },
                {
                    key: "key-pack", label: "Packs", width: 60, center: true,
                    component: (item) => {
                        return <SView onPress={() => { SNavigation.navigate("admin/pack/registro", { key_horario: item }) }}>
                            <SIcon name={"Pack"} width={35} />
                        </SView>
                    }
                },

            ]}
            data={dataHorario}
            filter={(dta) => {
                if (dta.estado != 1) return false;
                return true;
            }}
        />
    }
    render() {
        return (
            <SPage title={'Lista horario'} disableScroll>

                <SView col={"xs-12"} center height>
                    {this.getLista()}
                </SView>
                <FloatButtom onPress={() => {
                    SNavigation.navigate("admin/horario/registro", { key_restaurante: this.key });
                }} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(listaHorario);