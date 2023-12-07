import {Subject} from "./subject.model";
import {Student} from "./student.model";

export class Grade {
  id!: number;
  description!: string;
  gradeValue!: number;
  percent!: number;
  gradeWeight!: number;
  date!: Date;
  subject!: Subject;
  subjectId!: number;
  student!: Student;
  studentId!: number;
}
