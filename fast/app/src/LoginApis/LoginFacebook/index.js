import React, { Component } from 'react';
import { SButtom, SPage, SText, SView } from 'servisofts-component';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


class LoginFacebook extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <FacebookLogin
                appId="1004324290192134"
                fields="id,name,first_name,last_name,email"
                callback={(resp) => {
                    if(!resp.id) return null;
                    if (this.props.onLogin) {
                        this.props.onLogin(resp);
                    }
                    console.log(resp);
                }}
                render={renderProps => (<SView onPress={renderProps.onClick}>{this.props.children}</SView>)}
            />
        );
    }
}

export default LoginFacebook;