import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {LessonhoursService} from "../../services/lessonhours.service";
import {LessonHours} from "../../models/lessonhours.model";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  public classes: Array<Class> = new Array<Class>();
  public selectedClass: number = 0;
  public timetableDto: TimetableDto = new TimetableDto();
  public timetableEditDto: TimetableDto = new TimetableDto();
  public timetable: Array<TimetableDto> = new Array<TimetableDto>();
  public subjects: Array<Subject> = new Array<Subject>();
  public teachers: Array<Teacher> = new Array<Teacher>();
  public classrooms: Array<Classroom> = new Array<Classroom>();
  public lessonHours: Array<LessonHours> = new Array<LessonHours>();

  constructor(private timetableService: TimetableService,
              private toastr: ToastrService,
              private classesService: ClassesService,
              private subjectsService: SubjectsService,
              private teachersService: TeachersService,
              private classroomsService: ClassroomsService,
              private lessonHoursService: LessonhoursService) {}

  ngOnInit(): void {
    this.timetableService.refreshNeeded
      .subscribe(() => {
        this.getAllClasses();
        this.getAllSubjects();
        this.getAllTeachers();
        this.getAllClassrooms();
        this.getAllLessonHours();
        this.getTimetableByClass(this.selectedClass);
      })
    this.getAllClasses();
    this.getAllSubjects();
    this.getAllTeachers();
    this.getAllClassrooms();
    this.getAllLessonHours();
    this.getTimetableByClass(this.selectedClass);
  }

  private getAllClasses() {
    this.classesService.getAllClasses().subscribe(res => {
      this.classes = res as Array<Class>;
    });
  }

  changeClass(e: any) {
    this.selectedClass = parseInt(e.target.value);
    this.timetableDto.classId = parseInt(e.target.value);
    this.getTimetableByClass(e.target.value);
  }

  getTimetableByClass(classId: number) {
      this.timetableService.getTimetable(classId).subscribe((res) => {
        this.timetable = res as Array<TimetableDto>;
        console.log(res)
      });
  }

  deleteLesson(id: number) {
    this.timetableService.deleteLesson(id).subscribe({
      next: () => {
        this.toastr.success("Lesson has been deleted!", "Success");
      }, error: () => {
        this.toastr.error("Something went wrong!", "Error");
      }
    })
  }

  setWeekDay(day: number) {
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

  private getAllLessonHours() {
    this.lessonHoursService.getAllLessonHours().subscribe(res => {
      this.lessonHours = res as Array<LessonHours>;
    })
  }

  changeSubject(e: any) {
    this.timetableDto.subjectId = parseInt(e.target.value);
  }

  changeTeacher(e: any) {
    this.timetableDto.teacherId = parseInt(e.target.value);
  }

  changeClassroom(e: any) {
    this.timetableDto.classroomId = parseInt(e.target.value);
  }

  changeLessonHour(e: any) {
    this.timetableDto.lessonHourId = parseInt(e.target.value);
  }

  addTimetable() {
    this.timetableService.addTimetable(this.timetableDto).subscribe({
      next: (res) => {
        this.toastr.success("Lesson has been added!", "Success");
      }, error: () => {
        this.toastr.error("Something went wrong!", "Error");
      }
    })
    this.timetableDto = new TimetableDto();
  }

  editTimetable() {
    console.log(this.timetableEditDto.id, this.timetableEditDto)
    this.timetableService.editLesson(this.timetableEditDto.id, this.timetableEditDto).subscribe({
      next: (res) => {
        this.toastr.success("Lesson has been edited!", "Success");
      }, error: () => {
        this.toastr.error("Something went wrong!", "Error");
      }
    })
  }

  getItemsByWeekDay(weekDay: number) {
    return this.timetable.filter((item) => item.weekDay === weekDay);
  }

  isAllTimetableValues() {
    if(this.timetableDto.weekDay != undefined &&
    this.timetableDto.subjectId != undefined &&
    this.timetableDto.teacherId != undefined &&
    this.timetableDto.classroomId != undefined &&
    this.timetableDto.lessonHourId != undefined &&
    this.timetableDto.classId != undefined) {
      return false;
    } else {
      return true;
    }
  }

  showShadow(shadow: HTMLDivElement) {
    shadow.style.opacity = "1";
  }

  hideShadow(shadow: HTMLDivElement) {
    shadow.style.opacity = "0";
  }

  changeEditSubject(e: any) {
    this.timetableEditDto.subjectId = parseInt(e.target.value);
  }

  changeEditTeacher(e: any) {
    this.timetableEditDto.teacherId = parseInt(e.target.value);
  }

  changeEditClassroom(e: any) {
    this.timetableEditDto.classroomId = parseInt(e.target.value);
  }

  changeEditLessonHour(e: any) {
    this.timetableEditDto.lessonHourId = parseInt(e.target.value);
  }

  getCurrentLesson(lesson: TimetableDto) {
    this.timetableEditDto.id = lesson.id;
    this.timetableEditDto.subjectId = lesson.subject.id;
    this.timetableEditDto.classroomId = lesson.classroom.id;
    this.timetableEditDto.lessonHourId = lesson.lessonHour.id;
    this.timetableEditDto.teacherId = lesson.teacher.id;
  }
}
