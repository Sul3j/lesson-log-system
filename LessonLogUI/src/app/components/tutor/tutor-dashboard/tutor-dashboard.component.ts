import {Component, OnInit} from '@angular/core';
import {TimetableDto} from "../../../models/dtos/timetable.dto";
import {TutorTimetableService} from "../../../services/tutor-timetable.service";
import {TutorLessonsService} from "../../../services/tutor-lessons.service";
import {TutorStudentsService} from "../../../services/tutor-students.service";
import {jwtDecode} from "jwt-decode";
import {UsersService} from "../../../services/users.service";
import {User} from "../../../models/user.model";
import {Student} from "../../../models/student.model";

@Component({
  selector: 'app-tutor-dashboard',
  templateUrl: './tutor-dashboard.component.html',
  styleUrls: ['./tutor-dashboard.component.scss']
})
export class TutorDashboardComponent implements OnInit{
  public timetable: Array<TimetableDto> = new Array<TimetableDto>();
  public user: User = new User();
  public student: Student = new Student();

  constructor(private timetableService: TutorTimetableService,
              private lessonsService: TutorLessonsService,
              private studentsService: TutorStudentsService,
              private userService: UsersService) {}

  ngOnInit(): void {
    this.getUserByEmail();
    this.getTimetableByStudent();
  }

  getTimetableByStudent() {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("token") as string;
    const decodeToken = jwtDecode(token) as any;
    this.lessonsService.getTutorId(decodeToken.unique_name).subscribe((res: any) => {
      this.studentsService.getStudentByTutorId(res.id).subscribe((r: any) => {
        this.student = r;
        console.log(r)
        this.timetableService.getTimetable(r.classId).subscribe((response) => {
          this.timetable = response as Array<TimetableDto>;
        })
      })
    })
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
