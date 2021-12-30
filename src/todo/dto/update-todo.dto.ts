import { PartialType } from '@nestjs/mapped-types';
import { Todo } from '../entities/todo.entity';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {

    static toEntity(todo: Todo, dto: UpdateTodoDto): Todo {
        return Object.assign(
            todo,
            {
                completed: dto.completed,
                description: dto.description
            }
        );
    }
}
