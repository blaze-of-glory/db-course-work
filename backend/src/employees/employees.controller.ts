import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Employee } from "./employee.entity";
import { EmployeesService } from "./employees.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";

@Controller('employees')
export class EmployeesController {
    constructor(private employeesService: EmployeesService) { }

    @Get()
    getAllEmployees(): Promise<Employee[]> {
        return this.employeesService.getAllEmployees();
    }

    @Get(':id')
    getEmployeeById(@Param('id', ParseIntPipe) id: number): Promise<Employee> {
        return this.employeesService.getEmployeeById(id);
    }

    @Post()
    createEmployee(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        return this.employeesService.createEmployee(createEmployeeDto);
    }

    @Put(':id')
    async updateEmployeeById(@Param('id', ParseIntPipe) id: number, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
        await this.employeesService.updateEmployee(id, updateEmployeeDto);
        return this.employeesService.getEmployeeById(id);
    }

    @Delete(':id')
    async deleteEmployeeById(@Param('id', ParseIntPipe) id: number): Promise<HttpStatus.ACCEPTED> {
        await this.employeesService.deleteEmployee(id);
        return HttpStatus.ACCEPTED;
    }
}
