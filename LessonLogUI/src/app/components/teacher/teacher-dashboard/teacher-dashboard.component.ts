import {Component, OnInit} from '@angular/core';
import {TimetableDto} from "../../../models/dtos/timetable.dto";
import {User} from "../../../models/user.model";
import {Student} from "../../../models/student.model";
import {UsersService} from "../../../services/users.service";
import {jwtDecode} from "jwt-decode";
import {TeachersService} from "../../../services/teachers.service";
import {TeacherTimetableService} from "../../../services/teacher-timetable.service";

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {
  public timetable: Array<TimetableDto> = new Array<TimetableDto>();
  public user: User = new User();
  public student: Student = new Student();

  constructor(private timetableService: TeacherTimetableService,
              private teacherService: TeachersService,
              private userService: UsersService) {}

  ngOnInit(): void {
    this.getUserByEmail();
    this.getTimetableByStudent();
  }

  getTimetableByStudent() {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("token") as string;
    const decodeToken = jwtDecode(token) as any;
    this.teacherService.getTeacherId(decodeToken.unique_name).subscribe((res: any) => {
      this.timetableService.getTimetable(res.id).subscribe((response) => {
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
