import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProvidersService } from "./providers.service";
import { Provider } from "./provider.entity";
import { CreateProviderDto } from "./dto/create-provider.dto";
import { UpdateProviderDto } from "./dto/update-provider.dto";

@Controller('providers')
export class ProvidersController {

    constructor(private providersService: ProvidersService) {  }

    @Get()
    getAllProviders(): Promise<Provider[]> {
        return this.providersService.getAllProviders();
    }

    @Get(':id')
    getProviderById(@Param('id', ParseIntPipe) id: number): Promise<Provider> {
        return this.providersService.getProviderById(id);
    }

    @Post()
    createProvider(@Body() createProviderDetails: CreateProviderDto): Promise<Provider> {
        return this.providersService.createProvider(createProviderDetails);
    }

    @Put(':id')
    async updateProviderById(@Param('id', ParseIntPipe) id: number, @Body() updatedProviderDetails: UpdateProviderDto): Promise<Provider> {
        await this.providersService.updateProvider(id, updatedProviderDetails);
        return this.providersService.getProviderById(id);
    }

    @Delete(':id')
    async deleteProvider(@Param('id', ParseIntPipe) id: number): Promise<HttpStatus.ACCEPTED> {
        await this.providersService.deleteProvider(id);
        return HttpStatus.ACCEPTED;
    }

}
