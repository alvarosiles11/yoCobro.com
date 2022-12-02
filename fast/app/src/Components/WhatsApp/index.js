import React, { Component } from 'react';
import { Linking, Platform } from 'react-native'

export default class WhatsApp {
    static send({ phone, menssage }) {
        var msn = encodeURIComponent(menssage);
        phone = phone.replace(/\s/g, '');
        Linking.openURL("https://wa.me/" + phone + "?text=" + msn)

        // if (Platform.OS == "android" || Platform.OS == "ios") {
        //     Linking.openURL(`whatsapp://send?text=${mensaje}`);
        // } else {
        //     window.open("https://wa.me/59175548132?text=" + msn)
        // }
    }
}
