import { Module } from '@nestjs/common';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Provider } from "./provider.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Provider])],
  controllers: [ProvidersController],
  providers: [ProvidersService]
})
export class ProvidersModule {}
