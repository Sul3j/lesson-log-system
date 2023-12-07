import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ResetComponent} from "./components/reset/reset.component";
import {TeachersComponent} from "./components/teachers/teachers.component";
import {AdminsComponent} from "./components/admins/admins.component";
import {StudentsComponent} from "./components/students/students.component";
import {TutorsComponent} from "./components/tutors/tutors.component";
import {ClassesComponent} from "./components/clases/classes.component";
import { ClassroomsComponent } from './components/classrooms/classrooms.component';
import {SubjectsComponent} from "./components/subjects/subjects.component";
import {TimetableComponent} from "./components/timetable/timetable.component";
import {AuthGuard} from "./guards/auth.guard";
import {HasRoleGuard} from "./guards/has-role.guard";
import {TeacherDashboardComponent} from "./components/teacher-dashboard/teacher-dashboard.component";
import {TeacherLessonsComponent} from "./components/teacher-lessons/teacher-lessons.component";
import {TeacherTimetableComponent} from "./components/teacher-timetable/teacher-timetable.component";
import {TeacherGradesComponent} from "./components/teacher-grades/teacher-grades.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reset', component: ResetComponent},
  {
    path: 'admin',
    //canActivate: [AuthGuard, HasRoleGuard],
    //data: { role: 'ADMIN'},
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'teachers', component: TeachersComponent },
      { path: 'admins', component: AdminsComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'tutors', component: TutorsComponent },
      { path: 'classes', component: ClassesComponent },
      { path: 'classrooms', component: ClassroomsComponent },
      { path: 'subjects', component: SubjectsComponent },
      { path: 'timetable', component: TimetableComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'teacher',
    //canActivate: [AuthGuard, HasRoleGuard],
    //data: { role: 'TEACHER' },
    children: [
      { path: 'dashboard', component: TeacherDashboardComponent },
      { path: 'lessons', component: TeacherLessonsComponent },
      { path: 'timetable', component: TeacherTimetableComponent },
      { path: 'grades', component: TeacherGradesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
