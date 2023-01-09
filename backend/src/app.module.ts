import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './core/app.controller';
import { AppService } from './core/app.service';
import { PaymentsModule } from './payments/payments.module';
import { EmployeesModule } from './employees/employees.module';
import { PoolsModule } from './pools/pools.module';
import { credentials } from "../credentials";
import { Pool } from "./pools/pool.entity";
import { Employee } from "./employees/employee.entity";
import { Payment } from "./payments/payment.entity";
import { ClientsModule } from './clients/clients.module';
import { Client } from "./clients/client.entity";
import { BillsModule } from './bills/bills.module';
import { Bill } from "./bills/bill.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: credentials.login,
      password: credentials.password,
      database: credentials.database,
      entities: [Pool, Employee, Payment, Client, Bill],
      synchronize: true
    }),
    PaymentsModule,
    EmployeesModule,
    PoolsModule,
    ClientsModule,
    BillsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
