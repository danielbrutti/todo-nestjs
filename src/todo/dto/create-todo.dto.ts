import { ApiProperty } from "@nestjs/swagger";
import { Todo } from "../entities/todo.entity";

export class CreateTodoDto {
    @ApiProperty({
        description: 'The description of the pending task'
    })
    description: string;

    @ApiProperty({
        description: 'Due date',
        default: false
    })
    due: Date;

    @ApiProperty({
        description: 'User wants a reminder of the task',
        default: false
    })
    remind: boolean;

    @ApiProperty({
        description: 'When to send reminder to user',
        default: false
    })
    alarm: Date;

    @ApiProperty({
        description: 'Task is pending or completed',
        default: false
    })
    completed: boolean;

    static toEntity(dto: CreateTodoDto): Todo {
        return Object.assign(
            new Todo(),
            {
                completed: false,
                description: dto.description,
                due: dto.due,
                remind: dto.remind,
                alarm: dto.alarm,
            }
        );
    }
}
