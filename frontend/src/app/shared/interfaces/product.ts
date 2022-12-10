import { Provider } from './provider';
import { Material } from './material';

export interface Product {
  id: string;
  title: string;
  provider: Provider;
  material: Material;
  img: string;
  description: string;
  type: string;
  weight: string;
  cost: string;
}
