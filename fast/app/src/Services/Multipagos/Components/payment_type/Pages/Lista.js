import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SLoad, SPage, STable2, SView } from 'servisofts-component';
import TipoPago from '../Components/TipoPago';
import Parent from '../index';



class Lista extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getContent() {
    var data = Parent.Actions.getAll(this.props);
    if (!data) return <SLoad />;
    return <STable2
      header={[
        // { key: "index", label: "#", width: 50 },
        { key: "-", label: "type", width: 150 },
        // { key: "key-editar", label: "Editar", width: 50, center: true, component: (item) => { return <SView onPress={() => { SNavigation.navigate(Parent.component + "/registro", { key: item }) }}> <SIcon name={"Edit"} width={35} /></SView> } },
      ]}
      data={data}
    />
  }


  render() {
    return (
      <SPage title={'Lista de ' + Parent.component} disableScroll center>
              <SView >

          <TipoPago callback={(resp) => {
          this.setState({ tipoPagoSeleccionado: resp.tipopago });
        }} />

        {this.getContent()}
     
      </SView>
      </SPage>
    )
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(Lista);