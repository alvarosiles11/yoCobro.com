import {SPageListProps} from "servisofts-component";
import grupos from "./Components/grupos";
import Ubicacion from "./Components/Ubicacion";

const ServiceName = "geologia";

const Pages: SPageListProps = {
  ...grupos.Pages,
  ...Ubicacion.Pages
};

const Reducers = {
  ...grupos.Reducers,
  ...Ubicacion.Reducers
};

export default {
  ServiceName,
  Pages,
  Reducers
};
