import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Material } from "./material.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { MaterialDetailsDto } from './dto/material.dto';
import { Provider } from '../providers/provider.entity';

@Injectable()
export class MaterialsService {

    constructor(
        @InjectRepository(Material) private materialRepository: Repository<Material>,
        @InjectRepository(Provider) private providerRepository: Repository<Provider>
    ) { }

    public getAllMaterials(): Promise<Material[]> {
        return this.materialRepository.find({relations: ['providers', 'products']});
    }

    public async getAllProviderMaterials(id: number): Promise<Material[]> {
        const provider: Provider = await this.providerRepository.findOneBy({ id });

        if (!provider) {
            throw new HttpException(
                'Provider is not found. Cannot create material.',
                HttpStatus.BAD_REQUEST
            )
        }

        const subQueryResults = await this.materialRepository
            .createQueryBuilder('material')
            .select('material.id')
            .innerJoin('material.providers', 'provider', 'provider.id = :id', { id })
            .getMany();

        if (!subQueryResults.length) {
            return [];
        }

        return await this.materialRepository
            .createQueryBuilder('material')
            .where('material.id IN (:...subQuery)', {subQuery: subQueryResults.map(material => material.id)})
            .innerJoinAndSelect('material.providers', 'providers')
            .getMany();
    }

    public getMaterialById(id: number): Promise<Material> {
        return this.materialRepository.findOne({ where: { id }, relations: ['providers', 'products']});
    }

    public async createMaterial(id: number, materialDetails: MaterialDetailsDto): Promise<Material> {
        if (!Object.keys(materialDetails).length) {
            return null;
        }

        const provider = await this.providerRepository.findOneBy({ id });

        if (!provider) {
            throw new HttpException(
                'Provider is not found. Cannot create material.',
                HttpStatus.BAD_REQUEST
            )
        }

        const newMaterial = this.materialRepository.create({ ...materialDetails, providers: [provider] });
        return this.materialRepository.save(newMaterial);
    }

    public updateMaterial(id: number, updatedMaterialDetails: MaterialDetailsDto): Promise<UpdateResult> {
        return this.materialRepository.update({ id }, { ...updatedMaterialDetails });
    }

    public deleteMaterial(id: number): Promise<DeleteResult> {
        return this.materialRepository.delete({ id });
    }
}
