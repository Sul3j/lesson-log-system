import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {SignupComponent} from "./components/auth/signup/signup.component";
import {DashboardComponent} from "./components/admin/dashboard/dashboard.component";
import {ResetComponent} from "./components/auth/reset/reset.component";
import {TeachersComponent} from "./components/admin/teachers/teachers.component";
import {AdminsComponent} from "./components/admin/admins/admins.component";
import {StudentsComponent} from "./components/admin/students/students.component";
import {TutorsComponent} from "./components/admin/tutors/tutors.component";
import {ClassesComponent} from "./components/admin/clases/classes.component";
import { ClassroomsComponent } from './components/admin/classrooms/classrooms.component';
import {SubjectsComponent} from "./components/admin/subjects/subjects.component";
import {TimetableComponent} from "./components/admin/timetable/timetable.component";
import {AuthGuard} from "./guards/auth.guard";
import {HasRoleGuard} from "./guards/has-role.guard";
import {TeacherDashboardComponent} from "./components/teacher/teacher-dashboard/teacher-dashboard.component";
import {TeacherLessonsComponent} from "./components/teacher/teacher-lessons/teacher-lessons.component";
import {TeacherTimetableComponent} from "./components/teacher/teacher-timetable/teacher-timetable.component";
import {TeacherGradesComponent} from "./components/teacher/teacher-grades/teacher-grades.component";
import {StudentDashboardComponent} from "./components/student/student-dashboard/student-dashboard.component";
import {TutorDashboardComponent} from "./components/tutor/tutor-dashboard/tutor-dashboard.component";
import {StudentTimetableComponent} from "./components/student/student-timetable/student-timetable.component";
import {TutorTimetableComponent} from "./components/tutor/tutor-timetable/tutor-timetable.component";
import {StudentGradesComponent} from "./components/student/student-grades/student-grades.component";
import {TutorGradesComponent} from "./components/tutor/tutor-grades/tutor-grades.component";
import {StudentLessonsComponent} from "./components/student/student-lessons/student-lessons.component";
import {TutorLessonsComponent} from "./components/tutor/tutor-lessons/tutor-lessons.component";
import {StudentChatComponent} from "./components/student/student-chat/student-chat.component";
import {TutorChatComponent} from "./components/tutor/tutor-chat/tutor-chat.component";
import {AdminChatComponent} from "./components/admin/admin-chat/admin-chat.component";
import {TeacherChatComponent} from "./components/teacher/teacher-chat/teacher-chat.component";

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
      { path: 'chat', component: AdminChatComponent },
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
      { path: 'chat', component: TeacherChatComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'student',
    //canActivate: [AuthGuard, HasRoleGuard],
    //data: { role: 'STUDENT' },
    children: [
      { path: 'dashboard', component: StudentDashboardComponent },
      { path: 'timetable', component: StudentTimetableComponent },
      { path: 'grades', component: StudentGradesComponent },
      { path: 'lessons', component: StudentLessonsComponent },
      { path: 'chat', component: StudentChatComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  {
    path: 'tutor',
    //canActivate: [AuthGuard, HasRoleGuard],
    //data: { role: 'TUTOR' },
    children: [
      { path: 'dashboard', component: TutorDashboardComponent },
      { path: 'timetable', component: TutorTimetableComponent },
      { path: 'grades', component: TutorGradesComponent },
      { path: 'lessons', component: TutorLessonsComponent },
      { path: 'chat', component: TutorChatComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
