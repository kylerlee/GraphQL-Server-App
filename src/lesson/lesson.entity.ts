import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

// This is TypeORM specific
@Entity()
export class Lesson {
    // This is MongoDB specific
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @Column()
    students: string[];
}