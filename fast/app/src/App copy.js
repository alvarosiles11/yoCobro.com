import React from 'react';
import { SComponentContainer, SIcon, SNavigation, SText, STheme, SView } from 'servisofts-component';

import Pages from './Pages';
import Assets from './Assets';

//---------REDUX----------
import Reducer from './Reducer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
//------------------------
import SSocket, { setProps } from 'servisofts-socket'

import NavBar from './Components/NavBar';
import SConfig from './SConfig';
import BarraSuperior from './Components/BarraSuperior';
import StatusBar from './Components/StatusBar';
import Firebase from './Firebase';

setProps(SConfig.SocketProps);

const store = createStore(
    Reducer,
    {},
    applyMiddleware(reduxThunk),
);
Firebase.init();

const App = (props) => {
    // Firebase.auth().onAuthStateChanged(urs => {
    // })
    return (
        <Provider store={store}>
            <SComponentContainer
                assets={Assets}
                inputs={SConfig.SConfig_Inputs}
                theme={{ initialTheme: "default", themes: SConfig.SThemeProps, noAnimated: true }}>
                <StatusBar />
                <SNavigation props={{
                    prefixes: ["https://tapekeapp.com", "tapeke://"],
                    pages: Pages,
                    title: "App Tapeke",
                    navBar: BarraSuperior,
                }} />
                <SSocket store={store} identificarse={(props) => {
                    var usuario = props.state.usuarioReducer.usuarioLog;
                    return {
                        data: usuario ? usuario : {},
                        deviceKey: "as-asa-as",
                    }
                }} />
                <NavBar />

            </SComponentContainer>
        </Provider >
    )
}
export default App;