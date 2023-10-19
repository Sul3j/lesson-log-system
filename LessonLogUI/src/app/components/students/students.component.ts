import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Student} from "../../models/student.model";
import {User} from "../../models/user.model";
import {Pagination} from "../../models/pagination.model";
import {ResponseModel} from "../../models/response.model";
import {StudentsService} from "../../services/students.service";
import {HelperService} from "../../services/helper.service";
import {UsersService} from "../../services/users.service";
import {ToastrService} from "ngx-toastr";
import {Class} from "../../models/class.model";
import {Tutor} from "../../models/tutor.model";
import {TutorsService} from "../../services/tutors.service";
import {ClassesService} from "../../services/classes.service";
import {AddStudentDto} from "../../models/add-student.dto";
import {StudentFilterDto} from "../../models/student-filter.dto";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  public students: Array<Student> = new Array<Student>();
  public users: Array<User> = new Array<User>();
  public classes: Array<Class> = new Array<Class>();
  public tutors: Array<Tutor> = new Array<Tutor>();
  public paginationModel: Pagination = new Pagination();
  public response: ResponseModel<Student> = new ResponseModel<Student>();
  public items: number = 5;
  public selectedUser!: number;
  public selectedTutor!: number;
  public selectedClass!: number;
  public selectedStudentData: AddStudentDto = new AddStudentDto();
  public studentFilterDto: StudentFilterDto = new StudentFilterDto();
  public currentStudent: Student = new Student();
  public isEditButtonDisabled = false;

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private studentsService: StudentsService,
              private helperService: HelperService,
              private usersService: UsersService,
              private toastr: ToastrService,
              private tutorsService: TutorsService,
              private classesService: ClassesService) {}

  ngOnInit(): void {
    this.studentsService.refreshNeeded
      .subscribe(() => {
        this.getAllStudents();
        this.getAllUsers();
        this.getAllClasses();
        this.getAllTutors();
      })
    this.getAllStudents();
    this.getAllUsers();
    this.getAllClasses();
    this.getAllTutors();
  }

  private getAllStudents() {
    this.studentsService.getStudents(this.paginationModel).subscribe(res => {
      this.students = res.items;
      this.response = this.helperService.mapResponse<Student>(res);
    })
  }

  private getAllUsers() {
    this.usersService.getUsers().subscribe(res => {
      this.users = res;
    })
  }

  private getAllClasses() {
    this.classesService.getAllClasses().subscribe(res => {
      this.classes = res as Array<Class>;
    })
  }

  private getAllTutors() {
    this.tutorsService.getAllTutors().subscribe(res => {
      console.log(res)

      this.tutors = res as Array<Tutor>

      console.log(this.tutors)
    })
  }

  filterStudents(filterOptions: StudentFilterDto) {
    this.paginationModel = this.helperService.setStudentPaginationFilter(filterOptions);
    this.getAllStudents();
  }

  getCurrentStudent(student: Student) {
    console.log(student)
    this.currentStudent.classId = student.classId;
  }

  addStudent() {
    this.studentsService.addStudent(this.selectedStudentData).subscribe({
      next: () => {
        this.toastr.success("Student has been added!", "Success");
      }, error: () => {
        this.toastr.error("Something went wrong!", "Error");
      }
    })
    this.clearSlectedStudentData();
  }

  editStudent(classId: number, studentId: number) {
    console.log(classId, studentId)
    this.studentsService.editStudent(classId, studentId).subscribe({
      next: () => {
        this.toastr.success("Student has been edit!", "Success");
      }, error: () => {
        this.toastr.error("Something went wrong!", "Error")
      }
    })
  }

  deleteStudent(id: number) {
    this.studentsService.deleteStudent(id).subscribe({
      next: () => {
        this.toastr.success("Student has been deleted!", "Success");
      }, error: () => {
        this.toastr.error("Something went wrong!", "Error");
      }
    })
  }

  clearSlectedStudentData() {
    this.selectedStudentData.userId = 0;
    this.selectedStudentData.classId = 0;
    this.selectedStudentData.tutorId = 0;
  }

  isSelected() {
    if (this.selectedStudentData.userId != null && this.selectedStudentData.userId > 0 && this.selectedStudentData.tutorId != null && this.selectedStudentData.tutorId > 0 && this.selectedStudentData.classId != null && this.selectedStudentData.classId > 0)
      return false;
    else
      return true;
  }

  searchStudent(e: any) {
    this.paginationModel = this.helperService.setPaginationFilter(e);
    this.getAllStudents();
  }

  classYearFilterOptions(e: any) {
    const year: number = parseInt(e.target.value);
    this.studentFilterDto.year = year;
  }

  classNameFilterOptions(e: any) {
    const studentName: string = e.target.value;
    this.studentFilterDto.name = studentName;
  }

  isStudentFilterSelected() {
    if((this.studentFilterDto.name == null || this.studentFilterDto.name == 'null') && this.studentFilterDto.year == 0)
      return true;
    else
      return false;
  }

  clearFilters() {
    this.helperService.clearFilters();
    this.searchInput.nativeElement.value = '';
    this.getAllStudents();
    this.toastr.success("Filters has been clear!", "Success")
  }

  changeUser(e: any) {
    this.selectedStudentData.userId = parseInt(e.target.value);
  }

  changeEditUserValue(e: any) {
    console.log(e.target.value)
    this.selectedStudentData.classId = parseInt(e.target.value);
    if (e.target.value == 'null') {
      this.isEditButtonDisabled = true;
    } else {
      this.isEditButtonDisabled = false;
    }
  }

  changeClass(e: any) {
    console.log(e.target.value)
    this.selectedStudentData.classId = parseInt(e.target.value);
  }

  changeTutor(e: any) {
    this.selectedStudentData.tutorId = parseInt(e.target.value);
  }

  itemsPerPage(e: any) {
    this.paginationModel.pageSize = parseInt(e.target.value);
    this.getAllStudents();
  }

  changePage(e: any) {
    this.paginationModel.page = parseInt(e.target.value);
    this.getAllStudents();
  }

  nextPage(): void {
    this.paginationModel.page = this.helperService.nextPage(this.response.totalPages, this.paginationModel.page);
    this.getAllStudents();
  }

  previousPage(): void {
    this.paginationModel.page = this.helperService.previousPage(this.paginationModel.page);
    this.getAllStudents();
  }

  createRange(number: number) {
    return this.helperService.createRange(number);
  }
}
