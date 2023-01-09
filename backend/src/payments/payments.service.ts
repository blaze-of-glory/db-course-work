import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "./payment.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { PaymentDto } from './dto/payment.dto';
import { Client } from '../clients/client.entity';

@Injectable()
export class PaymentsService {

    constructor(
        @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
        @InjectRepository(Client) private clientRepository: Repository<Client>,
    ) { }

    public getPaymentById(id: number): Promise<Payment> {
        return this.paymentRepository.findOne({ where: { id }});
    }

    public async createPayment(id: number, paymentDetails: PaymentDto): Promise<Payment> {
        if (!Object.keys(paymentDetails).length) {
            return null;
        }

        const client: Client = await this.clientRepository.findOneBy({ id });

        if (!client) {
            throw new HttpException(
                'Client is not found. Cannot create payment.',
                HttpStatus.NOT_FOUND
            )
        }

        const payment: Payment = this.paymentRepository.create({ ...paymentDetails, client: client });
        return this.paymentRepository.save(payment);
    }

    public updatePayment(id: number, updatedPaymentDetails: PaymentDto): Promise<UpdateResult> {
        return this.paymentRepository.update({ id }, { ...updatedPaymentDetails });
    }

    public deletePayment(id: number): Promise<DeleteResult> {
        return this.paymentRepository.delete({ id });
    }
}
