import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AboutUs } from "./interfaces/about-us.interface";
import { MaterialsQueryDto } from "./dto/materialsQuery.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('about-us')
  getAboutUsData(): AboutUs {
    return this.appService.getAboutUsData();
  }

  @Get('providers')
  getAllProviders() {
    return this.appService.getAllProviders();
  }

  @Get( 'materials')
  getAvailableMaterials(@Query() query: MaterialsQueryDto) {
    if (!query.provider) {
      throw new BadRequestException('Material is missing');
    }
    return this.appService.getAvailableMaterials();
  }

}
