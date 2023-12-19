import {Component, OnInit} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {StudentGradesService} from "../../../services/student-grades.service";
import {Grade} from "../../../models/grade.model";
import {StudentLessonsService} from "../../../services/student-lessons.service";

@Component({
  selector: 'app-student-grades',
  templateUrl: './student-grades.component.html',
  styleUrls: ['./student-grades.component.scss']
})
export class StudentGradesComponent implements OnInit{
  public grades: Array<Grade> = new Array<Grade>();
  public subjectNames: Set<string> = new Set<string>();

  constructor(private gradesService: StudentGradesService,
              private lessonsService: StudentLessonsService) {}

  ngOnInit(): void {
    this.getTimetableByStudent();
    setTimeout(() => {
      console.log(this.subjectNames)
    },2000)
  }

  getTimetableByStudent() {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("token") as string;
    const decodeToken = jwtDecode(token) as any;
    this.lessonsService.getStudentId(decodeToken.unique_name).subscribe((res: any) => {
      this.gradesService.getGradesByStudentId(res.id).subscribe((response: any) => {
        let subjects: Array<string> = new Array<string>();
        this.grades = response as Array<Grade>;
        this.grades.forEach(e => {
          subjects.push(e.subject.name);
        })
        this.subjectNames = new Set(subjects);
      })
    });
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

