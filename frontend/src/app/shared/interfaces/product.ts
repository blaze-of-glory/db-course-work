import { Client } from './client';
import { Material } from './material';

export interface Product {
  id: string;
  title: string;
  provider: Client;
  material: Material;
  img: string;
  description: string;
  type: string;
  weight: string;
  cost: string;
}
