import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './core/app.controller';
import { AppService } from './core/app.service';
import { ProductsModule } from './products/products.module';
import { EmployeesModule } from './employees/employees.module';
import { ShopsModule } from './shops/shops.module';
import { credentials } from "../credentials";
import { Shop } from "./shops/shop.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: credentials.login,
      password: credentials.password,
      database: credentials.database,
      entities: [Shop],
      synchronize: true
    }),
    ProductsModule,
    EmployeesModule,
    ShopsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
