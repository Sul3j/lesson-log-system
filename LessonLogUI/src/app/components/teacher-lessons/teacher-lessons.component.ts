import {Component, OnInit} from '@angular/core';
import {TeacherLessonsService} from "../../services/teacher-lessons.service";
import {ToastrService} from "ngx-toastr";
import {ClassesService} from "../../services/classes.service";
import {SubjectsService} from "../../services/subjects.service";
import {Class} from "../../models/class.model";
import {Subject} from "../../models/subject.model";
import { jwtDecode } from 'jwt-decode';
import {Pagination} from "../../models/pagination.model";
import {ResponseModel} from "../../models/response.model";
import {Lesson} from "../../models/lesson.model";
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-teacher-lessons',
  templateUrl: './teacher-lessons.component.html',
  styleUrls: ['./teacher-lessons.component.scss']
})
export class TeacherLessonsComponent implements OnInit {
  public lessons: Array<Lesson> = new Array<Lesson>();
  public classes: Array<Class> = new Array<Class>();
  public subjects: Array<Subject> = new Array<Subject>();
  public selectedClass: number = 0;
  public selectedSubject: number = 0;
  public teacher: number = 0;
  public isSelected = false;
  public paginationModel: Pagination = new Pagination();
  public response: ResponseModel<Lesson> = new ResponseModel<Lesson>();

  constructor(private lessonsService: TeacherLessonsService,
              private toastr: ToastrService,
              private classesService: ClassesService,
              private helperService: HelperService,
              private subjectsService: SubjectsService) {}

  ngOnInit(): void {
    this.lessonsService.refreshNeeded
      .subscribe(() => {
        this.getAllClasses();
        this.getAllSubjects();
        this.getTeacher();
      })
    this.getAllClasses();
    this.getAllSubjects();
    this.getTeacher();
    this.isSelectedData();
  }

  private getAllLessons() {
    this.lessonsService.getLessons(this.paginationModel, this.teacher, this.selectedClass, this.selectedSubject).subscribe(res => {
      this.lessons = res.items;
      this.response = this.helperService.mapResponse<Lesson>(res);
      console.log(this.response);
    })
  }

  private getAllClasses() {
    this.classesService.getAllClasses().subscribe(res => {
      this.classes = res as Array<Class>;
    })
  }

  private getAllSubjects() {
    this.subjectsService.getAllSubjects().subscribe(res => {
      this.subjects = res as Array<Subject>;
    })
  }

  changeClass(e: any) {
    this.selectedClass = parseInt(e.target.value);
    this.isSelectedData();
  }

  changeSubject(e: any) {
    this.selectedSubject = parseInt(e.target.value);
    this.isSelectedData();
  }

  getTeacher() {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("token") as string;
    const decodeToken = jwtDecode(token) as any;
    this.lessonsService.getTeacherId(decodeToken.unique_name).subscribe((res: any) => {
      this.teacher = res.id as number;
    })
  }

  isSelectedData() {
    if (this.selectedSubject != 0 && this.selectedClass != 0) {
      this.getAllLessons();
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }
  }
}
