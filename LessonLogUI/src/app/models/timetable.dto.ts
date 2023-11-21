import {Subject} from "./subject.model";
import {Teacher} from "./teacher.model";
import {Classroom} from "./classroom.model";
import {LessonHours} from "./lessonhours.model";
import {Class} from "./class.model";

export class TimetableDto {
  id!: number;
  weekDay!: number;
  subjectId!: number;
  subject!: Subject;
  teacherId!: number;
  teacher!: Teacher;
  classroomId!: number;
  classroom!: Classroom;
  lessonHourId!: number;
  lessonHour!: LessonHours;
  classId!: number;
  class!: Class;
}
