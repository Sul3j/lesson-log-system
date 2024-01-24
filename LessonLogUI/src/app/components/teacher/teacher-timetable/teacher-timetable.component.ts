import {Component, OnInit} from '@angular/core';
import {TimetableDto} from "../../../models/dtos/timetable.dto";
import { jwtDecode } from 'jwt-decode';
import {TeacherLessonsService} from "../../../services/teacher-lessons.service";
import {TeacherTimetableService} from "../../../services/teacher-timetable.service";

@Component({
  selector: 'app-teacher-timetable',
  templateUrl: './teacher-timetable.component.html',
  styleUrls: ['./teacher-timetable.component.scss']
})
export class TeacherTimetableComponent implements OnInit{
  public timetable: Array<TimetableDto> = new Array<TimetableDto>();

  public weekDayDictionary = [
    { name: 'Poniedziałek', number: 1 },
    { name: 'Wtorek', number: 2 },
    { name: 'Środa', number: 3 },
    { name: 'Czwartek', number: 4 },
    { name: 'Piątek', number: 5 }
  ];

  constructor(private timetableService: TeacherTimetableService,
              private lessonsService: TeacherLessonsService) {}

  ngOnInit(): void {
    this.getTimetableByTeacher();
  }

  getTimetableByTeacher() {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("token") as string;
    const decodeToken = jwtDecode(token) as any;
    this.lessonsService.getTeacherId(decodeToken.unique_name).subscribe((res: any) => {
      this.timetableService.getTimetable(res.id).subscribe((response) => {
        console.log(response)
        this.timetable = response as Array<TimetableDto>;
      })
    })
  }

  getItemsByWeekDay(weekDay: number) {
    return this.timetable.filter((item) => item.weekDay === weekDay);
  }
}
