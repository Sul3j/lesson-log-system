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
        this.timetable = response as Array<TimetableDto>;
      })
    })
  }

  getItemsByWeekDay(weekDay: number) {
    return this.timetable.filter((item) => item.weekDay === weekDay);
  }
}
