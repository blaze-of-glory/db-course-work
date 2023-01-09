import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import { Bill } from "./bill.entity";
import { Client } from '../clients/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, Client])],
  providers: [BillsService],
  controllers: [BillsController]
})
export class BillsModule {}
