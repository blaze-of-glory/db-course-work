import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ClientsService } from "./clients.service";
import { Client } from "./client.entity";
import { ClientDto } from "./dto/client.dto";

@Controller('clients')
export class ClientsController {

    constructor(private clientsService: ClientsService) {  }

    @Get()
    getAllClients(): Promise<Client[]> {
        return this.clientsService.getAllClients();
    }

    @Get(':id')
    getClientById(@Param('id', ParseIntPipe) id: number): Promise<Client> {
        return this.clientsService.getClientById(id);
    }

    @Post()
    createClient(@Body() createClientDetails: ClientDto): Promise<Client> {
        return this.clientsService.createClient(createClientDetails);
    }

    @Put(':id')
    async updateClientById(@Param('id', ParseIntPipe) id: number, @Body() updatedClientDetails: ClientDto): Promise<Client> {
        await this.clientsService.updateClient(id, updatedClientDetails);
        return this.clientsService.getClientById(id);
    }

    @Delete(':id')
    async deleteClient(@Param('id', ParseIntPipe) id: number): Promise<HttpStatus.ACCEPTED> {
        await this.clientsService.deleteClient(id);
        return HttpStatus.ACCEPTED;
    }

}
