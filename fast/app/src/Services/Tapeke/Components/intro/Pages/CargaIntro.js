import React from 'react';
import { connect } from 'react-redux';
import { SHr, SPage, SText, SNavigation, SThread,SView, SIcon} from 'servisofts-component';
  class CargaIntro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 3000,
        };
    }

    redirect() {
       
            SNavigation.replace("intro/paso1");
       
    }
    hilo() {
        new SThread(this.state.delay, "cargaHilo", true).start(() => {
            this.redirect();
        });
    }
    
    render() {
        this.hilo()
        return (
            <SPage hidden disableScroll center>
                <SHr height={52} />
                <SView col={"xs-9 sm-7 md-5 lg-4 xl-3"} height={200}>
                    <SIcon name={"Logosolo"} />
                </SView>
                <SHr height={62} />
                <SView col={"xs-8 sm-6 md-4 lg-3 xl-2"} height={200} center> 
                   <SText>Iniciando...</SText>
                </SView>
                <SHr height={32} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CargaIntro);