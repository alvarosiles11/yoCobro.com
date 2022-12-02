import { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SMapView, SMarker, SNavigation, SPage, SView } from 'servisofts-component';
import BarraSuperiorTapeke from '../Components/BarraSuperiorTapeke';

const datos=[{'codigo': 1,'empresa':'servisofts','fecha':'06/01/2022','hora':'16:18:00','latitud':'-17.780430023320765','longitud':'-63.17495535880358','grupo':'anillo 10'},
{'codigo': 2,'empresa':'servisofts','fecha':'07/01/2022','hora':'17:18:00','latitud':'-17.78322832197151','longitud':'-63.174300205346256','grupo':'anillo 1'},
{'codigo': 3,'empresa':'servisofts','fecha':'08/01/2022','hora':'18:18:00','latitud':'-17.785726853340996','longitud':'-63.173299390435176','grupo':'anillo 1'},
{'codigo': 4,'empresa':'servisofts','fecha':'09/01/2022','hora':'19:18:00','latitud':'-17.788011950409174','longitud':'-63.17283025476309','grupo':'anillo 1'},
{'codigo': 5,'empresa':'servisofts','fecha':'10/01/2022','hora':'20:18:00','latitud':'-17.78893972583567','longitud':'-63.17494136528752','grupo':'anillo 1'},
{'codigo': 6,'empresa':'servisofts','fecha':'11/01/2022','hora':'21:18:00','latitud':'-17.789085740165323','longitud':'-63.17750111141945','grupo':'anillo 1'},
{'codigo': 7,'empresa':'servisofts','fecha':'12/01/2022','hora':'22:18:00','latitud':'-17.790328213462328','longitud':'-63.18399509788528','grupo':'anillo 1'},
{'codigo': 8,'empresa':'servisofts','fecha':'13/01/2022','hora':'23:18:00','latitud':'-17.78691861488884','longitud':'-63.18554273017388','grupo':'anillo 1'},
{'codigo': 9,'empresa':'servisofts','fecha':'14/01/2022','hora':'0:18:00','latitud':'-17.783335576753103','longitud':'-63.1849358155509','grupo':'anillo 1'},
{'codigo': 10,'empresa':'servisofts','fecha':'15/01/2022','hora':'1:18:00','latitud':'-17.780287162122978','longitud':'-63.18185786356161','grupo':'anillo 1'},
{'codigo': 11,'empresa':'servisofts','fecha':'16/01/2022','hora':'2:18:00','latitud':'-17.78089068004462','longitud':'-63.178863989391196','grupo':'anillo 1'},
{'codigo': 12,'empresa':'servisofts','fecha':'17/01/2022','hora':'3:18:00','latitud':'-17.785701824917552','longitud':'-63.18024472015847','grupo':'anillo 1'},
{'codigo': 13,'empresa':'servisofts','fecha':'18/01/2022','hora':'4:18:00','latitud':'-17.784358184886056','longitud':'-63.182535822860196','grupo':'anillo 1'},
{'codigo': 14,'empresa':'servisofts','fecha':'19/01/2022','hora':'5:18:00','latitud':'-17.775725966748137','longitud':'-63.19019177230439','grupo':'anillo 1'},
{'codigo': 15,'empresa':'servisofts','fecha':'20/01/2022','hora':'6:18:00','latitud':'-17.772841669303233','longitud':'-63.18671500247983','grupo':'anillo 1'},
{'codigo': 16,'empresa':'servisofts','fecha':'21/01/2022','hora':'7:18:00','latitud':'-17.7720379662059 ','longitud':'-63.18236556971132','grupo':'anillo 1'},
{'codigo': 17,'empresa':'servisofts','fecha':'22/01/2022','hora':'8:18:00','latitud':'-17.772160957624944','longitud':'-63.17831499339745','grupo':'anillo 1'},
{'codigo': 18,'empresa':'servisofts','fecha':'23/01/2022','hora':'9:18:00','latitud':'-17.774245506628485','longitud':'-63.17532689956337','grupo':'anillo 1'},
{'codigo': 19,'empresa':'servisofts','fecha':'24/01/2022','hora':'10:18:00','latitud':'-17.774918865813515','longitud':'-63.16792261094122','grupo':'anillo 1'},
{'codigo': 20,'empresa':'servisofts','fecha':'05/01/2022','hora':'11:18:00','latitud':'-17.77873324492316','longitud':'-63.168984711531415','grupo':'anillo 1'},
{'codigo': 21,'empresa':'servisofts','fecha':'06/01/2022','hora':'16:18:00','latitud':'-17.785924506964655','longitud':'-63.16860025957565','grupo':'anillo 2'},
{'codigo': 22,'empresa':'servisofts','fecha':'07/01/2022','hora':'17:18:00','latitud':'-17.795512295458874','longitud':'-63.174393943219016','grupo':'anillo 2'},
{'codigo': 23,'empresa':'servisofts','fecha':'08/01/2022','hora':'18:18:00','latitud':'-17.797893472519387','longitud':'-63.18487114615332','grupo':'anillo 2'},
{'codigo': 24,'empresa':'servisofts','fecha':'09/01/2022','hora':'19:18:00','latitud':'-17.796866643724535','longitud':'-63.18946406495324','grupo':'anillo 2'}
];

class TestMapa extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getRestaurante() {
        // var filtro = filtros.Actions.getFiltrosActivos(this.props);
        // var data = Parent.Actions.getAllFilter(filtro, this.props);
        // if (!datos) return null;
        let size = 70;
        return datos.map((obj, index) => {

            // return JSON.stringify(obj.latitud);

            return <SMarker key={"marker" + index} lat={obj.latitud} lng={obj.longitud} data={obj} onPress={() => {
                SNavigation.navigate("restaurante/perfil", { key: obj.codigo });
            }} >
            <SIcon name={"Marker"} width={30} height={30} fill={"#4285F4"} />
            </SMarker>
        })
    }
 
    showMapa() {
        // var miDireccion = this.props.state.direccion_usuarioReducer.miDireccion;
        // var miDistancia = this.props.state.direccion_usuarioReducer.miDistancia;
        return <>
            <SView col={"xs-12"} flex>
                <SMapView initialRegion={
                    {

                         latitude: '-17.77873324492316',
                        longitude: '-63.168984711531415',
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    
                    preventCenter>
                    {/* {this.getRestaurante()} */}

                    <SMarker lat={'-17.77873324492316'} lng={'-63.168984711531415'} >
                        <SIcon name={"Marker"} width={30} height={30} fill={"#4285F4"} />
                    </SMarker>
                </SMapView>
            </SView>

        </>
    }

    render() {
        return (
            <SPage title={'Test'} disableScroll center>
       <BarraSuperiorTapeke>
                    {/* <Direccion /> */}
                </BarraSuperiorTapeke>
<SView col={"xs-12"} flex >
                    {this.showMapa()}
                </SView>

 
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(TestMapa);