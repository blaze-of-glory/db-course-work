import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Bill } from "./bill.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { BillDto } from './dto/bill.dto';
import { Client } from '../clients/client.entity';

@Injectable()
export class BillsService {

    constructor(
        @InjectRepository(Bill) private billRepository: Repository<Bill>,
        @InjectRepository(Client) private clientRepository: Repository<Client>
    ) { }

    public getBillById(id: number): Promise<Bill> {
        return this.billRepository.findOne({ where: { id }});
    }

    public async createBill(id: number, billDetails: BillDto): Promise<Bill> {
        if (!Object.keys(billDetails).length) {
            return null;
        }

        const client: Client = await this.clientRepository.findOneBy({ id });

        if (!client) {
            throw new HttpException(
                'Client is not found. Cannot create bill.',
                HttpStatus.BAD_REQUEST
            )
        }

        const bill: Bill = this.billRepository.create({ ...billDetails, client: client });
        return this.billRepository.save(bill);
    }

    public updateBill(id: number, updatedBillDetails: BillDto): Promise<UpdateResult> {
        return this.billRepository.update({ id }, { ...updatedBillDetails });
    }

    public deleteBill(id: number): Promise<DeleteResult> {
        return this.billRepository.delete({ id });
    }
}
