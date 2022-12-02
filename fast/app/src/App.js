import React from 'react';
import { Platform } from 'react-native';
import { SComponentContainer, SNavigation } from 'servisofts-component';
import Redux, { store } from './Redux';
import SConfig from './SConfig';
import Assets from './Assets';
//Navigation
import BarraSuperior from './Components/BarraSuperior';
import Pages from './Pages';

//Socket
import SSocket, { setProps } from 'servisofts-socket'

//Other
import NavBar from './Components/NavBar';
import StatusBar from './Components/StatusBar';

import Firebase from './Firebase';
import DeviceKey from './Firebase/DeviceKey';
//----------END IMPORT----------

setProps(SConfig.SocketProps);
Firebase.init();
DeviceKey.init();

const App = (props) => {
    return (
        <Redux>
            <SComponentContainer
                assets={Assets}
                // debug //habilitar opciones tema red etc
                inputs={SConfig.SConfig_Inputs}
                theme={{ initialTheme: "default", themes: SConfig.SThemeProps, noAnimated: true }}
            >
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
                        deviceKey: DeviceKey.getKey(),
                        firebase: {
                            platform: Platform.OS,
                            token: DeviceKey.getKey(),
                            key_usuario: usuario?.key,
                            app: "Tapeke cliente app"
                        }
                    }
                }} />
                <NavBar />
            </SComponentContainer>
        </Redux>
    )
}
export default App;