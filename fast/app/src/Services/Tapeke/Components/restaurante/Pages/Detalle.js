import React from 'react';
import { connect } from 'react-redux';
import { SMapView, SMarker, SHr, SPage, SText, SView, SIcon, STheme, SImage, SGradient, SNavigation, SLoad, SDate, SMath } from 'servisofts-component';
import restaurante from '..';
import PButtom from '../../../../../Components/PButtom';
import SSocket from 'servisofts-socket';
import Parent from '../index';
import horario from '../../horario';
import FavoritoButtom from '../../favorito/Components/FavoritoButtom';

class Paso1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_restaurante = SNavigation.getParam('key');
    }

    render() {
        this.dataRestaurante = restaurante.Actions.getByKeyDetalle(this.key_restaurante, this.props)
        if (!this.dataRestaurante) return <SLoad />
        var cantidad = 0;
        if (this.dataRestaurante.pack) {
            cantidad = this.dataRestaurante.pack.disponibles;
        }

        return <SPage>
            <SView col={"xs-12"} height row center backgroundColor={STheme.color.card}>

                <SView col={"xs-11 sm-10 md-8 lg-4 xl-4"} height    >

                    <SHr height={18} />
                    <SView col={"xs-12"} row style={{ backgroundColor: STheme.color.white }} center>
                        <SHr height={15} />

                        <SView col={"xs-11"} row center  >
                            <SView width={60}   >
                                <SView center style={{ overflow: 'hidden', borderRadius: 30, borderWidth: 0, borderColor: STheme.color.lightGray }}
                                    width={55} height={55} backgroundColor={STheme.color.white}>
                                    <SImage src={`${SSocket.api.root}restaurante/${this.dataRestaurante.key}`} style={{ resizeMode: 'cover', }} />
                                </SView>
                            </SView>
                            <SView flex    >
                                <SText fontSize={15} font={"Roboto"} style={{ fontWeight: "bold" }}>{this.dataRestaurante.nombre}</SText>
                                <SText fontSize={13} font={"Roboto"} >{this.dataRestaurante.horario.text}</SText>
                            </SView>
                        </SView>
                        <SHr height={15} />

                    </SView>


                    <SHr height={18} />
                    <SView col={"xs-12"} row style={{ backgroundColor: STheme.color.white }} center>
                        <SView col={"xs-11"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}>
                            <SHr height={15} />
                            <SText fontSize={18} font={"Roboto"} style={{ fontWeight: "bold" }}>Descripción</SText>
                            <SHr height={5} />
                            <SText style={{ textAlign: "justify" }} fontSize={14} font={"Roboto"} >{this.dataRestaurante.descripcion}</SText>
                            <SHr height={15} />
                        </SView>
                        <SView col={"xs-11"}>
                            <SHr height={15} />
                            <SText fontSize={18} font={"Roboto"} style={{ fontWeight: "bold" }}>Dirección</SText>
                            <SHr height={5} />
                            <SText style={{ textAlign: "justify" }} fontSize={14} font={"Roboto"} >{this.dataRestaurante.direccion}</SText>
                            <SHr height={15} />
                        </SView>
                    </SView>
                    {/* <SHr height={18} />
                    <SView col={"xs-12"} row style={{ backgroundColor: STheme.color.white }} center>
                        <SView col={"xs-11"}>
                            <SHr height={15} />
                            <SText fontSize={18} font={"Roboto"} style={{ fontWeight: "bold" }}>Descripción</SText>
                            <SHr height={5} />
                            <SText style={{ textAlign: "justify" }} fontSize={14} font={"Roboto"} >{this.dataRestaurante.descripcion}</SText>
                            <SHr height={15} />
                        </SView>
                    </SView>
                    <SHr height={18} />
                    <SView col={"xs-12"} row style={{ backgroundColor: STheme.color.white }} center>
                        <SView col={"xs-11"}>
                            <SHr height={15} />
                            <SText fontSize={18} font={"Roboto"} style={{ fontWeight: "bold" }}>Dirección</SText>
                            <SHr height={5} />
                            <SText style={{ textAlign: "justify" }} fontSize={14} font={"Roboto"} >{this.dataRestaurante.direccion}</SText>
                            <SHr height={15} />
                        </SView>
                    </SView> */}


                    <SHr height={20} />
                </SView>

                {/* <SView col={"xs-11 sm-6 md-6 lg-4 xl-4  "} center backgroundColor={STheme.color.card} border={STheme.color.primary} style={{ overflow: 'hidden', borderRadius: 10 }}>
                    <SHr height={20} />
                    <SView col={"xs-12"} row center style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}>
                        <SView col={"xs-3"} center >
                            <SView center border={"red"} style={{ overflow: 'hidden', borderRadius: 30 }}
                                width={50} height={50} backgroundColor={STheme.color.white}>
                                <SImage src={`${SSocket.api.root}restaurante/${this.dataRestaurante.key}`} style={{ resizeMode: 'cover', }} />
                            </SView>
                        </SView>
                        <SView col={"xs-9"}  >
                            <SText fontSize={15} font={"Roboto"} style={{ fontWeight: "bold" }}>{this.dataRestaurante.nombre}</SText>
                            <SText fontSize={13} font={"Roboto"} >{this.dataRestaurante.horario.text}</SText>
                        </SView>
                        <SHr height={10} />
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-11"}>
                        <SText fontSize={18} font={"Roboto"} style={{ fontWeight: "bold" }}>Descripción</SText>
                        <SHr height={4} />
                        <SText style={{ textAlign: "justify" }} fontSize={14} font={"Roboto"} >{this.dataRestaurante.descripcion}</SText>
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-11"}>
                        <SText fontSize={18} font={"Roboto"} style={{ fontWeight: "bold" }}>Dirección</SText>
                        <SHr height={4} />
                        <SText style={{ textAlign: "justify" }} fontSize={14} font={"Roboto"} >{this.dataRestaurante.direccion}</SText>
                    </SView>
                    <SHr height={10} />
                </SView> */}


            </SView>
        </SPage>
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Paso1);