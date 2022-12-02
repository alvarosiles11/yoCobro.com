import React, { Component, TouchableOpacity, useState, Button } from 'react';
import { SDate, SIcon, SImage, SLoad, SNavigation, SText, STheme, SView, SInput, SButtom } from 'servisofts-component';
// import SSocket from 'servisofts-socket';

import horario from '../../horario';
import PButtom from '../../../../../Components/PButtom';

import { connect } from 'react-redux';


const Horario = () => {
    const [inputs, setInputs] = useState([{ key: '', value: '' }]);
    const [inputs2, setInputs2] = useState([{ key: '', value: '' }]);

    const [inputsDia, setInputsDia] = useState({key2:{key: '', value: ''}});

    const addHandler = (key2) => {
        const _inputs = [...inputs];
        _inputs.push({ key: '', value: '' });
        setInputs(_inputs);
        // console.log(JSON.stringify(_inputs));

        var _inputsDia = {...inputsDia};
         _inputsDia = { [key2]: { key: '', value: '' } };
        setInputsDia(_inputsDia)
        // console.log(JSON.stringify(_inputsDia));
      
         // switch (key2) {
        //     case "0":
        //         const _input_0 = [...input_0];
        //         _input_0.push({ dia: null, horario_inicio: '', horario_fin: '', key_restaurante: key_restaurante });
        //         setInput_0(_input_0);
        //         console.log(JSON.stringify(_input_0));
        //         break;
        //     case "1":
        //         const _input_1 = [...input_1];
        //         _input_1.push({ dia: null, horario_inicio: '', horario_fin: '' });
        //         setInput_1(_input_1);
        //         console.log(JSON.stringify(_input_1));

        //         break;
        //     case "2":
        //         const _input_2 = [...input_2];
        //         _input_2.push({ dia: null, horario_inicio: '', horario_fin: '' });
        //         setInput_2(_input_2);
        //         console.log(JSON.stringify(_input_2));
        //         break;
        //     case "3":
        //         const _input_3 = [...input_3];
        //         _input_3.push({ dia: null, horario_inicio: '', horario_fin: '' });
        //         setInput_3(_input_3);
        //         console.log(JSON.stringify(_input_3));
        //         break;
        //     case "4":
        //         const _input_4 = [...input_4];
        //         _input_4.push({ dia: null, horario_inicio: '', horario_fin: '' });
        //         setInput_4(_input_4);
        //         console.log(JSON.stringify(_input_4));
        //         break;
        //     case "5":
        //         const _input_5 = [...input_5];
        //         _input_5.push({ dia: null, horario_inicio: '', horario_fin: '' });
        //         setInput_5(_input_5);
        //         console.log(JSON.stringify(_input_5));
        //         break;
        //     case "6":
        //         const _input_6 = [...input_6];
        //         _input_6.push({ dia: null, horario_inicio: '', horario_fin: '' });
        //         setInput_6(_input_6);
        //         console.log(JSON.stringify(_input_6));
        //         break;
        //     case "-1":
        //         const _input_00 = [...input_00];
        //         _input_00.push({ dia: null, horario_inicio: '', horario_fin: '' });
        //         setInput_00(_input_00);
        //         console.log(JSON.stringify(_input_00));
        //         break;

        //     default:
        //         console.log("no hay")

        // }
    }

    const deleteHandler = (key) => {
        const _inputs = inputs.filter((input, index) => index != key);
        setInputs(_inputs);
    }

    const inputHandler = (text, key) => {
        const _inputs = [...inputs];
        _inputs[key].value = text;
        _inputs[key].key = key;
        setInputs(_inputs);
    }

    const inputHandler2 = (text, key) => {
        const _inputs2 = [...inputs];
        _inputs2[key].value = text;
        _inputs2[key].key = key;
        setInputs2(_inputs2);
    }

    var dias = new SDate.getDaysOfWeek();
    //console.log(dias);
    //alert(JSON.stringify(dias[0].text));
    dias[-1] = { text: "Feriado", value: "Fer" };
    return Object.keys(dias).map((key2, index) => {
        return <>
            <SView center  >
                <SView col={"xs-12"} >
                    <SText fontSize={15}>{dias[key2].text}</SText>
                </SView>
                {/* {inputsDia.map((input, key) => ( */}
                {inputs.map((input, key) => (

                    <SView row col={"xs-12"} center>
                        <SView col={"xs-4"}>
                            <SInput placeholder={"Hora Inicio"} value={input.value} onChangeText={(text) => inputHandler(text, key)} />
                        </SView>
                        <SView col={"xs-4"}>
                            <SInput placeholder={"Hora Fin"} value={input.value} onChangeText={(text) => inputHandler(text, key)} />
                        </SView>
                        <SView col={"xs-4"} row>
                            <SButtom type='danger' style={{ width: 50 }} onPress={() => deleteHandler(key)}>
                                <SText style={{ color: "white", fontSize: 20 }}>x</SText>
                            </SButtom>
                            <SView col={"xs-1"}></SView>
                            <SButtom type='danger' style={{ width: 50 }} onPress={() => addHandler(key2)} >
                                <SText style={{ color: "white", fontSize: 20 }}>+</SText>
                            </SButtom>
                        </SView>
                    </SView>
                ))}
            </SView>
        </>

    })
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: 'white'
//     },
//     inputsContainer: {
//         flex: 1, marginBottom: 20
//     },
//     inputContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         borderBottomWidth: 1,
//         borderBottomColor: "lightgray"
//     }
// })

//   export default HomeScreen

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Horario);
// export default (initStates)(Horario);