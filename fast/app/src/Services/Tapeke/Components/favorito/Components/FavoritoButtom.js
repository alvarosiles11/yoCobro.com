import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SIcon, SLoad, SView } from 'servisofts-component'
import { connect } from 'react-redux';
import favorito from '..';

class FavoritoButtom extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    getContent() {
        var isFavorito = favorito.Actions.getByKeyRestauranteAndKeyUsuario(this.props.data.key, this.props.state.usuarioReducer.usuarioLog.key, this.props);
        if (!isFavorito) return <SLoad />
        this.favData = isFavorito;
        let size = 30;
        if (this.props.size) {
            size = this.props.size;
        }
        return <SIcon
            name={'Favorite'}
            height={size} width={size}
            fill={isFavorito == "void" ? "#ADB5BD" : '#FA4A0C'}

        />
    }
    render() {

        return (
            <SView height={35} width={35} style={{
                borderRadius: 50, overflow: 'hidden', backgroundColor: 'white',
                // padding:'10%' ,
            }} center onPress={() => {
                if (this.favData == "void") {
                    favorito.Actions.registro({ key_restaurante: this.props.data.key }, this.props);
                } else {
                    console.log(this.favData)
                    favorito.Actions.eliminar(this.favData, this.props);
                }
            }}>
                {this.getContent()}
            </SView>
        )
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(FavoritoButtom);