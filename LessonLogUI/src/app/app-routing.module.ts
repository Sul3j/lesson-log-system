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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'reset', component: ResetComponent},
  { path: 'teachers', component: TeachersComponent },
  { path: 'admins', component: AdminsComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'tutors', component: TutorsComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'classrooms', component: ClassroomsComponent },
  { path: 'subjects', component: SubjectsComponent }
];

// canActivate: [AuthGuard, HasRoleGuard], data: { role: 'TEACHER' }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
