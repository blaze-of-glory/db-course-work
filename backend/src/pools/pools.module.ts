import { Module } from '@nestjs/common';
import { PoolsController } from "./pools.controller";
import { PoolsService } from "./pools.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pool } from "./pool.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Pool])],
    controllers: [PoolsController],
    providers: [PoolsService]
})
export class PoolsModule { }
