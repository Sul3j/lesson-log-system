import {Component, OnInit} from '@angular/core';
import {Class} from "../../../models/class.model";
import {ClassesService} from "../../../services/classes.service";
import {StudentsService} from "../../../services/students.service";
import {Student} from "../../../models/student.model";
import {Grade} from "../../../models/grade.model";
import {TeacherGradesService} from "../../../services/teacher-grades.service";
import {SubjectsService} from "../../../services/subjects.service";
import {Subject} from "../../../models/subject.model";
import {GradeDto} from "../../../models/dtos/grade.dto";
import {ToastrService} from "ngx-toastr";
import {GradeEditDto} from "../../../models/dtos/garde-edit.dto";

@Component({
  selector: 'app-teacher-grades',
  templateUrl: './teacher-grades.component.html',
  styleUrls: ['./teacher-grades.component.scss']
})
export class TeacherGradesComponent implements OnInit {
  public classes: Array<Class> = new Array<Class>();
  public students: Array<Student> = new Array<Student>();
  public grades: Array<Grade> = new Array<Grade>();
  public subjects: Array<Subject> = new Array<Subject>();
  public selectedSubject: number = 0;
  public selectedClass: number = 0;
  public gradeAddDto: GradeDto = new GradeDto();
  public gradeEditDto: GradeEditDto = new GradeEditDto();
  public gradeId!: number;
  public avgGrades: number = 0;
  public avgWeights: number = 0;

  public gradesValue = [1,2,3,4,5,6];
  public gradeWeight = [1,2,3,4,5,6,7,8,9,10];

  constructor(private classesService: ClassesService,
              private studentsService: StudentsService,
              private gradesService: TeacherGradesService,
              private subjectsService: SubjectsService,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.gradesService.refreshNeeded
        .subscribe(() => {
          this.getGrades();
        })
    this.getAllClasses();
    this.getGrades();
    this.getAllSubjects();
  }

  private getAllClasses() {
    this.classesService.getAllClasses().subscribe(res => {
      this.classes = res as Array<Class>;
    });
  }

  changeClass(e: any) {
    this.getStudentsByClass(e.target.value);
    this.selectedClass = parseInt(e.target.value);
  }

  getStudentsByClass(classId: number) {
    this.studentsService.getStudentsByClass(classId).subscribe(res => {
      this.students = res as Array<Student>;
    })
  }

  getGrades() {
    this.gradesService.getGrades().subscribe(res => {
      this.grades = res as Array<Grade>;

      console.log(this.grades);
    })
  }

  getAllSubjects() {
    this.subjectsService.getAllSubjects().subscribe(res => {
      this.subjects = res as Array<Subject>;
    })
  }

  changeSubject(e: any) {
    this.selectedSubject = parseInt(e.target.value);
    this.gradeAddDto.subjectId = parseInt(e.target.value);
  }

  isSelected() {
    if(this.selectedSubject != 0 && this.selectedClass != 0) {
      return true;
    }
    return false;
  }

  changeGradeValue(e: any) {
    this.gradeAddDto.gradeValue = parseInt(e.target.value);
  }

  changeGradeWeight(e: any) {
    this.gradeAddDto.gradeWeight = parseInt(e.target.value);
  }

  changeEditGradeValue(e: any) {
    this.gradeEditDto.gradeValue = parseInt(e.target.value);
  }

  changeEditGradeWeight(e: any) {
    this.gradeEditDto.gradeWeight = parseInt(e.target.value);
  }

  getCurrentGrade(grade: Grade) {
    this.gradeEditDto.gradeWeight = grade.gradeWeight;
    console.log("grade weight: ", grade.gradeWeight)
    this.gradeEditDto.gradeValue = grade.gradeValue;
    console.log("grade value: ", grade.gradeValue)
    this.gradeEditDto.description = grade.description;
    this.gradeEditDto.percent = grade.percent;
    this.gradeId = grade.id;
  }

  currentStudent(studentId: number) {
    this.gradeAddDto.studentId = studentId;
  }

  isSelectedValues() {
    if(this.gradeAddDto.gradeValue > 0 && this.gradeAddDto.gradeWeight > 0 && this.gradeAddDto.description != '') {
      return false;
    }
    return true;
  }

  addGrade() {
    this.gradesService.addGrade(this.gradeAddDto).subscribe({
        next: () => {
          this.toastr.success("Dodano ocenę!", "Sukces");
        }, error: () => {
          this.toastr.error("Coś poszło nie tak!", "Error");
        }
    });
    this.gradeAddDto.percent = 0;
    this.gradeAddDto.description = "";
  }

  deleteGrade(gradeId: number) {
    this.gradesService.deleteGrade(gradeId).subscribe({
        next: () => {
          this.toastr.success("Usunięto ocenę!", "Sukces");
        }, error: () => {
          this.toastr.error("Coś poszło nie tak!", "Error");
        }
    });
  }

  editGrade() {
    console.log(this.gradeId)
    console.log(this.gradeEditDto)
    this.gradesService.editGrade(this.gradeId, this.gradeEditDto).subscribe({
        next: () => {
          this.toastr.success("Zedytowano ocenę!", "Sukces");
        }, error: () => {
          this.toastr.error("Coś poszło nie tak!", "Error");
        }
    });
  }


  getGradesByStudentId(studentId: number) {
    this.avgGrades = 0;
    this.avgWeights = 0;

    let filterGrades = this.grades.filter((item) => item.studentId == studentId);

    filterGrades.filter((grade) => grade.subjectId == this.selectedSubject);

    filterGrades.forEach(g => {
      this.avgWeights = this.avgWeights + g.gradeWeight;
      console.log(this.avgWeights);
      this.avgGrades = this.avgGrades + (g.gradeValue * g.gradeWeight);
    })

    this.avgGrades = this.avgGrades / this.avgWeights;
    this.avgGrades = Math.ceil(this.avgGrades * 100) / 100;

    return filterGrades;
  }

  dataBsTargetGenerator(data: string, num: number) {
    return `${data}${num}`;
  }

  ariaControlsGenerator(data: string, num: number) {
    return `${data}${num}`;
  }
}
