import {Component, OnInit} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {Grade} from "../../../models/grade.model";
import {StudentsService} from "../../../services/students.service";
import {StudentLessonsService} from "../../../services/student-lessons.service";
import {Lesson} from "../../../models/lesson.model";
import {Attendace} from "../../../models/attendance.model";

@Component({
  selector: 'app-student-lessons',
  templateUrl: './student-lessons.component.html',
  styleUrls: ['./student-lessons.component.scss']
})
export class StudentLessonsComponent implements OnInit {

  public subjects: Array<string> = new Array<string>();
  public subjectsSet: Set<string> = new Set<string>();
  public lessons: Array<Lesson> = new Array<Lesson>();
  public studentId!: number;

  constructor(private studentService: StudentsService,
              private lessonsService: StudentLessonsService) {
  }

  ngOnInit(): void {
    this.getLessonsByClassId();
  }

  getLessonsByClassId() {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("token") as string;
    const decodeToken = jwtDecode(token) as any;
    this.studentService.getStudentId(decodeToken.unique_name).subscribe((res: any) => {
      this.studentId = res.id;
      this.lessonsService.getLessonsByClassId(res.classId).subscribe((r: any) => {

        console.log(r)

        this.lessons = r as Array<Lesson>;

        r.forEach((lesson: any) => {
          this.subjects.push(lesson.subject.name);
        });

        this.subjectsSet = new Set(this.subjects);
      })
    });
  }

  dataBsTargetGenerator(data: string, num: number) {
    return `${data}${num}`;
  }

  ariaControlsGenerator(data: string, num: number) {
    return `${data}${num}`;
  }

  getLessonsBySubjectName(subjectName: string) {
    let filterGrades = this.lessons.filter((item) => item.subject.name == subjectName);
    return filterGrades;
  }

  getAttendance(attendances: Attendace[]) {
    let attendance = attendances.find(({ studentId }) => studentId == this.studentId);

    if(attendance?.status == 'absent') {
      return 'nieobecny';
    }
    if(attendance?.status == 'present') {
      return 'obecny';
    }
    if(attendance?.status == 'excused') {
      return 'usprawiedliwiony';
    }

    return attendance?.status;
  }
}
