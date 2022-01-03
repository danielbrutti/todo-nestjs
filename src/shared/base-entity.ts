import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

/**
 * Definition of a base entity with ID and audit info
 */
export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createDate: number;

    @UpdateDateColumn()
    updateDate: number;

    @VersionColumn()
    version: number;
}
