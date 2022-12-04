import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Material } from "./material.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateMaterialDto } from "./dto/create-material.dto";
import { UpdateMaterialDto } from "./dto/update-material.dto";
import { Provider } from '../providers/provider.entity';

@Injectable()
export class MaterialsService {

    constructor(
        @InjectRepository(Material) private materialRepository: Repository<Material>,
        @InjectRepository(Provider) private providerRepository: Repository<Provider>
    ) { }

    public getAllMaterials(): Promise<Material[]> {
        return this.materialRepository.find({relations: ['providers']});
    }

    public getMaterialById(id: number): Promise<Material> {
        return this.materialRepository.findOneBy({ id });
    }

    public async createMaterial(id: number, materialDetails: CreateMaterialDto): Promise<Material> {
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

    public updateMaterial(id: number, updatedMaterialDetails: UpdateMaterialDto): Promise<UpdateResult> {
        return this.materialRepository.update({ id }, { ...updatedMaterialDetails });
    }

    public deleteMaterial(id: number): Promise<DeleteResult> {
        return this.materialRepository.delete({ id });
    }
}
