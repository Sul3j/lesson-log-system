import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthGuard} from "./guards/auth.guard";
import {ResetComponent} from "./components/reset/reset.component";
import {HasRoleGuard} from "./guards/has-role.guard";
import {TeachersComponent} from "./components/teachers/teachers.component";
;

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'reset', component: ResetComponent},
  { path: 'teachers', component: TeachersComponent }
];

// canActivate: [AuthGuard, HasRoleGuard], data: { role: 'TEACHER' }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
