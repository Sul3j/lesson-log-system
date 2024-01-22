import {Component, OnInit} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {StudentGradesService} from "../../../services/student-grades.service";
import {Grade} from "../../../models/grade.model";
import {StudentLessonsService} from "../../../services/student-lessons.service";
import {StudentsService} from "../../../services/students.service";

@Component({
  selector: 'app-student-grades',
  templateUrl: './student-grades.component.html',
  styleUrls: ['./student-grades.component.scss']
})
export class StudentGradesComponent implements OnInit{
  public grades: Array<Grade> = new Array<Grade>();
  public subjectNames: Set<string> = new Set<string>();
  public avgGrades: number = 0;
  public avgWeights: number = 0;

  constructor(private gradesService: StudentGradesService,
              private studentService: StudentsService) {}

  ngOnInit(): void {
    this.getTimetableByStudent();
  }

  getTimetableByStudent() {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("token") as string;
    const decodeToken = jwtDecode(token) as any;
    this.studentService.getStudentId(decodeToken.unique_name).subscribe((res: any) => {
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
    this.avgGrades = 0;
    this.avgWeights = 0;

    let filterGrades = this.grades.filter((item) => item.subject.name == subjectName);

    filterGrades.forEach(g => {
      this.avgWeights = this.avgWeights + g.gradeWeight;
      console.log(this.avgWeights);
      this.avgGrades = this.avgGrades + (g.gradeValue * g.gradeWeight);
    })

    this.avgGrades = this.avgGrades / this.avgWeights;
    this.avgGrades = Math.ceil(this.avgGrades * 100) / 100;

    return filterGrades;
  }

  dataBsTargetGenerator(data: string, num: number) {
    return `${data}${num}`;
  }

  ariaControlsGenerator(data: string, num: number) {
    return `${data}${num}`;
  }

}

