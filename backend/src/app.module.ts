import { Module } from '@nestjs/common';
import { AppController } from './core/app.controller';
import { AppService } from './core/app.service';
import { ProductsModule } from './products/products.module';
import { EmployeesModule } from './employees/employees.module';
import { ShopsModule } from './shops/shops.module';

@Module({
  imports: [ProductsModule, EmployeesModule, ShopsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
