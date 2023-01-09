import { Client } from './client';

export interface Bill {
  id: string;
  title: string;
  description: string;
  amount: number;
  client: Client;
}
