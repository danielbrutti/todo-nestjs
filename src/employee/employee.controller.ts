import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { PaginateQueryDTO } from '../shared/paginate-query.dto';



@ApiTags('employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  /**
   * Creates an Employee
   * @param createEmployeeDto Employee DTO info
   * @returns An Employee
   */
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  /**
   * Retrieve a list of Employee paginated
   * @param query Paginated query parameters
   * @returns A list of Employee
   */
  @Get()
  @ApiBody({type: PaginateQueryDTO})
  findAll(@Body() @Paginate() query: PaginateQuery): Promise<Paginated<Employee>> {
    return this.employeeService.findAll(query);
  }

  /**
   * Retrieve an employee
   * @param id Employee ID
   * @returns An Employee
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  /**
   * Update an Employee
   * @param id Employee Id
   * @param updateEmployeeDto Employee DTO info
   * @returns An Employee
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  /**
   * Deletes an Employee
   * @param id Employee Id
   * @returns Delete result
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }
}
