import {Component, OnInit} from '@angular/core';
import {TimetableDto} from "../../../models/dtos/timetable.dto";
import {jwtDecode} from "jwt-decode";
import {StudentTimetableService} from "../../../services/student-timetable.service";
import {StudentLessonsService} from "../../../services/student-lessons.service";
import {StudentsService} from "../../../services/students.service";

@Component({
  selector: 'app-student-timetable',
  templateUrl: './student-timetable.component.html',
  styleUrls: ['./student-timetable.component.scss']
})
export class StudentTimetableComponent implements OnInit {
  public timetable: Array<TimetableDto> = new Array<TimetableDto>();
  public weekDayDictionary = [
    { name: 'Poniedziałek', number: 1 },
    { name: 'Wtorek', number: 2 },
    { name: 'Środa', number: 3 },
    { name: 'Czwartek', number: 4 },
    { name: 'Piątek', number: 5 }
  ];

  constructor(private timetableService: StudentTimetableService,
              private studentService: StudentsService) {}

  ngOnInit(): void {
    this.getTimetableByStudent();
  }

  getTimetableByStudent() {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("token") as string;
    const decodeToken = jwtDecode(token) as any;
    console.log(decodeToken)
    this.studentService.getStudentId(decodeToken.unique_name).subscribe((res: any) => {
      this.timetableService.getTimetable(res.classId).subscribe((response) => {
        this.timetable = response as Array<TimetableDto>;
      })
    })
  }

  getItemsByWeekDay(weekDay: number) {
    return this.timetable.filter((item) => item.weekDay === weekDay);
  }
}
