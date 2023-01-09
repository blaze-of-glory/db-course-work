import { Client } from './client';

export interface Payment {
  id: string;
  title: string;
  description: string;
  amount: number;
  client: Client;
}
