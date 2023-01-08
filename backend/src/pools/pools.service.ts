import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { Pool } from "./pool.entity";
import { PoolDto } from "./dto/pool.dto";

@Injectable()
export class PoolsService {

    constructor(@InjectRepository(Pool) private poolRepository: Repository<Pool>) { }

    public getAllPools(): Promise<Pool[]> {
        return this.poolRepository.find();
    }

    public getPoolById(id: number): Promise<Pool> {
        return this.poolRepository.findOneBy({ id });
    }

    public createPool(poolDetails: PoolDto): Promise<Pool> {
        if (!Object.keys(poolDetails).length) {
            return null;
        }
        const newPool: Pool = this.poolRepository.create({ ...poolDetails });
        return this.poolRepository.save(newPool);
    }

    public updatePool(id: number, updatePoolDetails: PoolDto): Promise<UpdateResult> {
        return this.poolRepository.update({ id }, { ...updatePoolDetails });
    }

    public deletePool(id: number): Promise<DeleteResult> {
        return this.poolRepository.delete({ id });
    }
}
