import GoogleMapReact from "google-map-react";
import React from "react";
import { SPage, SText, SView } from "servisofts-component";

import "./App.css";

const Marcador = () => (
  <div
    style={{
      alignItems: "center",
      backgroundColor: "red",
      padding: "6px",
    }}
  ></div>
);

function App() {
  const defaultProps = {
    center: {
      lat: -17.7828686,
      lng: -63.1796417,
    },
    zoom: 14.7,
  };

  return (
    <>
      <SPage title={""} disableScroll hidden>
        <SView height={"80vh"} width={"100%"} backgroundColor={"cyan"}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBmVFt8VV6M9TF2bANTqhztIUlxf2NhrKU",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <Marcador
              lat={-17.783903160362055}
              lng={-63.18054276526859}
              text="My Marker"
            />
          </GoogleMapReact>
        </SView>
        <SView height={"20vh"} width={"100%"} backgroundColor={"white"} center>
          <SText color="black">MAP SIMPLE</SText>
        </SView>
      </SPage>
    </>
  );
}

export default App;
