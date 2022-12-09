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
  ssl: false,

  port: {
    native: 10040,
    web: 20040,
    http: 30040
  },
  cert:
    "MIID2DCCAsCgAwIBAgIEY45woTANBgkqhkiG9w0BAQsFADCBrTELMAkGA1UEBhMCQk8xEjAQBgNVBAgMCUF2IEJhbnplcjETMBEGA1UEBwwKU2FudGEgQ3J1ejEXMBUGA1UECgwOU2Vydmlzb2Z0cyBTUkwxETAPBgNVBAsMCGdlb2xvZ2lhMSAwHgYDVQQDDBdnZW9sb2dpYS5zZXJ2aXNvZnRzLmNvbTEnMCUGCSqGSIb3DQEJARYYcmlja3kucGF6LmQuOTdAZ21haWwuY29tMB4XDTIyMTIwNTIyMjg0OVoXDTIyMTIwNjIyMjg0OVowga0xCzAJBgNVBAYTAkJPMRIwEAYDVQQIDAlBdiBCYW56ZXIxEzARBgNVBAcMClNhbnRhIENydXoxFzAVBgNVBAoMDlNlcnZpc29mdHMgU1JMMREwDwYDVQQLDAhnZW9sb2dpYTEgMB4GA1UEAwwXZ2VvbG9naWEuc2Vydmlzb2Z0cy5jb20xJzAlBgkqhkiG9w0BCQEWGHJpY2t5LnBhei5kLjk3QGdtYWlsLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANeXSvnjsYPGq4FdB2ABDwrUVjVHLagn+gyPjBvJ6Z27L3I60KL8NtJ9zAedgRAvg5+f6dTCrbTOorVN2opgqQc9q0Bnm32hSkQFaV30nNIeoDzNDrbKAafw+mwg0OLbJjwZPCOrlNMFejRcPoQtIfvaGSJlFG1MG+ey9Lb+PnWq1aKmJiM6eTJTu/BlFEfUhvgUENqNFTSmHnBBLTjhUCO71bWjVeeecKg6bv2YS3tNFeLMMhWSlZ504T6xjUDUoLX9KF80NKSxPDAUNNrpMD38EAHSj7ShZ5PVFXzj1eBY5js27YtzTDvsvz/Jou7tPgsp/KuG4YZKw502Ky5ePoECAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAlchLAN9gjZEwUtyQygQfXzKRpYAIIzgMPOwkWt+MHQzLtGMd7kxBskpqqdMpN/KqosCFZoT+vBKZr8P7Q5OdsyItxSRT4NHvMimKEckCZgsz/MffaQFBeXTyMvEcWBUeiXofAMRY5NjWIS/qr4spCZ1rDs4wQtDmDys7SO8iOrrYUxVrBeW9cbHX2Xg857a7nw47AQceeGO71I0hn4jGFyr1R1jfocUrZ9Ja8v3SPHVEZ8jDy/t7zGbArbYhFBsz+HIjwQRAyMgE6hJtf3q6mFCEFIidtQhxhm35DZBPu5NzwmPDVlR3p8lLWtZV/1Cb1xsiaT5EQNLH2OIUKdMXxw==",
  // "MIID0DCCArigAwIBAgIEYgRJTTANBgkqhkiG9w0BAQsFADCBqTELMAkGA1UEBhMCQk8xEjAQBgNVBAgMCUF2IEJhbnplcjETMBEGA1UEBwwKU2FudGEgQ3J1ejEXMBUGA1UECgwOU2Vydmlzb2Z0cyBTUkwxDzANBgNVBAsMBnRhcGVrZTEeMBwGA1UEAwwVdGFwZWtlLnNlcnZpc29mdHMuY29tMScwJQYJKoZIhvcNAQkBFhhyaWNreS5wYXouZC45N0BnbWFpbC5jb20wHhcNMjIwMjA5MjMwNzU3WhcNMjIwMjEwMjMwNzU3WjCBqTELMAkGA1UEBhMCQk8xEjAQBgNVBAgMCUF2IEJhbnplcjETMBEGA1UEBwwKU2FudGEgQ3J1ejEXMBUGA1UECgwOU2Vydmlzb2Z0cyBTUkwxDzANBgNVBAsMBnRhcGVrZTEeMBwGA1UEAwwVdGFwZWtlLnNlcnZpc29mdHMuY29tMScwJQYJKoZIhvcNAQkBFhhyaWNreS5wYXouZC45N0BnbWFpbC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCaIRwLARQqohcmnm44B3Qca60sKgo/H6tXeQ7tQyvrMAmNZ2mcod0xDpUFnyEu9Ua+Bb9kF1PCPB0udqLmKG5ZeXoHkSRNF/yM++IxzjUDjNw13hyh/2cfi7GvEC2gUer5TBl0ZJWVGGcXUywlFo5DtH2uAbO8QKnnpqYEqAH9fbiP9P7TqbpkbEcMz8bgsDc8+RJB5nqcc/jdUCRA9n6a1ey3ncH26qtInsp/m0reF+MTJBzMJbYU9erUAP/GKcwmy4NE2UiFwu0QDF6AjuaI3m3FJ5Gp2z59aJeaXdHAx2SiB0wsZuw6Xun29RcGZ2KQk6iIkKg+xFU9E7AnI33BAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAGASGpT2VF+qrPj8cRwMIttnsxT/eOKWjG6gL3RewnBen7bTmAg4qjZ4TYLte6aLbbu6V/WDh52WN5rarLj3/KOHfcKmsKHpjfCuapcGEisRvB9Hpx9sePqxsEm0wjjpyfArX+Yd2E6/hFeeDnWitjgtMe5NvvSDdnVOaUliZPzbMlUT+SB60zZC00PhNCJIr+uKdApVRBabMUMNlZoM5O2fiJ7KlpKnkZWh4Xsgs2cb97pbOYfXo5NU9C+F2tjoAOkBUZVXduKTnYeojvWgyK1YNDzOeX4F3gAXpwkXdH38NtuIpSKDsMmfWRk+YU931YYAck6aBhTSEGvRe3OdQHM=",
  apis: {
    roles_permisos: "https://rolespermisos.servisofts.com/http/"
  }
};
export default {
  SocketProps,
  SThemeProps,
  SConfig_Inputs
};
