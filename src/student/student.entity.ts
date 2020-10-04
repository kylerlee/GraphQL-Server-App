import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

// This is TypeORM specific
@Entity()
export class Student {
    // This is MongoDB specific
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
}