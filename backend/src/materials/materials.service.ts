import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Material } from "./material.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateMaterialDto } from "./dto/create-material.dto";
import { UpdateMaterialDto } from "./dto/update-material.dto";

@Injectable()
export class MaterialsService {

    constructor(@InjectRepository(Material) private materialRepository: Repository<Material>) { }

    public getAllMaterials(): Promise<Material[]> {
        return this.materialRepository.find();
    }

    public getMaterialById(id: number): Promise<Material> {
        return this.materialRepository.findOneBy({ id });
    }

    public createMaterial(materialDetails: CreateMaterialDto): Promise<Material> {
        if (!Object.keys(materialDetails).length) {
            return null;
        }
        const newMaterial = this.materialRepository.create({ ...materialDetails });
        return this.materialRepository.save(newMaterial);
    }

    public updateMaterial(id: number, updatedMaterialDetails: UpdateMaterialDto): Promise<UpdateResult> {
        return this.materialRepository.update({ id }, { ...updatedMaterialDetails });
    }

    public deleteMaterial(id: number): Promise<DeleteResult> {
        return this.materialRepository.delete({ id });
    }
}
