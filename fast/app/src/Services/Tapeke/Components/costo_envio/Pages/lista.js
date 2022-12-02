import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SImage, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
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
                { key: "monto", label: "Monto", width: 130 },
                { key: "metro", label: "Metros", width: 280 },
                {
                    key: "key-editar", label: "Editar", width: 50, center: true,
                    component: (item) => {
                        return <SView onPress={() => { SNavigation.navigate("admin/" + Parent.component + "/registro", { key: item }) }}>
                            <SIcon name={"Edit"} width={35} />
                        </SView>
                    }
                },
                // {
                //     key: "key-eliminar", label: "Eliminar", width: 70, center: true,
                //     component: (key) => {
                //         return <SView width={35} height={35} onPress={() => { SPopup.confirm({ title: "Eliminar", message: "¿Esta seguro de eliminar?", onPress: () => { Parent.Actions.eliminar(data[key], this.props) } }) }}>
                //             <SIcon name={'Delete'} />
                //         </SView>
                //     }
                // },
            ]}
            
            data={data}
            filter={(dta)=>{
                if(dta.estado != 1) return false;
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
                    SNavigation.navigate("admin/costo_envio/registro");
                }} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(lista);