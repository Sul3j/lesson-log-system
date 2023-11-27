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
import {AddLessonDto} from "../../models/add-lesson.dto";
import {LessonHours} from "../../models/lessonhours.model";
import {LessonhoursService} from "../../services/lessonhours.service";

@Component({
  selector: 'app-teacher-lessons',
  templateUrl: './teacher-lessons.component.html',
  styleUrls: ['./teacher-lessons.component.scss']
})
export class TeacherLessonsComponent implements OnInit {
  public lessons: Array<Lesson> = new Array<Lesson>();
  public classes: Array<Class> = new Array<Class>();
  public subjects: Array<Subject> = new Array<Subject>();
  public lessonHours: Array<LessonHours> = new Array<LessonHours>();
  public selectedClass: number = 0;
  public selectedSubject: number = 0;
  public selectedLessonData: AddLessonDto = new AddLessonDto();
  public teacher: number = 0;
  public selected = false;
  public paginationModel: Pagination = new Pagination();
  public response: ResponseModel<Lesson> = new ResponseModel<Lesson>();

  constructor(private lessonsService: TeacherLessonsService,
              private toastr: ToastrService,
              private classesService: ClassesService,
              private helperService: HelperService,
              private subjectsService: SubjectsService,
              private lessonHoursService: LessonhoursService) {}

  ngOnInit(): void {
    this.lessonsService.refreshNeeded
      .subscribe(() => {
        this.getAllLessons();
        this.getAllLessonHours();
      })
    this.getAllClasses();
    this.getAllSubjects();
    this.getTeacher();
    this.isSelectedData();
    this.getAllLessonHours();
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

  private getAllLessonHours() {
    this.lessonHoursService.getAllLessonHours().subscribe(res => {
      this.lessonHours = res as Array<LessonHours>;
    })
  }

  private getAllSubjects() {
    this.subjectsService.getAllSubjects().subscribe(res => {
      this.subjects = res as Array<Subject>;
    })
  }

  changeClass(e: any) {
    this.selectedLessonData.classId = parseInt(e.target.value);
    this.selectedClass = parseInt(e.target.value);
    this.isSelectedData();
  }

  changeSubject(e: any) {
    this.selectedLessonData.subjectId = parseInt(e.target.value);
    this.selectedSubject = parseInt(e.target.value);
    this.isSelectedData();
  }

  changeLessonHour(e: any) {
    this.selectedLessonData.lessonHourId = parseInt(e.target.value);
  }

  getTeacher() {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("token") as string;
    const decodeToken = jwtDecode(token) as any;
    this.lessonsService.getTeacherId(decodeToken.unique_name).subscribe((res: any) => {
      this.selectedLessonData.teacherId = res.id as number;
      this.teacher = res.id as number;
    })
  }

  isSelectedData() {
    if (this.selectedLessonData.subjectId != 0 && this.selectedLessonData.classId != 0) {
      this.getAllLessons();
      this.selected = true;
    } else {
      this.selected = false;
    }
  }

  addLesson() {
    this.lessonsService.addLesson(this.selectedLessonData).subscribe({
      next: () => {
        this.toastr.success("Lesson has been added!", "Success");
      }, error: () => {
        this.toastr.error("Something went wrong!", "Error");
      }
    })
    this.clearSelectedLessonData();
  }

  deleteLesson(id: number) {
    this.lessonsService.deleteLesson(id).subscribe({
      next: () => {
        this.toastr.success("Lesson has been deleted!", "Success");
      }, error: () => {
        this.toastr.error("Something went wrong!", "Error");
      }
    })
  }

  getCurrentLesson(lesson: Lesson) {

  }

  clearSelectedLessonData() {
    this.selectedLessonData.topic = "";
    this.selectedLessonData.lessonHourId = 0;
  }

  itemsPerPage(e: any) {
    this.paginationModel.pageSize = parseInt(e.target.value);
    this.getAllLessons();
  }

  changePage(e: any) {
    this.paginationModel.page = parseInt(e.target.value);
    this.getAllLessons();
  }

  nextPage(): void {
    this.paginationModel.page = this.helperService.nextPage(this.response.totalPages, this.paginationModel.page);
    this.getAllLessons();
  }

  previousPage(): void {
    this.paginationModel.page = this.helperService.previousPage(this.paginationModel.page);
    this.getAllLessons();
  }

  createRange(number: number) {
    return this.helperService.createRange(number);
  }

  isSelected() {
    if (this.selectedLessonData.topic == "" && this.selectedLessonData.subjectId == 0 && this.selectedLessonData.lessonHourId == 0) {
      return true;
    } else {
      return false;
    }
  }
}
