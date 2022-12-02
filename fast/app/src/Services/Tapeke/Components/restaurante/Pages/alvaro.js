import React from 'react';
import { connect } from 'react-redux';
import { SIcon, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import BarraSuperiorTapeke from '../../../../../Components/BarraSuperiorTapeke';
import PBarraFooter from '../../../../../Components/PBarraFooter';
import Item2 from '../Components/Item2';

class alvaro extends React.Component {
 constructor(props) {
  super(props);
  this.state = {};
  this.key = SNavigation.getParam("keyUsuario");
 }


 getCategoria(icon, description, url) {
  return <>
   {/* <SView width={30} /> */}
   <SView height={28} flex border={'red'} style={{ paddingLeft: 10, paddingRight: 10, backgroundColor: STheme.color.card, borderRadius: 5, overflow: 'hidden' }} center onPress={() => { alert(description); }}>
    <SView row>
     {!icon ? null : <SView center height  >
      <SIcon name={icon} height={20} width={22} fill={!icon ? '#999999' : STheme.color.primary}/>
     </SView>}
     <SView center height={28}  >
      <SText border={'blue'} fontSize={14} color={!icon ? '#999999' : STheme.color.primary} font={"LondonMM"} bold >{description}</SText>
     </SView>
    </SView>
   </SView>
   <SView width={14} />
  </>
 }

 getCategoriasList() {
  // var categorias = categoria_farmacia.Actions.getAll(this.props);
  // if (!categorias) return <SLoad />
  return <SView col={"xs-12 md-6 lg-5 xl-4"} height={40} row>
   <SScrollView2 >
    <SView center row>
     <SView width={30} />

     {this.getCategoria('IconFilter', 'Filtros', 'restaurante/filtros')}
     {this.getCategoria('', 'Filtro: Ocultar sin packs', '000010')}
     {this.getCategoria('', 'Filtro: Preparacion', '0000102')}
     {this.getCategoria('', 'ab', '0000102')}
     {this.getCategoria('', 'Filtro: Preparacion', '0000102')}
     {this.getCategoria('', 'a', '0000102')}
     {this.getCategoria('', 'Filtro: Preparacion', '0000102')}
    </SView>
   </SScrollView2>
  </SView>
 }



 getBotonos() {
  return <>

   <SView col={"xs-10 md-5 lg-4 xl-3"} row center height={40}  >
    <SView col={"xs-6"} center height={40} backgroundColor={STheme.color.primary}>
     <SText fontSize={20} font={"Roboto"} bold color={STheme.color.white}>Lista</SText>
    </SView>
    <SView col={"xs-6"} center height={40} border={STheme.color.primary} backgroundColor={STheme.color.white}
     onPress={() => { SNavigation.navigate("restaurante/exploradorMapa"); }}>
     <SText fontSize={20} font={"Roboto"} bold color={STheme.color.primary}>Mapa</SText>
    </SView>
   </SView>
  </>
 }


 showLista() {
  return <>
   <SView height={8} border={'transparent'} />
   {this.getCategoriasList()}
   <SView height={8} border={'transparent'} />
   {this.getBotonos()}
   <SView height={20} border={'transparent'} />
   <SScrollView2 disableHorizontal={true} border={'transparent'}>
    <SView col={"xs-12"} row center height border={'transparent'} >
     <SView col={"xs-10 md-5 lg-4 xl-3"} border={'transparent'} >
      <Item2></Item2>
     </SView>
    </SView >
   </SScrollView2>
  </>
 }




 render() {
  return (
   <>
    < SPage title={''} hidden disableScroll center >
     <BarraSuperiorTapeke>
      <SView row border={'transparent'} >
       <SView height={50} width={15}>
        <SView style={{ top: 6 }} center>
         <SIcon name={"Location"} height={18} fill={STheme.color.secondary} />
        </SView>
       </SView>
       <SView height={50} style={{ justifyContent: 'center', paddingLeft: 8, paddingRight: 8, }}>
        <SText font={"Roboto"} fontSize={10} center bold color={STheme.color.secondary}>{" "}Las palmas, Santa cruz de la sierra</SText>
        <SText font={"Roboto"} fontSize={12} center bold color={STheme.color.secondary}>{" "}A menos de 30 km</SText>
       </SView>
       <SView height={50} width={25}>
        <SView style={{ top: 6 }} center>
         <SIcon name={"Back"} height={18} fill={STheme.color.secondary} style={{ transform: [{ rotate: "-90deg" }] }} />
        </SView>
       </SView>
      </SView>
     </BarraSuperiorTapeke>
     {this.showLista()}
     <PBarraFooter />
    </ SPage >
   </>
  );
 }
}
const initStates = (state) => {
 return { state }
};
export default connect(initStates)(Explorador);