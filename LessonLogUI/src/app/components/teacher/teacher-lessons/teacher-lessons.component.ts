import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TeacherLessonsService} from "../../../services/teacher-lessons.service";
import {ToastrService} from "ngx-toastr";
import {ClassesService} from "../../../services/classes.service";
import {SubjectsService} from "../../../services/subjects.service";
import {Class} from "../../../models/class.model";
import {Subject} from "../../../models/subject.model";
import { jwtDecode } from 'jwt-decode';
import {Pagination} from "../../../models/pagination.model";
import {ResponseModel} from "../../../models/response.model";
import {Lesson} from "../../../models/lesson.model";
import {HelperService} from "../../../services/helper.service";
import {AddLessonDto} from "../../../models/dtos/add-lesson.dto";
import {LessonHours} from "../../../models/lessonhours.model";
import {LessonhoursService} from "../../../services/lessonhours.service";
import {EditLessonDto} from "../../../models/dtos/edit-lesson.dto";
import {StudentsService} from "../../../services/students.service";
import {Student} from "../../../models/student.model";
import {AttendaceDto} from "../../../models/dtos/attendace.dto";
import {AttendencesService} from "../../../services/attendences.service";
import {Attendace} from "../../../models/attendance.model";

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
  public editLessonData: EditLessonDto = new EditLessonDto();
  public teacher: number = 0;
  public selected = false;
  public paginationModel: Pagination = new Pagination();
  public response: ResponseModel<Lesson> = new ResponseModel<Lesson>();
  public currentEditLesson!: number;
  public currentLessonHourId!: number;
  public students: any;
  public attendance: AttendaceDto = new AttendaceDto();
  public attendances: Array<Attendace> = new Array<Attendace>();

  @ViewChild('attendanceSelect') attendanceSelect!: ElementRef;

  constructor(private lessonsService: TeacherLessonsService,
              private toastr: ToastrService,
              private classesService: ClassesService,
              private helperService: HelperService,
              private subjectsService: SubjectsService,
              private lessonHoursService: LessonhoursService,
              private studentsService: StudentsService,
              private attendanceService: AttendencesService) {}

  ngOnInit(): void {
    this.lessonsService.refreshNeeded
      .subscribe(() => {
        this.getAllLessons();
        this.getAllLessonHours();
      })
    this.getAllClasses();
    this.getAllSubjects();
    this.isSelectedData();
  }

  private getAllLessons() {
    this.lessonsService.getLessons(this.paginationModel, this.teacher, this.selectedClass, this.selectedSubject).subscribe(res => {
      this.lessons = res.items;
      this.response = this.helperService.mapResponse<Lesson>(res);
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

  private getStudents(classId: number) {
    this.studentsService.getStudentsByClass(classId).subscribe(res => {
      console.log(res)
      this.students = res;
    })
  }

  searchLesson(e: any) {
    this.paginationModel = this.helperService.setLessonPaginationFilter(e);
    this.getAllLessons();
  }

  changeClass(e: any) {
    this.selectedLessonData.classId = parseInt(e.target.value);
    this.selectedClass = parseInt(e.target.value);
    this.getStudents(parseInt(e.target.value));
    this.isSelectedData();
  }

  changeSubject(e: any) {
    this.selectedLessonData.subjectId = parseInt(e.target.value);
    this.selectedSubject = parseInt(e.target.value);
    this.isSelectedData();
  }

  changeEditLessonHour(e: any) {
    this.editLessonData.lessonHourId = parseInt(e.target.value);
  }

  changeLessonHour(e: any) {
    this.selectedLessonData.lessonHourId = parseInt(e.target.value);
  }

  changeAttendance(selected: any, e: any, attendance: Attendace) {

    if (e.target.value == "absent") {
      selected.classList.add('bg-danger')
      selected.classList.remove('bg-success')
      selected.classList.remove('bg-warning')
    }

    if (e.target.value == "present") {
      selected.classList.add('bg-success')
      selected.classList.remove('bg-danger')
      selected.classList.remove('bg-warning')
    }

    if (e.target.value == "excused") {
      selected.classList.add('bg-warning')
      selected.classList.remove('bg-danger')
      selected.classList.remove('bg-success')
    }

    this.attendanceService.updateAttendance({ id: attendance.id, status: e.target.value }).subscribe();
  }

  selectColor(value: string) {
    if (value == 'absent') {
      return '#e03444';
    }
    if (value == 'present') {
      return '#188755';
    }
    if (value == 'excused') {
      return '#ffc107';
    }
    return null;
  }

  addAttendances(lessonId: number) {
    this.students.forEach((s: Student) => {
      this.attendance = {
        status: "absent",
        lessonId,
        studentId: s.id
      }
      this.attendanceService.addAttendance(this.attendance).subscribe();
    })
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
      this.getTeacher();
      this.getAllLessonHours();
      this.selected = true;
    } else {
      this.selected = false;
    }
  }

  addLesson() {
    this.lessonsService.addLesson(this.selectedLessonData).subscribe({
      next: (e: any) => {
        this.addAttendances(parseInt(e.lessonId));
        this.toastr.success("Dodano lekcję!", "Sukces");
      }, error: () => {
        this.toastr.error("Coś poszło nie tak!", "Error");
      }
    })
    this.clearSelectedLessonData();
  }

  deleteLesson(id: number) {
    this.lessonsService.deleteLesson(id).subscribe({
      next: () => {
        this.toastr.success("Usunięto lekcję!", "Sukces");
      }, error: () => {
        this.toastr.error("Coś poszło nie tak!", "Error");
      }
    })
  }

  editLesson() {
    this.lessonsService.editLesson(this.currentEditLesson, this.editLessonData).subscribe({
      next: () => {
        this.toastr.success("Zedytowano lekcję!", "Success");
      }, error: () => {
        this.toastr.error("Coś poszło nie tak!", "Error");
      }
    })
  }

  getCurrentLesson(lesson: Lesson) {
    this.attendanceService.getAttendancesByLessonId(lesson.id).subscribe(res => {
      this.attendances = res as Array<Attendace>;
    })

    this.editLessonData.lessonHourId = lesson.lessonHourId;
    this.editLessonData.topic = lesson.topic;
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
    if (this.selectedLessonData.topic == "" || this.selectedLessonData.lessonHourId == 0) {
      return true;
    } else {
      return false;
    }
  }

  isEditSelected() {
    if (this.editLessonData.topic == "" || this.editLessonData.lessonHourId == 0) {
      return true;
    } else {
      return false;
    }
  }
}
