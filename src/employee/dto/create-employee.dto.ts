import { Employee } from "../entities/employee.entity";

export class CreateEmployeeDto {
    /**
     * Employee name
     */
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
