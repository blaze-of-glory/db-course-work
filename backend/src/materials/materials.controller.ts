import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MaterialsService } from "./materials.service";
import { Material } from "./material.entity";
import { CreateMaterialDto } from "./dto/create-material.dto";
import { UpdateMaterialDto } from "./dto/update-material.dto";

@Controller('materials')
export class MaterialsController {

    constructor(private materialsService: MaterialsService) {   }

    @Get()
    getAllMaterials(): Promise<Material[]> {
        return this.materialsService.getAllMaterials();
    }

    @Get(':id')
    getMaterialById(@Param('id', ParseIntPipe) materialId: number): Promise<Material> {
        return this.materialsService.getMaterialById(materialId);
    }

    @Post()
    createMaterial(@Body() createMaterialDto: CreateMaterialDto): Promise<Material> {
        return this.materialsService.createMaterial(createMaterialDto.providerId, createMaterialDto.materialDetails);
    }

    @Put(':id')
    async updateMaterial(@Param('id', ParseIntPipe) materialId: number, @Body() updatedMaterialDetails: UpdateMaterialDto): Promise<Material> {
        await this.materialsService.updateMaterial(materialId, updatedMaterialDetails);
        return this.materialsService.getMaterialById(materialId);
    }

    @Delete(':id')
    async deleteMaterial(@Param('id', ParseIntPipe) materialId: number): Promise<HttpStatus.ACCEPTED> {
        await this.materialsService.deleteMaterial(materialId);
        return HttpStatus.ACCEPTED;
    }
}
