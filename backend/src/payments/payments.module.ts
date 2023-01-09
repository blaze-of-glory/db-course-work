import { Module } from '@nestjs/common';
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./payment.entity";
import { Client } from '../clients/client.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Payment, Client])],
    controllers: [PaymentsController],
    providers: [PaymentsService]
})
export class PaymentsModule { }
