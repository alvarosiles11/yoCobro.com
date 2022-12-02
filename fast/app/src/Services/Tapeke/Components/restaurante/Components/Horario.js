import React, { Component, TouchableOpacity, useState, Button } from 'react';
import { SDate, SIcon, SImage, SLoad, SNavigation, SText, STheme, SView, SInput, SButtom } from 'servisofts-component';
import SSocket from 'servisofts-socket';

import { connect } from 'react-redux';

const Horario = (props) => {

    const key_restaurante = SNavigation.getParam("key");

    //const key_restaurante = "464DFGD5FG4D5F4G5D4FG5D4F"
    const [inputs, setInputs] = useState([{ key: '', value: '' }]);
    const [inputs2, setInputs2] = useState([{ key: '', value: '' }]);

    const [dataFinal, setDataFinal] = useState([{ dia: null, horario_inicio: '', horario_fin: '', key_restaurante: key_restaurante }]);


    const [input_0, setInput_0] = useState([{ dia: null, horario_inicio: '', horario_fin: '', key_restaurante: key_restaurante }]);
    const [input_1, setInput_1] = useState([{ dia: null, horario_inicio: '', horario_fin: '', key_restaurante: key_restaurante }]);
    const [input_2, setInput_2] = useState([{ dia: null, horario_inicio: '', horario_fin: '', key_restaurante: key_restaurante }]);
    const [input_3, setInput_3] = useState([{ dia: null, horario_inicio: '', horario_fin: '', key_restaurante: key_restaurante }]);
    const [input_4, setInput_4] = useState([{ dia: null, horario_inicio: '', horario_fin: '', key_restaurante: key_restaurante }]);
    const [input_5, setInput_5] = useState([{ dia: null, horario_inicio: '', horario_fin: '', key_restaurante: key_restaurante }]);
    const [input_6, setInput_6] = useState([{ dia: null, horario_inicio: '', horario_fin: '', key_restaurante: key_restaurante }]);
    const [input_00, setInput_00] = useState([{ dia: null, horario_inicio: '', horario_fin: '', key_restaurante: key_restaurante }]);

    const addHandler = (key2) => {

        var inputAdd
        var setting;
        if (key2 == -1) {
            inputAdd = eval("input_00")
            setting = eval("setInput_00")
        } else {
            inputAdd = eval("input_" + key2)
            setting = eval("setInput_" + key2)
        }
        const _inputAdd = [...inputAdd];
        _inputAdd.push({ dia: null, horario_inicio: '', horario_fin: '', key_restaurante: key_restaurante });
        setting(_inputAdd);
        console.log(JSON.stringify(_inputAdd));
    }


    const deleteHandler = (key2, key) => {

        var inputDelete
        var setting;
        if (key2 == -1) {
            inputDelete = eval("input_00")
            setting = eval("setInput_00")
        } else {
            inputDelete = eval("input_" + key2)
            setting = eval("setInput_" + key2)
        }
        console.log(JSON.stringify(inputDelete) + " " + key2 + " " + key);
        const _inputs = inputDelete.filter((input, index) => index != key);
        setting(_inputs);

    }

    const inputHandler = (text, key2, key) => {

        var inputValue
        var setting;
        if (key2 == -1) {
            inputValue = eval("input_00")
            setting = eval("setInput_00")
        } else {
            inputValue = eval("input_" + key2)
            setting = eval("setInput_" + key2)
        }

        const _inputs = [...inputValue];
        _inputs[key].horario_inicio = text;
        _inputs[key].dia = key2;
        setting(_inputs);
        //setDataFinal(_inputs);
    }

    const inputHandler2 = (text, key2, key) => {

        var inputValue
        var setting;
        if (key2 == -1) {
            inputValue = eval("input_00")
            setting = eval("setInput_00")
        } else {
            inputValue = eval("input_" + key2)
            setting = eval("setInput_" + key2)
        }

        const _inputs = [...inputValue];
        _inputs[key].horario_fin = text;
        _inputs[key].dia = key2;
        setting(_inputs);
    }

    const saveData = () => {
        var dias = new SDate.getDaysOfWeek();
        dias[-1] = { text: "Feriado", value: "Fer" };
        return Object.keys(dias).map((key2, index) => {
            var inputArray
            if (key2 == -1) {
                inputArray = eval("input_00")
            } else {
                inputArray = eval("input_" + key2)
            }
            inputArray.map((input, index) => {
                if ((input.dia != null) && (input.horario_inicio != "") && (input.horario_fin != "")) {
                    //setDataFinal(inputArray[key]);

                    alert("ok guardar")

                }
            })
        })


        //   inputArray.map((input, key) => {
        //     if((input.dia != null) && (input.horario_inicio != "") && (input.horario_fin != "")){
        //         //setDataFinal(inputArray[key]);

        //         alert("ok")

        //     }
        // })
    }



    var dias = new SDate.getDaysOfWeek();
    dias[-1] = { text: "Feriado", value: "Fer" };
    return Object.keys(dias).map((key2, index) => {
        var inputArray
        if (key2 == -1) {
            inputArray = eval("input_00")
        } else {
            inputArray = eval("input_" + key2)
        }
        // console.log(inputArray)
        //console.log(JSON.stringify(inputArray)+"---" + dias[key2].text);



        return <>
            <SView center  >
                <SView col={"xs-12"} >
                    <SText fontSize={15}>{dias[key2].text}</SText>
                </SView>
                {inputArray.map((input, key) => (
                    <SView row col={"xs-12"} center>
                        <SView col={"xs-4"}>
                            <SInput placeholder={"Hora Inicio"} value={input.horario_inicio} onChangeText={(text) => inputHandler(text, key2, key)} />
                        </SView>
                        <SView col={"xs-4"}>
                            <SInput placeholder={"Hora Fin"} value={input.horario_fin} onChangeText={(text) => inputHandler2(text, key2, key)} />
                        </SView>
                        <SView col={"xs-4"} row>
                            <SButtom type='danger' style={{ width: 50, display: inputArray.length > 1 ? "display" : "none" }} onPress={() => deleteHandler(key2, key)}>
                                <SText style={{ color: "white", fontSize: 20 }}>x</SText>
                            </SButtom>
                            <SView col={"xs-0.5"}></SView>
                            <SButtom type='success' style={{ width: 50 }} onPress={() => addHandler(key2)} >
                                <SText style={{ color: "white", fontSize: 20 }}>+</SText>
                            </SButtom>
                        </SView>
                    </SView>
                ))}

            </SView>
        </>
    })



}


const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Horario);
// export default (initStates)(Horario);