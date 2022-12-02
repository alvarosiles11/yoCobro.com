import React, { Component } from 'react';
import { SButtom, SPage, SText, SView } from 'servisofts-component';
import GoogleLogin from 'react-google-login';
class LoginGoogle extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const responseGoogle = (response) => {
            // console.log(response);
            if (response.googleId) {
                if (this.props.onLogin) {
                    this.props.onLogin({
                        id: response?.profileObj?.googleId,
                        ...response.profileObj
                    });
                }
            }
        }
        return (
            <GoogleLogin
                clientId="885912798330-2o9o5nmpdi2nf275ng201krcbsdi945s.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                render={(renderProps) => {
                    return (
                        <SView onPress={renderProps.onClick}>{this.props.children}</SView>
                    );
                }}
            >
            </GoogleLogin>
        );
    }
}

export default LoginGoogle;