import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiTags } from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /**
   * Creates a Todo
   * @param createTodoDto Todo DTO
   * @returns A Todo
   */
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  /**
   * Get Todo with Pagination
   * @param query Search and pagination query
   * @returns A list of Todo
   */
  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Todo>> {
    return this.todoService.findAll(query);
  }

  /**
   * Retrieve Todo with a specific ID
   * @param id Todo ID
   * @returns A Todo
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  /**
   * Update a Todo
   * @param id Todo ID
   * @param updateTodoDto Todo DTO
   * @returns Updated Todo
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  /**
   * Delete by ID
   * @param id Todo ID
   * @returns Delete result
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
