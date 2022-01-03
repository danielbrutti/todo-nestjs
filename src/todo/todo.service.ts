import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterOperator, PaginateQuery, paginate, Paginated } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) { }

  create(createTodoDto: CreateTodoDto) {
    return this.todoRepository.save(CreateTodoDto.toEntity(createTodoDto));
  }

  findAll(query: PaginateQuery): Promise<Paginated<Todo>> {
    return paginate(query, this.todoRepository, {
      sortableColumns: ['description', 'completed'],
      searchableColumns: ['description'],
      defaultSortBy: [['completed', 'ASC'], ['description', 'ASC']],
      defaultLimit: 20,
      maxLimit: 100,
      filterableColumns: {
        description: [FilterOperator.EQ],
        completed: [FilterOperator.EQ]
      }
    });
  }

  findOne(id: string) {
    return this.todoRepository.findOne(id);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo: Todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException('Todo is not found');
    }
    return this.todoRepository.save(UpdateTodoDto.toEntity(todo, updateTodoDto));
  }

  remove(id: string) {
    return this.todoRepository.delete(id);
  }
}
