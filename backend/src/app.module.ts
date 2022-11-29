import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './core/app.controller';
import { AppService } from './core/app.service';
import { ProductsModule } from './products/products.module';
import { EmployeesModule } from './employees/employees.module';
import { ShopsModule } from './shops/shops.module';
import { credentials } from "../credentials";
import { Shop } from "./shops/shop.entity";
import { Employee } from "./employees/employee.entity";
import { Product } from "./products/product.entity";
import { ProvidersModule } from './providers/providers.module';
import { Provider } from "./providers/provider.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: credentials.login,
      password: credentials.password,
      database: credentials.database,
      entities: [Shop, Employee, Product, Provider],
      synchronize: true
    }),
    ProductsModule,
    EmployeesModule,
    ShopsModule,
    ProvidersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
