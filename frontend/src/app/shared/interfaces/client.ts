import { Payment } from './payment';
import { Bill } from './bill';

export interface Client {
  id: string;
  img: string;
  name: string;
  surname: string;
  description: string;
  registrationDate: string;
  payments?: Payment[];
  bills?: Bill[];
}
