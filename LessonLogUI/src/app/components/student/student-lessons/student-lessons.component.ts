import {Component, OnInit} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {Grade} from "../../../models/grade.model";
import {StudentsService} from "../../../services/students.service";
import {StudentLessonsService} from "../../../services/student-lessons.service";

@Component({
  selector: 'app-student-lessons',
  templateUrl: './student-lessons.component.html',
  styleUrls: ['./student-lessons.component.scss']
})
export class StudentLessonsComponent implements OnInit {

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
      console.log(res.classId)
      this.lessonsService.getLessonsByClassId(res.classId).subscribe((r: any) => {
        console.log(r);
      })
    });
  }


}
