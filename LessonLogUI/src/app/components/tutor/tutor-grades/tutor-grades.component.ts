import {Component, OnInit} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {TimetableDto} from "../../../models/dtos/timetable.dto";
import {TutorTimetableService} from "../../../services/tutor-timetable.service";
import {TutorLessonsService} from "../../../services/tutor-lessons.service";
import {TutorStudentsService} from "../../../services/tutor-students.service";
import {Grade} from "../../../models/grade.model";
import {TutorGradesService} from "../../../services/tutor-grades.service";

@Component({
  selector: 'app-tutor-grades',
  templateUrl: './tutor-grades.component.html',
  styleUrls: ['./tutor-grades.component.scss']
})
export class TutorGradesComponent implements OnInit {

  public grades: Array<Grade> = new Array<Grade>();
  public subjectNames: Set<string> = new Set<string>();

  constructor(private lessonsService: TutorLessonsService,
              private studentsService: TutorStudentsService,
              private gradesService: TutorGradesService) {}

  ngOnInit(): void {
    this.getGradesByTutor();
  }


  getGradesByTutor() {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("token") as string;
    const decodeToken = jwtDecode(token) as any;
    this.lessonsService.getTutorId(decodeToken.unique_name).subscribe((res: any) => {
      this.studentsService.getStudentByTutorId(res.id).subscribe((r: any) => {
        this.gradesService.getGradesByStudentId(r.id).subscribe(response => {
          let subjects: Array<string> = new Array<string>();
          this.grades = response as Array<Grade>;
          this.grades.forEach(e => {
            subjects.push(e.subject.name);
          })
          this.subjectNames = new Set(subjects);
        })
      })
    })
  }

  getGradesBySubjectName(subjectName: string) {
    let filterGrades = this.grades.filter((item) => item.subject.name == subjectName);
    return filterGrades;
  }

  dataBsTargetGenerator(data: string, num: number) {
    return `${data}${num}`;
  }

  ariaControlsGenerator(data: string, num: number) {
    return `${data}${num}`;
  }
}
