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

  /**
   * Creates a new Todo
   * @param createTodoDto Todo DTO
   * @returns A new Todo
   */
  create(createTodoDto: CreateTodoDto) {
    return this.todoRepository.save(CreateTodoDto.toEntity(createTodoDto));
  }

  /**
   * Return a list with pagination
   * @param query Query to search by and paginate
   * @returns A paginated list
   */
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

  /**
   * Find a Todo by ID
   * @param id Employe ID
   * @returns 
   */
  findOne(id: string) {
    return this.todoRepository.findOne(id);
  }

  /**
   * Update a Todo
   * @param id Todo ID
   * @param updateTodoDto DTO
   * @returns An updated Todo
   * @throws NotFoundException when Todo does not exists
   */
  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo: Todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException('Todo is not found');
    }
    return this.todoRepository.save(UpdateTodoDto.toEntity(todo, updateTodoDto));
  }

  /**
   * Delete a Todo
   * @param id Todo ID
   * @returns Delete result
   */
  remove(id: string) {
    return this.todoRepository.delete(id);
  }
}
