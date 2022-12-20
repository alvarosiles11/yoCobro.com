import {SThemeThemes} from "servisofts-component";
import MapStyle from "./mapStyle";
import SConfig_Inputs from "./SConfig_Inputs";
const SThemeProps: SThemeThemes = {
  default: {
    barStyle: "light-content",
    barColor: "#FA790E",
    text: "#000000",
    primary: "#FA790E",
    secondary: "#ffffff",
    info: "#DE5738",
    background: "#ffffff",
    card: "#eeeeee99",
    mapStyle: MapStyle
  },
  dark: {
    barStyle: "light-content",
    barColor: "#FA790E",
    text: "#ffffff",
    primary: "#FA790E",
    secondary: "#000000",
    info: "#DE5738",
    background: "#000000",
    card: "#44444499",
    mapStyle: MapStyle
  }
};

const SocketProps = {
  name: "tapeke",
  debug: true,

  //  host: 'tapekeapp.com',
  //   ssl: true,
  host: "192.168.3.4",
  // host: "34.106.209.215",
  ssl: false,

  port: {
    native: 10042,
    web: 20042,
    http: 30042
  },
  cert:
	"MIID4jCCAsqgAwIBAgIEY6FITzANBgkqhkiG9w0BAQsFADCBsjELMAkGA1UEBhMCQk8xEjAQBgNVBAgMCUF2IEJhbnplcjETMBEGA1UEBwwKU2FudGEgQ3J1ejEXMBUGA1UECgwOU2Vydmlzb2Z0cyBTUkwxFTATBgNVBAsMDGRpc3RyaWJ1Y2lvbjEkMCIGA1UEAwwbZGlzdHJpYnVjaW9uLnNlcnZpc29mdHMuY29tMSQwIgYJKoZIhvcNAQkBFhVhbHZhcm9zaWxlc0BnbWFpbC5jb20wHhcNMjIxMjIwMDUyOTUxWhcNMjIxMjIxMDUyOTUxWjCBsjELMAkGA1UEBhMCQk8xEjAQBgNVBAgMCUF2IEJhbnplcjETMBEGA1UEBwwKU2FudGEgQ3J1ejEXMBUGA1UECgwOU2Vydmlzb2Z0cyBTUkwxFTATBgNVBAsMDGRpc3RyaWJ1Y2lvbjEkMCIGA1UEAwwbZGlzdHJpYnVjaW9uLnNlcnZpc29mdHMuY29tMSQwIgYJKoZIhvcNAQkBFhVhbHZhcm9zaWxlc0BnbWFpbC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDXF0DJCtnSQU+OHqklPLPpYsu2y1iExpfQeTvVwjaMersAcBYlXm/ngOZYXDD4HKvOBuppuGVsRcsuUyF08u+GguHRqUq/ZGguYFwpDx7Qt1yK2gcFaNctK7HzvOD59k91g51KhH/Ro6ax+DzTxdLqmPg+amOP+6IYF34LXcJfJScYntD1lkWHN7cOrJlZEHLWTTkwxIHVnEwAYwLVPPhkb7LnrA2elz9VQGAOikML98Q5dOQeEFVVrOMhpgEAYPKQTALuNCk1PDS1UseuCA8hnjo/aGhRoHhJpLdVDtlPG5QuoSOAOFv/zIVvumDQVf4rIk5oSVhveGa3w4S2pGKxAgMBAAEwDQYJKoZIhvcNAQELBQADggEBANC89AcwlsFdLqTHkNIZz9VWERKLdsUopXBOHRsT9EkSk1dqpmmLbObCEy4K8QVEPN7eeA3umk6TUFLq3/JEhwWObL3uyy/wttdaCWcpIbPr0XT74p+wU5+jV0cz2AcO2aN84CI4Y0tkeEHZxjdlwS2qiS55Jhw+1Zt+vUcix6pUlDkiF9mMaOM0OOANJsSW9m7IZgocq4hKjXqX2EgmYbN7WwlHzCeawMcyijyc5BLIksLjlmZXe0JtpG0t6/babF5gzhKwioCdrH0ZOT7dTP1IV40toSWwbaugOhwS5OL7nRVEnw3/ruzSLC7XrZBl+onUmUVCW3BKlfrxj9E3n6w=",
  apis: {roles_permisos: "https://rolespermisos.servisofts.com/http/"}
};
export default {
  SocketProps,
  SThemeProps,
  SConfig_Inputs
};
