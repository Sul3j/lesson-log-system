export class gradeDto {
  description!: string;
  gradeValue!: number;
  percent!: number;
  gradeWeight!: number;
  date: number = Date.now();
  subjectId!: number;
  studentId!: number;
}
