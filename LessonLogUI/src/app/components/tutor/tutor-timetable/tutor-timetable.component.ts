import {Component, OnInit} from '@angular/core';
import {TimetableDto} from "../../../models/dtos/timetable.dto";
import {StudentTimetableService} from "../../../services/student-timetable.service";
import {StudentLessonsService} from "../../../services/student-lessons.service";
import {jwtDecode} from "jwt-decode";
import {TutorTimetableService} from "../../../services/tutor-timetable.service";
import {TutorLessonsService} from "../../../services/tutor-lessons.service";
import {TutorStudentsService} from "../../../services/tutor-students.service";

@Component({
  selector: 'app-tutor-timetable',
  templateUrl: './tutor-timetable.component.html',
  styleUrls: ['./tutor-timetable.component.scss']
})
export class TutorTimetableComponent implements OnInit {
  public timetable: Array<TimetableDto> = new Array<TimetableDto>();

  constructor(private timetableService: TutorTimetableService,
              private lessonsService: TutorLessonsService,
              private studentsService: TutorStudentsService) {}

  ngOnInit(): void {
    this.getTimetableByStudent();
  }

  getTimetableByStudent() {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("token") as string;
    const decodeToken = jwtDecode(token) as any;
    console.log(decodeToken)
    this.lessonsService.getTutorId(decodeToken.unique_name).subscribe((res: any) => {
      this.studentsService.getStudentByTutorId(res.id).subscribe((r: any) => {
        this.timetableService.getTimetable(r.classId).subscribe((response) => {
          this.timetable = response as Array<TimetableDto>;
        })
      })
    })
  }

  getItemsByWeekDay(weekDay: number) {
    return this.timetable.filter((item) => item.weekDay === weekDay);
  }
}
