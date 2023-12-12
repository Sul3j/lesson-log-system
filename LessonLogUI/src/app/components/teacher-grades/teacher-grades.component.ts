import {Component, OnInit} from '@angular/core';
import {Class} from "../../models/class.model";
import {ClassesService} from "../../services/classes.service";
import {StudentsService} from "../../services/students.service";
import {Student} from "../../models/student.model";
import {Grade} from "../../models/grade.model";
import {TeacherGradesService} from "../../services/teacher-grades.service";
import {SubjectsService} from "../../services/subjects.service";
import {Subject} from "../../models/subject.model";
import {GradeDto} from "../../models/grade.dto";
import {ToastrService} from "ngx-toastr";
import {GradeEditDto} from "../../models/garde-edit.dto";

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
          this.toastr.success("Grade has been added!", "Success");
        }, error: () => {
          this.toastr.error("Something went wrong!", "Error");
        }
    });
    this.gradeAddDto.percent = 0;
    this.gradeAddDto.description = "";
  }

  deleteGrade(gradeId: number) {
    this.gradesService.deleteGrade(gradeId).subscribe({
        next: () => {
          this.toastr.success("Grade has been deleted!", "Success");
        }, error: () => {
          this.toastr.error("Something went wrong!", "Error");
        }
    });
  }

  editGrade() {
    console.log(this.gradeId)
    console.log(this.gradeEditDto)
    this.gradesService.editGrade(this.gradeId, this.gradeEditDto).subscribe({
        next: () => {
          this.toastr.success("Grade has been edit!", "Success");
        }, error: () => {
          this.toastr.error("Something went wrong!", "Error");
        }
    });
  }


  getGradesByStudentId(studentId: number) {
    let filterGrades = this.grades.filter((item) => item.studentId == studentId);
    return filterGrades.filter((grade) => grade.subjectId == this.selectedSubject);
  }


}
