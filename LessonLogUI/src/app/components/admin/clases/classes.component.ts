import {Component, OnInit} from '@angular/core';
import {Class} from "../../../models/class.model";
import {Pagination} from "../../../models/pagination.model";
import {ResponseModel} from "../../../models/response.model";
import {ClassesService} from "../../../services/classes.service";
import {HelperService} from "../../../services/helper.service";
import {ToastrService} from "ngx-toastr";
import {ClassDto} from "../../../models/dtos/class.dto";
import {Teacher} from "../../../models/teacher.model";
import {TeachersService} from "../../../services/teachers.service";

@Component({
  selector: 'app-clases',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  public classes: Array<Class> = new Array<Class>();
  public teachers: Array<Teacher> = new Array<Teacher>();
  public paginationModel: Pagination = new Pagination();
  public response: ResponseModel<Class> = new ResponseModel<Class>();
  public items: number = 5;
  public years: Array<number> = [1,2,3,4,5,6,7,8];
  public currentClass: Class = new Class();
  public name: string = "";
  public classValue: ClassDto = new ClassDto();
  public classEditValue: ClassDto = new ClassDto();

  constructor(private classService: ClassesService,
              private helperService: HelperService,
              private toastr: ToastrService,
              private teachersService: TeachersService) {}

  ngOnInit(): void {
    this.classService.refreshNeeded
      .subscribe(() => {
        this.getAllClasses();
        this.getAllTeachers();
      })
    this.getAllClasses();
    this.getAllTeachers();
  }

  private getAllClasses() {
    this.classService.getClasses(this.paginationModel).subscribe(res => {
      this.classes = res.items;
      this.response = this.helperService.mapResponse<Class>(res);
    })
  }

  searchClass(e: any) {
    this.paginationModel = this.helperService.setClassPaginationFilter(e.target.value);
    this.getAllClasses();
  }

  itemsPerPage(e: any) {
    this.paginationModel.pageSize = parseInt(e.target.value);
    this.getAllClasses();
  }

  addClass() {
    this.classValue.name = this.name;
    this.classService.addClass(this.classValue).subscribe({
      next: () => {
        this.toastr.success("Dodano klasę!", "Sukces");
      }, error: () => {
        this.toastr.error("Coś poszło nie tak!", "Error");
      }
    })
  }

  isAllClassValue() {
    if ((this.classValue.educatorId == null || this.classValue.educatorId == undefined) || (this.classValue.year == null || this.classValue.year == undefined) || this.name == "") {
      return true;
    } else {
      return false;
    }
  }

  isAllEditClassValue() {
    if ((this.classEditValue.educatorId == null || this.classEditValue.educatorId == undefined) || (this.classEditValue.year == null || this.classEditValue.year == undefined) || this.classEditValue.name == "") {
      return true;
    } else {
      return false;
    }
  }

  deleteClass(id: number) {
    this.classService.deleteClass(id).subscribe({
      next: () => {
        this.toastr.success("Usunięto klasę!", "Sukces");
      }, error: () => {
        this.toastr.error("Coś poszło nie tak!", "Error");
      }
    })
  }

  editClass(id: number) {
    this.classService.updateClass(id, this.classEditValue).subscribe({
      next: () => {
        this.toastr.success("Zedytowano klasę!", "Sukces");
      }, error: () => {
        this.toastr.error("Coś poszło nie tak!", "Error");
      }
    })
  }

  private getAllTeachers() {
    this.teachersService.getAllTeachers().subscribe(res => {
      this.teachers = res as Array<Teacher>;
    })
  }

  changePage(e: any) {
    this.paginationModel.page = parseInt(e.target.value);
    this.getAllClasses();
  }

  getCurrentClass(classValue: Class) {
    this.classEditValue = {
      year: classValue.year,
      educatorId: classValue.educatorId,
      name: classValue.name
    };

    this.currentClass = {
      name: classValue.name,
      id: classValue.id,
      educatorId: classValue.educatorId,
      year: classValue.year,
      educatorFullName: ""
    }
  }

  changeTeacher(e: any) {
    this.classValue.educatorId = parseInt(e.target.value);
  }

  changeEditTeacherValue(e: any) {
    this.classEditValue.educatorId = parseInt(e.target.value);
  }

  nextPage(): void {
    this.paginationModel.page = this.helperService.nextPage(this.response.totalPages, this.paginationModel.page);
    this.getAllClasses();
  }

  previousPage(): void {
    this.paginationModel.page = this.helperService.previousPage(this.paginationModel.page);
    this.getAllClasses();
  }

  createRange(number: number) {
    return this.helperService.createRange(number);
  }

  changeYear(e: any) {
    this.classValue.year = parseInt(e.target.value);
  }

  changeEditYearValue(e: any) {
    this.classEditValue.year = parseInt(e.target.value);
  }

  getFilterTeachers(teachers: any) {
    return teachers.filter((item: any) => item.class == null);
  }
}
