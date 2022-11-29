import GoogleMapReact from "google-map-react";
import { SPage, SView } from "servisofts-component";

import "./App.css";
import logo from "./logo.svg";

const Marcador = () => (
  <div
    style={{
      alignItems: "center",
      backgroundColor: "red",
      padding: "10px",
    }}
  ></div>
);

function App() {
  const defaultProps = {
    key: "AIzaSyBmVFt8VV6M9TF2bANTqhztIUlxf2NhrKU",
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>

      <SPage title={""} disableScroll center>
        <Marcador lat={59.955413} lng={30.337844} text="My Marker" />

        <SView height={"100vh"} width={"100%"}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBmVFt8VV6M9TF2bANTqhztIUlxf2NhrKU",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            {/* <Marcador lat={59.955413} lng={30.337844} text="My Marker" /> */}
          </GoogleMapReact>
        </SView>
      </SPage>
    </>
  );
}

export default App;
