import {Lesson} from "./lesson.model";
import {Student} from "./student.model";

export class Attendace {
  id!: number;
  status!: string;
  lessonId!: number;
  lesson!: Lesson;
  studentId!: number;
  student!: Student;
}
