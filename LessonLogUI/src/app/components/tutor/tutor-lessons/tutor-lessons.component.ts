import {Component, OnInit} from '@angular/core';
import {Lesson} from "../../../models/lesson.model";
import {StudentsService} from "../../../services/students.service";
import {StudentLessonsService} from "../../../services/student-lessons.service";
import {jwtDecode} from "jwt-decode";
import {Attendace} from "../../../models/attendance.model";
import {Grade} from "../../../models/grade.model";
import {TutorsService} from "../../../services/tutors.service";
import {TutorLessonsService} from "../../../services/tutor-lessons.service";
import {TutorStudentsService} from "../../../services/tutor-students.service";

@Component({
  selector: 'app-tutor-lessons',
  templateUrl: './tutor-lessons.component.html',
  styleUrls: ['./tutor-lessons.component.scss']
})
export class TutorLessonsComponent implements OnInit {
  public subjects: Array<string> = new Array<string>();
  public subjectsSet: Set<string> = new Set<string>();
  public lessons: Array<Lesson> = new Array<Lesson>();
  public studentId!: number;

  constructor(private tutorsService: TutorsService,
              private lessonsService: TutorLessonsService,
              private studentsService: TutorStudentsService) {
  }

  ngOnInit(): void {
    this.getLessonsByClassId();
  }

  getLessonsByClassId() {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("token") as string;
    const decodeToken = jwtDecode(token) as any;
    this.lessonsService.getTutorId(decodeToken.unique_name).subscribe((res: any) => {
      this.studentsService.getStudentByTutorId(res.id).subscribe((r: any) => {
        this.studentId = res.id;
        this.lessonsService.getLessonsByClassId(r.classId).subscribe((response: any) => {
          this.lessons = response as Array<Lesson>;
          response.forEach((lesson: any) => {
            this.subjects.push(lesson.subject.name);
          });

          this.subjectsSet = new Set(this.subjects);
        })
      })
    })
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
