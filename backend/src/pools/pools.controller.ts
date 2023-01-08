import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PoolsService } from "./pools.service";
import { Pool } from "./pool.entity";
import { PoolDto } from "./dto/pool.dto";

@Controller('pools')
export class PoolsController {
    constructor(private poolsService: PoolsService) { }

    @Get()
    getAllPools(): Promise<Pool[]> {
        return this.poolsService.getAllPools();
    }

    @Post()
    createPool(@Body() createPoolDto: PoolDto): Promise<Pool> {
        return this.poolsService.createPool(createPoolDto);
    }

    @Put(':id')
    async updatePoolById(@Param('id', ParseIntPipe) id: number, @Body() updatePoolDto: PoolDto): Promise<Pool> {
       await this.poolsService.updatePool(id,updatePoolDto);
       return this.poolsService.getPoolById(id);
    }

    @Delete(':id')
    async deletePoolById(@Param('id', ParseIntPipe) id: number): Promise<HttpStatus.ACCEPTED> {
        await this.poolsService.deletePool(id);
        return HttpStatus.ACCEPTED;
    }
}
