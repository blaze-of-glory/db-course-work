import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import { Material } from "./material.entity";
import { Provider } from '../providers/provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Material, Provider])],
  providers: [MaterialsService],
  controllers: [MaterialsController]
})
export class MaterialsModule {}
