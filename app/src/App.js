import GoogleMapReact from "google-map-react";
import React from "react";
import { SView } from "servisofts-component";

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
      <SView height={"100vh"} width={"100%"} backgroundColor={"cyan"}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBmVFt8VV6M9TF2bANTqhztIUlxf2NhrKU",
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <SView
            height={24}
            width={24}
            center
            backgroundColor={"blue"}
            onPress={() => {
              alert("ddd");
              // NavBar2.open();
            }}
          >
            {/* <SIcon
              name={"AppAlert"}
              width={24}
              height={24}
              fill={STheme.color.secondary}
            /> */}
          </SView>

          <Marcador
            lat={-17.783903160362055}
            lng={-63.18054276526859}
            text="My Marker"
          />
        </GoogleMapReact>
      </SView>
    </>
  );
}

export default App;
