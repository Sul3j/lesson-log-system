import {Subject} from "./subject.model";
import {Attendace} from "./attendance.model";
import {LessonHours} from "./lessonhours.model";

export class Lesson {
  id!: number;
  topic!: string;
  subjectName!: string;
  classYear!: number;
  className!: string;
  date!: string;
  from!: string;
  to!: string;
  lessonHourId!: number;
  lessonHour!: LessonHours;
  subject!: Subject;
  attendances!: Attendace[];
}
