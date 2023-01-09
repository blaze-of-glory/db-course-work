import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PaymentsService } from "./payments.service";
import { Payment } from "./payment.entity";
import { PaymentDto } from './dto/payment.dto';

@Controller('payments')
export class PaymentsController {
    constructor(private paymentsService: PaymentsService) { }

    @Get(':id')
    getPaymentById(@Param('id', ParseIntPipe) id: number): Promise<Payment> {
        return this.paymentsService.getPaymentById(id);
    }

    @Post(':id')
    createPayment(@Param('id', ParseIntPipe) clientId: number, @Body() paymentDetails: PaymentDto): Promise<Payment> {
        return this.paymentsService.createPayment(clientId, paymentDetails);
    }

    @Put(':id')
    async updatePaymentById(@Param('id', ParseIntPipe) id: number, @Body() updatedPaymentDetailsDto: PaymentDto): Promise<Payment> {
        await this.paymentsService.updatePayment(id, updatedPaymentDetailsDto);
        return this.paymentsService.getPaymentById(id);
    }

    @Delete(':id')
    async deletePaymentById(@Param('id', ParseIntPipe) id: number): Promise<HttpStatus.ACCEPTED> {
        await this.paymentsService.deletePayment(id);
        return HttpStatus.ACCEPTED;
    }

}
