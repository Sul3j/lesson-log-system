﻿// <auto-generated />
using System;
using LessonLogAPI.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LessonLogAPI.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Admin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique()
                        .HasFilter("[UserId] IS NOT NULL");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Attendance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("LessonId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("StudentId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LessonId");

                    b.HasIndex("StudentId");

                    b.ToTable("Attendances");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Class", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("EducatorId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EducatorId")
                        .IsUnique()
                        .HasFilter("[EducatorId] IS NOT NULL");

                    b.ToTable("Classes");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Classroom", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Floor")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Classrooms");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Grade", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("GetDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("GradeValue")
                        .HasColumnType("int");

                    b.Property<int>("GradeWeight")
                        .HasColumnType("int");

                    b.Property<int>("Percent")
                        .HasColumnType("int");

                    b.Property<int?>("StudentId")
                        .HasColumnType("int");

                    b.Property<int?>("SubjectId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StudentId");

                    b.HasIndex("SubjectId");

                    b.ToTable("Grades");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Lesson", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("ClassId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int?>("LessonHourId")
                        .HasColumnType("int");

                    b.Property<int?>("SubjectId")
                        .HasColumnType("int");

                    b.Property<int>("TeacherId")
                        .HasColumnType("int");

                    b.Property<string>("Topic")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ClassId");

                    b.HasIndex("LessonHourId");

                    b.HasIndex("SubjectId");

                    b.HasIndex("TeacherId");

                    b.ToTable("Lessons");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.LessonHour", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("From")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("To")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LessonHours");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            From = "8:00",
                            To = "8:45"
                        },
                        new
                        {
                            Id = 2,
                            From = "8:50",
                            To = "9:35"
                        },
                        new
                        {
                            Id = 3,
                            From = "9:45",
                            To = "10:30"
                        },
                        new
                        {
                            Id = 4,
                            From = "10:40",
                            To = "11:25"
                        },
                        new
                        {
                            Id = 5,
                            From = "11:35",
                            To = "12:20"
                        },
                        new
                        {
                            Id = 6,
                            From = "12:40",
                            To = "13:25"
                        },
                        new
                        {
                            Id = 7,
                            From = "13:35",
                            To = "14:20"
                        },
                        new
                        {
                            Id = 8,
                            From = "14:30",
                            To = "15:15"
                        },
                        new
                        {
                            Id = 9,
                            From = "15:25",
                            To = "16:10"
                        },
                        new
                        {
                            Id = 10,
                            From = "16:20",
                            To = "17:05"
                        },
                        new
                        {
                            Id = 11,
                            From = "17:15",
                            To = "18:00"
                        },
                        new
                        {
                            Id = 12,
                            From = "18:10",
                            To = "18:55"
                        },
                        new
                        {
                            Id = 13,
                            From = "19:05",
                            To = "19:50"
                        });
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Student", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("ClassId")
                        .HasColumnType("int");

                    b.Property<string>("Pesel")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TutorId")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ClassId");

                    b.HasIndex("TutorId");

                    b.HasIndex("UserId")
                        .IsUnique()
                        .HasFilter("[UserId] IS NOT NULL");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Subject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Subjects");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Teacher", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique()
                        .HasFilter("[UserId] IS NOT NULL");

                    b.ToTable("Teachers");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.TimetableLesson", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("ClassId")
                        .HasColumnType("int");

                    b.Property<int?>("ClassroomId")
                        .HasColumnType("int");

                    b.Property<int?>("LessonHourId")
                        .HasColumnType("int");

                    b.Property<int?>("SubjectId")
                        .HasColumnType("int");

                    b.Property<int?>("TeacherId")
                        .HasColumnType("int");

                    b.Property<int>("WeekDay")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ClassId");

                    b.HasIndex("ClassroomId");

                    b.HasIndex("LessonHourId");

                    b.HasIndex("SubjectId");

                    b.HasIndex("TeacherId");

                    b.ToTable("TimetableLessons");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Tutor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique()
                        .HasFilter("[UserId] IS NOT NULL");

                    b.ToTable("Tutors");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("RefreshTokenExpiryTime")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ResetPasswordExpiry")
                        .HasColumnType("datetime2");

                    b.Property<string>("ResetPasswordToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Token")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("SubjectTeacher", b =>
                {
                    b.Property<int>("SubjectsId")
                        .HasColumnType("int");

                    b.Property<int>("TeachersId")
                        .HasColumnType("int");

                    b.HasKey("SubjectsId", "TeachersId");

                    b.HasIndex("TeachersId");

                    b.ToTable("SubjectTeacher");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Admin", b =>
                {
                    b.HasOne("LessonLogAPI.Models.Entities.User", "User")
                        .WithOne("Admin")
                        .HasForeignKey("LessonLogAPI.Models.Entities.Admin", "UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Attendance", b =>
                {
                    b.HasOne("LessonLogAPI.Models.Entities.Lesson", "Lesson")
                        .WithMany("Attendances")
                        .HasForeignKey("LessonId");

                    b.HasOne("LessonLogAPI.Models.Entities.Student", "Student")
                        .WithMany("Attendances")
                        .HasForeignKey("StudentId");

                    b.Navigation("Lesson");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Class", b =>
                {
                    b.HasOne("LessonLogAPI.Models.Entities.Teacher", "Teacher")
                        .WithOne("Class")
                        .HasForeignKey("LessonLogAPI.Models.Entities.Class", "EducatorId");

                    b.Navigation("Teacher");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Grade", b =>
                {
                    b.HasOne("LessonLogAPI.Models.Entities.Student", "Student")
                        .WithMany("Grades")
                        .HasForeignKey("StudentId");

                    b.HasOne("LessonLogAPI.Models.Entities.Subject", "Subject")
                        .WithMany("Grades")
                        .HasForeignKey("SubjectId");

                    b.Navigation("Student");

                    b.Navigation("Subject");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Lesson", b =>
                {
                    b.HasOne("LessonLogAPI.Models.Entities.Class", "Class")
                        .WithMany("Lessons")
                        .HasForeignKey("ClassId");

                    b.HasOne("LessonLogAPI.Models.Entities.LessonHour", "LessonHour")
                        .WithMany("Lessons")
                        .HasForeignKey("LessonHourId");

                    b.HasOne("LessonLogAPI.Models.Entities.Subject", "Subject")
                        .WithMany("Lessons")
                        .HasForeignKey("SubjectId");

                    b.HasOne("LessonLogAPI.Models.Entities.Teacher", "Teacher")
                        .WithMany("Lessons")
                        .HasForeignKey("TeacherId")
                        .IsRequired();

                    b.Navigation("Class");

                    b.Navigation("LessonHour");

                    b.Navigation("Subject");

                    b.Navigation("Teacher");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Student", b =>
                {
                    b.HasOne("LessonLogAPI.Models.Entities.Class", "Class")
                        .WithMany("Students")
                        .HasForeignKey("ClassId");

                    b.HasOne("LessonLogAPI.Models.Entities.Tutor", "Tutor")
                        .WithMany("Students")
                        .HasForeignKey("TutorId");

                    b.HasOne("LessonLogAPI.Models.Entities.User", "User")
                        .WithOne("Student")
                        .HasForeignKey("LessonLogAPI.Models.Entities.Student", "UserId");

                    b.Navigation("Class");

                    b.Navigation("Tutor");

                    b.Navigation("User");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Teacher", b =>
                {
                    b.HasOne("LessonLogAPI.Models.Entities.User", "User")
                        .WithOne("Teacher")
                        .HasForeignKey("LessonLogAPI.Models.Entities.Teacher", "UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.TimetableLesson", b =>
                {
                    b.HasOne("LessonLogAPI.Models.Entities.Class", "Class")
                        .WithMany("TimetableLessons")
                        .HasForeignKey("ClassId");

                    b.HasOne("LessonLogAPI.Models.Entities.Classroom", "Classroom")
                        .WithMany("TimetableLessons")
                        .HasForeignKey("ClassroomId");

                    b.HasOne("LessonLogAPI.Models.Entities.LessonHour", "LessonHour")
                        .WithMany("TimetableLessons")
                        .HasForeignKey("LessonHourId");

                    b.HasOne("LessonLogAPI.Models.Entities.Subject", "Subject")
                        .WithMany("TimetableLessons")
                        .HasForeignKey("SubjectId");

                    b.HasOne("LessonLogAPI.Models.Entities.Teacher", "Teacher")
                        .WithMany("TimetableLessons")
                        .HasForeignKey("TeacherId");

                    b.Navigation("Class");

                    b.Navigation("Classroom");

                    b.Navigation("LessonHour");

                    b.Navigation("Subject");

                    b.Navigation("Teacher");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Tutor", b =>
                {
                    b.HasOne("LessonLogAPI.Models.Entities.User", "User")
                        .WithOne("Tutor")
                        .HasForeignKey("LessonLogAPI.Models.Entities.Tutor", "UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("SubjectTeacher", b =>
                {
                    b.HasOne("LessonLogAPI.Models.Entities.Subject", null)
                        .WithMany()
                        .HasForeignKey("SubjectsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LessonLogAPI.Models.Entities.Teacher", null)
                        .WithMany()
                        .HasForeignKey("TeachersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Class", b =>
                {
                    b.Navigation("Lessons");

                    b.Navigation("Students");

                    b.Navigation("TimetableLessons");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Classroom", b =>
                {
                    b.Navigation("TimetableLessons");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Lesson", b =>
                {
                    b.Navigation("Attendances");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.LessonHour", b =>
                {
                    b.Navigation("Lessons");

                    b.Navigation("TimetableLessons");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Student", b =>
                {
                    b.Navigation("Attendances");

                    b.Navigation("Grades");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Subject", b =>
                {
                    b.Navigation("Grades");

                    b.Navigation("Lessons");

                    b.Navigation("TimetableLessons");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Teacher", b =>
                {
                    b.Navigation("Class");

                    b.Navigation("Lessons");

                    b.Navigation("TimetableLessons");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.Tutor", b =>
                {
                    b.Navigation("Students");
                });

            modelBuilder.Entity("LessonLogAPI.Models.Entities.User", b =>
                {
                    b.Navigation("Admin");

                    b.Navigation("Student");

                    b.Navigation("Teacher");

                    b.Navigation("Tutor");
                });
#pragma warning restore 612, 618
        }
    }
}
