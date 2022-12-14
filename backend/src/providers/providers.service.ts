import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Provider } from "./provider.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ProviderDto } from "./dto/provider.dto";

@Injectable()
export class ProvidersService {

    constructor(@InjectRepository(Provider) private providerRepository: Repository<Provider>) { }

    public getAllProviders(): Promise<Provider[]> {
        return this.providerRepository.find({relations: ['materials', 'products']});
    }

    public getProviderById(id: number): Promise<Provider> {
        return this.providerRepository.findOne({ where: { id }, relations: ['materials', 'products'] });
    }

    public createProvider(providerDetails: ProviderDto): Promise<Provider> {
        if (!Object.keys(providerDetails).length) {
            return null;
        }
        const newProvider = this.providerRepository.create({ ...providerDetails });
        return this.providerRepository.save(newProvider);
    }

    public updateProvider(id: number, updatedProviderDetails: ProviderDto): Promise<UpdateResult> {
        return this.providerRepository.update({ id }, { ...updatedProviderDetails });
    }

    public deleteProvider(id: number): Promise<DeleteResult> {
        return this.providerRepository.delete({ id });
    }

}
