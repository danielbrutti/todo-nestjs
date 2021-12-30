import { ApiProperty } from "@nestjs/swagger";
import { Todo } from "../entities/todo.entity";

export class CreateTodoDto {
    @ApiProperty({
        description: 'The description of the pending TODO'
    })
    description: string;

    @ApiProperty({
        description: 'TODO is pending or completed',
        default: false
    })
    completed: boolean;

    @ApiProperty({
        description: 'Owner employee'
    })
    employeeId: number;

    static toEntity(dto: CreateTodoDto): Todo {
        return Object.assign(
            new Todo(),
            {
                completed: false,
                description: dto.description,
                employee: { id: dto.employeeId }
            }
        );
    }
}
