import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import {TokenInterceptor} from "./interceptors/token.interceptor";
import { ResetComponent } from './components/auth/reset/reset.component';
import { AdminsComponent } from './components/admin/admins/admins.component';
import { UsersComponent } from './components/admin/users/users.component';
import { TeachersComponent } from './components/admin/teachers/teachers.component';
import { StudentsComponent } from './components/admin/students/students.component';
import { MainNavComponent } from './components/admin/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import { TutorsComponent } from './components/admin/tutors/tutors.component';
import {MatMenuModule} from "@angular/material/menu";
import { ClassesComponent } from './components/admin/clases/classes.component';
import { ClassroomsComponent } from './components/admin/classrooms/classrooms.component';
import { SubjectsComponent } from './components/admin/subjects/subjects.component';
import { TimetableComponent } from './components/admin/timetable/timetable.component';
import { TeacherDashboardComponent } from './components/teacher/teacher-dashboard/teacher-dashboard.component';
import { TeacherMainNavComponent } from './components/teacher/teacher-main-nav/teacher-main-nav.component';
import { TeacherLessonsComponent } from './components/teacher/teacher-lessons/teacher-lessons.component';
import { TeacherTimetableComponent } from './components/teacher/teacher-timetable/teacher-timetable.component';
import { TeacherGradesComponent } from './components/teacher/teacher-grades/teacher-grades.component';
import { StudentDashboardComponent } from './components/student/student-dashboard/student-dashboard.component';
import { TutorDashboardComponent } from './components/tutor/tutor-dashboard/tutor-dashboard.component';
import { TutorMainNavComponent } from './components/tutor/tutor-main-nav/tutor-main-nav.component';
import { StudentMainNavComponent } from './components/student/student-main-nav/student-main-nav.component';
import { StudentTimetableComponent } from './components/student/student-timetable/student-timetable.component';
import { TutorTimetableComponent } from './components/tutor/tutor-timetable/tutor-timetable.component';
import { StudentGradesComponent } from './components/student/student-grades/student-grades.component';
import { TutorGradesComponent } from './components/tutor/tutor-grades/tutor-grades.component';
import { StudentLessonsComponent } from './components/student/student-lessons/student-lessons.component';
import { TutorLessonsComponent } from './components/tutor/tutor-lessons/tutor-lessons.component';
import { StudentChatComponent } from './components/student/student-chat/student-chat.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatInputComponent } from './components/chat/chat-input/chat-input.component';
import { MessagesComponent } from './components/chat/messages/messages.component';
import { TutorChatComponent } from './components/tutor/tutor-chat/tutor-chat.component';
import { AdminChatComponent } from './components/admin/admin-chat/admin-chat.component';
import { TeacherChatComponent } from './components/teacher/teacher-chat/teacher-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ResetComponent,
    AdminsComponent,
    UsersComponent,
    TeachersComponent,
    StudentsComponent,
    MainNavComponent,
    TutorsComponent,
    ClassesComponent,
    ClassroomsComponent,
    SubjectsComponent,
    TimetableComponent,
    TeacherDashboardComponent,
    TeacherMainNavComponent,
    TeacherLessonsComponent,
    TeacherTimetableComponent,
    TeacherGradesComponent,
    StudentDashboardComponent,
    TutorDashboardComponent,
    TutorMainNavComponent,
    StudentMainNavComponent,
    StudentTimetableComponent,
    TutorTimetableComponent,
    StudentGradesComponent,
    TutorGradesComponent,
    StudentLessonsComponent,
    TutorLessonsComponent,
    StudentChatComponent,
    ChatComponent,
    ChatInputComponent,
    MessagesComponent,
    TutorChatComponent,
    AdminChatComponent,
    TeacherChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
