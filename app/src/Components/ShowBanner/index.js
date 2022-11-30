import React, { Component } from 'react';
import { connect } from "react-redux";
import { SIcon, SText, SView } from "servisofts-component";




class ShowBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // componentDidMount() {
    //     if (!usuario.Actions.validateSession(this.props)) { return <SLoad />; }
    //     SBLocation.addListener((data) => {
    //         this.setState({ isActive: SBLocation.isStarted() })
    //         console.log(data);
    //     })
    // }


    render() {
        // if (!SBLocation.isStarted()) {
            return <SView col={"xs-12 md-12 lg-10 xl-8"} height={60} row center style={{ position: 'absolute', top: 0, backgroundColor: "red", }}  >
                <SView col={"xs-11 "} height row center >
                    <SView width={50} border={"transparent"}>
                        <SIcon name="SwitchOff2" fill="none" width={40} height={40} center />
                    </SView>
                    <SView flex row style={{ justifyContent: 'flex-start' }} >
                        <SView col={"xs-12 "} height={6} />
                        <SText col={"xs-12 "} color={'white'} style={{ fontSize: 16 }} bold>¡Estas desconectado!</SText>
                        <SText col={"xs-12 "} color={'white'} style={{ fontSize: 10 }} >Conéctese en línea para comenzar a aceptar viajes.</SText>
                    </SView>
                </SView>
            </SView>
        // } else {
        //     return <SView col={"xs-12 md-12 lg-10 xl-8"} center height={60} style={{ position: 'absolute', top: 0, backgroundColor: "#2BC25F", }}  >
        //         <SView col={"xs-11  "} height>
        //             <SView flex center  >
        //                 <SText color={'white'} style={{ fontSize: 16 }} bold>Buscando Restaurantes...</SText>
        //             </SView>
        //         </SView>
        //     </SView>
        // }
    }
}
const initStates = (state) => {
    return { state };
};
export default connect(initStates)(ShowBanner);