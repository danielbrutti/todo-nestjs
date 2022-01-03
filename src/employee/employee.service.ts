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

  /**
   * Creates a new Employee
   * @param createEmployeeDto Employee DTO
   * @returns A new Employee
   */
  create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeeRepository.save(CreateEmployeeDto.toEntity(createEmployeeDto));
  }

  /**
   * Return a list with pagination
   * @param query Query to search by and paginate
   * @returns A paginated list
   */
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

  /**
   * Find an Employee by ID
   * @param id Employe ID
   * @returns 
   */
  findOne(id: string) {
    return this.employeeRepository.findOne(id);
  }

  /**
   * Update an Employee
   * @param id Employee ID
   * @param updateEmployeeDto DTO
   * @returns An updated Employee
   * @throws NotFoundException when employee does not exists
   */
  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employee: Employee = await this.employeeRepository.findOne(id);
    if (!employee) {
      throw new NotFoundException('Employee is not found');
    }
    return this.employeeRepository.save(UpdateEmployeeDto.toEntity(employee, updateEmployeeDto));
  }

  /**
   * Delete an Employee
   * @param id Employee ID
   * @returns Delete result
   */
  remove(id: string) {
    return this.employeeRepository.delete(id);
  }
}
