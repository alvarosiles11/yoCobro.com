import React from 'react';
import { connect } from 'react-redux';
import { SIcon, SPage, SScrollView2, SText, STheme, SView, SMapView, SMarker, SInput, SNavigation, SHr, SLoad, SPopup, SSection, } from 'servisofts-component';
import BarraSuperiorTapeke from '../../../../../Components/BarraSuperiorTapeke';
import PButtom from '../../../../../Components/PButtom';
import Parent from '../index'
import locationGoogleReducer from '../locationGoogleReducer';

class PopUpDirecciones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            find: ""
        };
    }



    getDetail() {

        if (!this.state.place_id) return null
        var detail = Parent.Actions.detail(this.state.place_id, this.props);
        if (!detail) return null;
        //con estoy devuelve el objeto json data {region, direccion, longitud, latitud}
        return detail;
    }

    getAutoComplete() {
        if (!this.state.find) return null;
        if (this.state.find.length < 3) return null;
        var geocodeList = Parent.Actions.autoComplete({ ...this.props.region, direccion: this.state.find, }, this.props);
        if (!geocodeList) return <SLoad />

        var detail = this.getDetail();
        if (detail) {
            if (this.props.callback) this.props.callback({
                ...detail,
                direccion: this.state.direccion
            })
            this.state.place_id = null;
        }
        return geocodeList.map((obj, i) => {
            // console.log(obj)
            return <SSection key={"list_iten_" + i}>
                <SHr height={10} />
                <SView col={"xs-12"} height={64} row center border={"transparent"}>
                    <SView col={"xs-2"} height={64} center>
                        <SView height={36} width={36} style={{ backgroundColor: '#E9EAEE', borderRadius: 50, }} center>
                            <SIcon name={'Marker'} height={24} width={40} fill={'#484848'} />
                        </SView>
                    </SView>
                    <SView col={"xs-10"} height={64} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray, justifyContent: 'center', }}
                        onPress={() => { var aux = this.setState({ place_id: obj.place_id, direccion: obj.direccion }); }} >
                        <SText fontSize={12} font={"Roboto"} color={STheme.color.gray} >{obj.direccion}</SText>
                    </SView>
                </SView>
            </SSection>
        });
    }

    popupAutoComplete() {
        return <>
            <SView col={"xs-10 md-6 lg-4 xl-4"} center style={{ borderRadius: 8 }} withoutFeedback backgroundColor={STheme.color.background}>
                <SView col={"xs-11"} height={400}>
                    <SHr height={20} />
                    <SView col={"xs-12"} >
                        <SInput col={"xs-12"} placeholder={"Escribir direccion..."} style={{ borderWidth: 0, height: "100%" }}
                            color={STheme.color.text} placeholderTextColor={STheme.color.gray} height={40} fontSize={12}
                            onChangeText={(text) => {
                                this.setState({ find: text })
                            }}
                        />
                    </SView>
                    <SHr height={10} />
                    <SView col={"xs-12"} flex>
                        <SScrollView2 disableHorizontal={true}>
                            <SView col={"xs-11.6"}>
                                {this.getAutoComplete()}
                            </SView>
                        </SScrollView2>
                    </SView>
                    <SHr height={30} />
                    <SText fontSize={12} font={"Roboto"} color={STheme.color.lightGray} center >sin resultados.</SText>
                    <SHr height={30} />
                </SView>
            </SView>
        </>
    }

    render() {
        return <>{this.popupAutoComplete()}</>
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(PopUpDirecciones);