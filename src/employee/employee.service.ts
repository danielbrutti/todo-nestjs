import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterOperator, PaginateQuery, paginate, Paginated } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {

  constructor(
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
  ) { }

  create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeeRepository.save(CreateEmployeeDto.toEntity(createEmployeeDto));
  }

  findAll(query: PaginateQuery): Promise<Paginated<Employee>> {
    return paginate(query, this.employeeRepository, {
      sortableColumns: ['name'],
      searchableColumns: ['name'],
      defaultSortBy: [['name', 'ASC']],
      defaultLimit: 20,
      maxLimit: 100,
      filterableColumns: {
        name: [FilterOperator.EQ]
      }
    });
  }

  findOne(id: string) {
    return this.employeeRepository.findOne(id);
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employee: Employee = await this.employeeRepository.findOne(id);
    if (!employee) {
      throw new NotFoundException('Employee is not found');
    }
    return this.employeeRepository.save(UpdateEmployeeDto.toEntity(employee, updateEmployeeDto));
  }

  remove(id: string) {
    return this.employeeRepository.delete(id);
  }
}
