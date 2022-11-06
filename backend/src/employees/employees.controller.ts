import { Controller, Get } from '@nestjs/common';
import { Employee } from "./employee.interface";
import { EmployeesService } from "./employees.service";

@Controller('employees')
export class EmployeesController {
    constructor(private employeesService: EmployeesService) { }

    @Get()
    getAllEmployees(): Employee[] {
        return this.employeesService.getAllEmployees();
    }
}
