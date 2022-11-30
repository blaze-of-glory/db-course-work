import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import { Material } from "./material.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Material])],
  providers: [MaterialsService],
  controllers: [MaterialsController]
})
export class MaterialsModule {}
