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
    getMaterialById(@Param('id', ParseIntPipe) id: number): Promise<Material> {
        return this.materialsService.getMaterialById(id);
    }

    @Post()
    createMaterial(@Body() createMaterialDetails: CreateMaterialDto): Promise<Material> {
        return this.materialsService.createMaterial(createMaterialDetails);
    }

    @Put(':id')
    async updateMaterial(@Param('id', ParseIntPipe) id: number, @Body() updatedMaterialDetails: UpdateMaterialDto): Promise<Material> {
        await this.materialsService.updateMaterial(id, updatedMaterialDetails);
        return this.materialsService.getMaterialById(id);
    }

    @Delete(':id')
    async deleteMaterial(@Param('id', ParseIntPipe) id: number): Promise<HttpStatus.ACCEPTED> {
        await this.materialsService.deleteMaterial(id);
        return HttpStatus.ACCEPTED;
    }
}
