import { Injectable } from '@nestjs/common';
import { Employee } from "./employee.interface";

@Injectable()
export class EmployeesService {
    public getAllEmployees(): Employee[] {
        return [
            {
                id: '1',
                img: 'https://data2.1freewallpapers.com/detail/mountain-lake-beautiful-night.jpg',
                name: 'Joe',
                surname: 'Doe',
                age: '42',
                position: 'Regular',
                salary: '300'
            }
        ]
    }
}
