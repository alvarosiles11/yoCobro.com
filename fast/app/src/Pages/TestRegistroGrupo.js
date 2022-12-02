import { Component } from 'react';
import { connect } from 'react-redux';
import { SPage } from 'servisofts-component';
import PButtom from '../Components/PButtom';

class TestRegistroGrupo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

 
    render() {
        return (
            <SPage title={'Test'} disableScroll center>

                <PButtom fontSize={16} >TestRegistroGrupo</PButtom>
 
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(TestRegistroGrupo);