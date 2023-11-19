import {Component, OnInit} from '@angular/core';
import {Class} from "../../models/class.model";
import {TimetableService} from "../../services/timetable.service";
import {ToastrService} from "ngx-toastr";
import {ClassesService} from "../../services/classes.service";
import {TimetableDto} from "../../models/timetable.dto";
import {SubjectsService} from "../../services/subjects.service";
import {TeachersService} from "../../services/teachers.service";
import {ClassroomsService} from "../../services/classrooms.service";
import {Subject} from "../../models/subject.model";
import {Teacher} from "../../models/teacher.model";
import {Classroom} from "../../models/classroom.model";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  public classes: Array<Class> = new Array<Class>();
  public selectedClass: number = 0;
  public timetableDto: TimetableDto = new TimetableDto();
  public subjects: Array<Subject> = new Array<Subject>();
  public teachers: Array<Teacher> = new Array<Teacher>();
  public classrooms: Array<Classroom> = new Array<Classroom>();

  constructor(private timetableService: TimetableService,
              private toastr: ToastrService,
              private classesService: ClassesService,
              private subjectsService: SubjectsService,
              private teachersService: TeachersService,
              private classroomsService: ClassroomsService) {}

  ngOnInit(): void {
    this.timetableService.refreshNeeded
      .subscribe(() => {
        this.getAllClasses();
      })
    this.getAllClasses();
  }

  private getAllClasses() {
    this.classesService.getAllClasses().subscribe(res => {
      this.classes = res as Array<Class>;
    });
  }

  changeClass(e: any) {
    this.selectedClass = e.target.value;
    this.timetableDto.classId = e.target.value;
    this.getTimetableByClass(e.target.value);
  }

  getTimetableByClass(classId: number) {
    if (classId != 0) {
      this.timetableService.getTimetable(classId).subscribe(res => {
        console.log(res);
      })
    }
  }

  setWeekDay(day: string) {
    this.timetableDto.weekDay = day;
  }

  private getAllSubjects() {
    this.subjectsService.getAllSubjects().subscribe(res => {
      this.subjects = res as Array<Subject>;
    });
  }

  private getAllTeachers() {
    this.teachersService.getAllTeachers().subscribe(res => {
      this.teachers = res as Array<Teacher>;
    })
  }

  private getAllClassrooms() {
    this.classroomsService.getAllClassrooms().subscribe(res => {
      this.classrooms = res as Array<Classroom>;
    })
  }

  addTimetable(timetable: TimetableDto) {

  }

}
