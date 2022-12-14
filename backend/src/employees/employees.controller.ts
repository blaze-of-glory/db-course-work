import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Employee } from "./employee.entity";
import { EmployeesService } from "./employees.service";
import { EmployeeDto } from "./dto/employee.dto";

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
    createEmployee(@Body() createEmployeeDto: EmployeeDto): Promise<Employee> {
        return this.employeesService.createEmployee(createEmployeeDto);
    }

    @Put(':id')
    async updateEmployeeById(@Param('id', ParseIntPipe) id: number, @Body() updateEmployeeDto: EmployeeDto): Promise<Employee> {
        await this.employeesService.updateEmployee(id, updateEmployeeDto);
        return this.employeesService.getEmployeeById(id);
    }

    @Delete(':id')
    async deleteEmployeeById(@Param('id', ParseIntPipe) id: number): Promise<HttpStatus.ACCEPTED> {
        await this.employeesService.deleteEmployee(id);
        return HttpStatus.ACCEPTED;
    }
}
