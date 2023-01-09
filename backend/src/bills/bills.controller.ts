import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { BillsService } from "./bills.service";
import { Bill } from "./bill.entity";
import { BillDto } from './dto/bill.dto';

@Controller('bills')
export class BillsController {

    constructor(private billsService: BillsService) {   }

    @Get(':id')
    getBillById(@Param('id', ParseIntPipe) clientId: number): Promise<Bill> {
        return this.billsService.getBillById(clientId);
    }

    @Post(':id')
    createBill(@Param('id', ParseIntPipe) clientId: number, @Body() billDetails: BillDto): Promise<Bill> {
        return this.billsService.createBill(clientId, billDetails);
    }

    @Put(':id')
    async updateBill(@Param('id', ParseIntPipe) id: number, @Body() updatedBillDetails: BillDto): Promise<Bill> {
        await this.billsService.updateBill(id, updatedBillDetails);
        return this.billsService.getBillById(id);
    }

    @Delete(':id')
    async deleteBill(@Param('id', ParseIntPipe) id: number): Promise<HttpStatus.ACCEPTED> {
        await this.billsService.deleteBill(id);
        return HttpStatus.ACCEPTED;
    }
}
