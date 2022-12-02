import { SPageListProps } from 'servisofts-component'
import payment_order from './Components/payment_order';
import payment_type from './Components/payment_type';


const ServiceName = "multipagos";
const Pages: SPageListProps = {
    ...payment_type.Pages,
    ...payment_order.Pages,
  
    
}

const Reducers = {
    ...payment_type.Reducers,
    ...payment_order.Reducers,
 
}

export default {
    ServiceName,
    Pages,
    Reducers

};

