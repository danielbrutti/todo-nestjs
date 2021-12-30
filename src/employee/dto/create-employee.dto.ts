import { ApiProperty } from "@nestjs/swagger";
import { Employee } from "../entities/employee.entity";

export class CreateEmployeeDto {
    @ApiProperty({
        description: 'Employee name'
    })
    name: string;

    static toEntity(dto: CreateEmployeeDto): Employee {
        return Object.assign(
            new Employee(),
            {
                name: dto.name,
            }
        );
    }
}
