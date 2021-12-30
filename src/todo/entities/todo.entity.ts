import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "../../employee/entities/employee.entity";
import { BaseEntity } from "../../shared/base-entity";

@Entity()
export class Todo extends BaseEntity {
  @Column({ length: 255, unique: true })
  description: string;

  @Column()
  completed: boolean;

  @ManyToOne(() => Employee, employee => employee.todos)
  employee: Employee;
}
