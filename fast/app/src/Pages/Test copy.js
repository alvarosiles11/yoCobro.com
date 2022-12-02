import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SNavigation, SPage, SText, STheme, SView, } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import LogoCargando from '../Components/LogoCargando';
import PButtom from '../Components/PButtom';
import { Text, View, StyleSheet, Linking, TouchableOpacity, Alert, Platform } from 'react-native';
import SExpandable from '../Components/SExpandable';
class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    getDias() {
        var dias = new SDate().addMonth(1).setDay(0).getDay();
        var curDate = new SDate();
        var arr = Array.from(Array(dias - curDate.getDay() + 1).keys())
        return arr.map((i) => {
            var day = i + curDate.getDay();
            var fecha = new SDate().setDay(day);
            var isCurrent = fecha.toString("yyyy-MM-dd") == new SDate().toString("yyyy-MM-dd");
            return <SText>{fecha.toString("MON,dd") + "\t"} d= {fecha.getDayOfWeek()} {"\t"} {fecha.getDayOfWeekJson().text}  {isCurrent ? "(HOY)" : ""}</SText>
        })
    }


    render() {
        return (
            <SPage title={'Test'} disableScroll center>

                <PButtom fontSize={16} onPress={() => {

                    const latitude = "-17.754099469769788";
                    const longitude = "-63.19945794336029";
                    const label = "Centro Comercial Ventura Mall";

                    var latLng = latitude + "," + longitude
                    const url = Platform.select({
                        ios: "maps:" + latLng + "?q=" + label + "@" + latLng,
                        android: "geo:" + latLng + "?q=" + latLng + "(" + label + ")"
                    });
                    Linking.openURL(url);
                }}>Llévame</PButtom>

                {/* <SExpandable type={"bottom"}  >
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                    <SText>{"Hola soy expandable"}</SText>
                </SExpandable> */}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Test);