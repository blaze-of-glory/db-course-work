import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "./client.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ClientDto } from "./dto/client.dto";

@Injectable()
export class ClientsService {

    constructor(@InjectRepository(Client) private clientRepository: Repository<Client>) { }

    public getAllClients(): Promise<Client[]> {
        return this.clientRepository.find({relations: ['payments', 'bills']});
    }

    public getClientById(id: number): Promise<Client> {
        return this.clientRepository.findOne({ where: { id }, relations: ['payments', 'bills'] });
    }

    public createClient(clientDetails: ClientDto): Promise<Client> {
        if (!Object.keys(clientDetails).length) {
            return null;
        }
        const newClient: Client = this.clientRepository.create({ ...clientDetails });
        return this.clientRepository.save(newClient);
    }

    public updateClient(id: number, updatedClientDetails: ClientDto): Promise<UpdateResult> {
        return this.clientRepository.update({ id }, { ...updatedClientDetails });
    }

    public deleteClient(id: number): Promise<DeleteResult> {
        return this.clientRepository.delete({ id });
    }

}
