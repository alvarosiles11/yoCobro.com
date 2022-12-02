import React, { Component } from 'react';
import { SView } from 'servisofts-component';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';

GoogleSignin.configure();

class LoginGoogle extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo });
            GoogleSignin.signOut();
            // console.log(userInfo);
            if (userInfo.user) {
                if (this.props.onLogin) {
                    this.props.onLogin(userInfo.user);
                }
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            } else if (error.code === statusCodes.IN_PROGRESS) {
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            } else {
            }
        }
    };
    render() {
        return (
            <SView onPress={this.signIn}>
                {this.props.children}
            </SView>
        );
    }
}

export default LoginGoogle;