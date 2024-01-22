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
  public avgGrades: number = 0;
  public avgWeights: number = 0;

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
