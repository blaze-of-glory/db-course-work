import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "./employee.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { EmployeeDto } from "./dto/employee.dto";

@Injectable()
export class EmployeesService {

    constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>) { }

    public getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.find();
    }

    public getEmployeeById(id: number): Promise<Employee> {
        return this.employeeRepository.findOneBy({ id });
    }

    public createEmployee(employeeDetails: EmployeeDto): Promise<Employee> {
        if (!Object.keys(employeeDetails).length) {
            return;
        }
        const newEmployee = this.employeeRepository.create({ ...employeeDetails });
        return this.employeeRepository.save(newEmployee);
    }

    public updateEmployee(id: number, updateEmployeeDetails: EmployeeDto): Promise<UpdateResult> {
        return this.employeeRepository.update({ id }, { ...updateEmployeeDetails })
    }

    public deleteEmployee(id: number): Promise<DeleteResult> {
        return this.employeeRepository.delete({ id });
    }

}
