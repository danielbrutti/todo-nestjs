import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../shared/base-entity";

@Entity()
export class Todo extends BaseEntity {
  @Column({ length: 255, unique: true })
  description: string;

  @Column({ type: "date" })
  due: Date;

  @Column()
  remind: boolean;

  @Column()
  alarm: Date;

  @Column()
  completed: boolean;
}
