import {Component, OnInit} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {TimetableDto} from "../../../models/dtos/timetable.dto";
import {User} from "../../../models/user.model";
import {Student} from "../../../models/student.model";
import {UsersService} from "../../../services/users.service";
import {StudentsService} from "../../../services/students.service";
import {StudentTimetableService} from "../../../services/student-timetable.service";

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  public timetable: Array<TimetableDto> = new Array<TimetableDto>();
  public user: User = new User();
  public student: Student = new Student();

  constructor(private timetableService: StudentTimetableService,
              private studentService: StudentsService,
              private userService: UsersService) {}

  ngOnInit(): void {
    this.getUserByEmail();
    this.getTimetableByStudent();
  }

  getTimetableByStudent() {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("token") as string;
    const decodeToken = jwtDecode(token) as any;
    this.studentService.getStudentId(decodeToken.unique_name).subscribe((res: any) => {
      this.timetableService.getTimetable(res.classId).subscribe((response) => {
        this.timetable = response as Array<TimetableDto>;
      });
    });


  }

  getUserByEmail() {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("token") as string;
    const decodeToken = jwtDecode(token) as any;
    this.userService.getUserById(decodeToken.unique_name).subscribe((res: any) => {
      this.user = res;
    })
  }

  getItemsByWeekDay() {
    return this.timetable.filter((item) => item.weekDay === new Date().getUTCDay());
  }
}
