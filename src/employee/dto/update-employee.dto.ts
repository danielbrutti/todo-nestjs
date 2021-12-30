import { PartialType } from '@nestjs/mapped-types';
import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {

    static toEntity(employee: Employee, dto: UpdateEmployeeDto): Employee {
        return Object.assign(
            employee,
            {
                name: dto.name,
            }
        );
    }
}
