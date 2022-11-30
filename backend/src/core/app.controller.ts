import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AboutUs } from "./interfaces/about-us.interface";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('about-us')
  getAboutUsData(): AboutUs {
    return this.appService.getAboutUsData();
  }
}
