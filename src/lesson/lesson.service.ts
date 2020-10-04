import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './students-lesson.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>
    ) { }

    async getLesson(id: string): Promise<Lesson> {
        return this.lessonRepository.findOne({ id });
    }

    async getLessons(): Promise<Lesson[]> {
        return this.lessonRepository.find();
    }

    async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate, students } = createLessonInput;

        const lesson = this.lessonRepository.create({
            id: uuidv4(),
            name,
            startDate,
            endDate,
            students: this.removeStudentDuplicates(students)
        });

        return this.lessonRepository.save(lesson);
    }

    async assignStudentsToLesson(
        assignStudentsToLessonInput: AssignStudentsToLessonInput
    ): Promise<Lesson> {
        const { lessonId, studentIds } = assignStudentsToLessonInput;
        const lesson = await this.lessonRepository.findOne({ id: lessonId });
        const studentsWithDuplicates = [...lesson.students, ...studentIds];
        lesson.students = this.removeStudentDuplicates(studentsWithDuplicates);
        return this.lessonRepository.save(lesson);
    }

    private removeStudentDuplicates(students: string[]): string[] {
        return [...new Set(students)];
    }
}
