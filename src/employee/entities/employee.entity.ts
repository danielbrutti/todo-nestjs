import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../shared/base-entity";
import { Todo } from "../../todo/entities/todo.entity";

@Entity()
export class Employee extends BaseEntity {
  
    @Column({ length: 200 })
    name: string;

    @OneToMany(() => Todo, todo => todo.employee)
    todos: Todo[];
}
