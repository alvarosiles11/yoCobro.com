import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SImage, SInput, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
import Parent from '..'
import SSocket from 'servisofts-socket'
import FloatButtom from '../../../../../Components/FloatButtom';
class lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLista() {
        var data = Parent.Actions.getAll(this.props);
        if (!data) return <SLoad />
        return <STable2
            header={[
                { key: "index", label: "#", width: 50 },
                {
                    key: "key-foto", label: "foto", width: 100,
                    render: (item) => {
                        // SSocket.api.root+'medico/key'
                        return SSocket.api.root + Parent.component + "/" + item
                    },
                    component: (url) => {
                        return <SImage enablePreview src={url + "?time=" + new Date().getTime()} width={"100%"} height={"100%"} />
                    }
                },
                { key: "nombre", label: "Nombre", width: 130 },
                { key: "descripcion", label: "Descripcion", width: 280 },
                { key: "direccion", label: "Direccion", width: 200 },
                // { key: "latitude", label: "Lat", width: 130 },
                // { key: "longitude", label: "Lng", width: 130 },
                {
                    key: "delivery", label: "Delivery", width: 130, center: true,
                    component: (item) => {
                        // alert(item)
                        //console.log(item+" aquii")
                        if (item == true) {
                            return <SText color={"green"}>Si</SText>
                        } else {
                            return <SText color={"red"}>No</SText>
                        }

                    }
                },
                {
                    key: "key-editar", label: "Editar", width: 50, center: true,
                    component: (item) => {
                        return <SView onPress={() => { SNavigation.navigate("admin/" + Parent.component + "/registro", { key: item }) }}>
                            <SIcon name={"Edit"} width={35} />
                        </SView>
                    }
                },
                {
                    key: "key-eliminar", label: "Eliminar", width: 70, center: true,
                    component: (key) => {
                        return <SView width={35} height={35} onPress={() => { SPopup.confirm({ title: "Eliminar", message: "¿Esta seguro de eliminar?", onPress: () => { Parent.Actions.eliminar(data[key], this.props) } }) }}>
                            <SIcon name={'Delete'} />
                        </SView>
                    }
                },
                {
                    key: "key-horario", label: "Horarios", width: 60, center: true,
                    component: (item) => {
                        return <SView onPress={() => { SNavigation.navigate("admin/horario", { key: item }) }}>
                            <SIcon name={"Horario"} width={35} />
                        </SView>
                    }
                },
                {
                    key: "key-administradores", label: "administradores", width: 60, center: true,
                    component: (item) => {
                        return <SView onPress={() => { SNavigation.navigate("admin/usuario_restaurante", { key_restaurante: item }) }}>
                            <SIcon name={"Usuarios_proveedor"} width={35} />
                        </SView>
                    }
                },
            ]}

            data={data}
            filter={(dta) => {
                if (dta.estado != 1) return false;
                return true;
            }}
        />
    }
    render() {
        return (
            <SPage title={'lista'} disableScroll>
                <SView col={"xs-12"} center height>
                    {this.getLista()}
                </SView>
                <FloatButtom onPress={() => {
                    SNavigation.navigate("admin/restaurante/registro");
                }} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(lista);