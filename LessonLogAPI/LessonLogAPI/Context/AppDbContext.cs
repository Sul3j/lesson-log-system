using LessonLogAPI.Helpers;
using LessonLogAPI.Models;
using LessonLogAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;

namespace LessonLogAPI.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<Tutor> Tutors { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<TimetableLesson> TimetableLessons { get; set; }
        public DbSet<Classroom> Classrooms { get; set; }
        public DbSet<LessonHour> LessonHours { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(eb =>
            {
                eb.HasOne(u => u.Teacher)
                .WithOne(t => t.User)
                .HasForeignKey<Teacher>(t => t.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);

                eb.HasOne(u => u.Student)
                .WithOne(s => s.User)
                .HasForeignKey<Student>(s => s.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);

                eb.HasOne(u => u.Tutor)
                .WithOne(t => t.User)
                .HasForeignKey<Tutor>(t => t.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);

                eb.HasOne(u => u.Admin)
                .WithOne(a => a.User)
                .HasForeignKey<Admin>(a => a.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);

                eb.HasData(
                    new User() { Id = 1, FirstName = "Carrie", LastName = "Williams", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "susan24@example.org", Role = "USER" },
                    new User() { Id = 2, FirstName = "Audrey", LastName = "Pineda", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "nealdaniel@example.org", Role = "USER" },
                    new User() { Id = 3, FirstName = "Grace", LastName = "Wilson", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "paulwise@example.com", Role = "USER" },
                    new User() { Id = 4, FirstName = "Mary", LastName = "Clark", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "laurasharp@example.org", Role = "USER" },
                    new User() { Id = 5, FirstName = "Mary", LastName = "Lowe", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "richard38@example.net", Role = "USER" },
                    new User() { Id = 6, FirstName = "Patricia", LastName = "Garcia", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "garrett04@example.net", Role = "USER" },
                    new User() { Id = 7, FirstName = "Logan", LastName = "Andrews", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "gscott@example.net", Role = "USER" },
                    new User() { Id = 8, FirstName = "Krystal", LastName = "West", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "tyler02@example.com", Role = "USER" },
                    new User() { Id = 9, FirstName = "John", LastName = "Weber", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "bsanchez@example.com", Role = "USER" },
                    new User() { Id = 10, FirstName = "Michael", LastName = "Diaz", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "nicholashodges@example.com", Role = "USER" },
                    new User() { Id = 11, FirstName = "Benjamin", LastName = "Kirby", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "krivera@example.org", Role = "USER" },
                    new User() { Id = 12, FirstName = "Elizabeth", LastName = "Rosario", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "zrivera@example.org", Role = "USER" },
                    new User() { Id = 13, FirstName = "Kristi", LastName = "Allen", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "othompson@example.com", Role = "USER" },
                    new User() { Id = 14, FirstName = "Nicholas", LastName = "Holmes", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "daltonalex@example.net", Role = "USER" },
                    new User() { Id = 15, FirstName = "Benjamin", LastName = "Braun", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "collinsmiguel@example.org", Role = "USER" },
                    new User() { Id = 16, FirstName = "Tamara", LastName = "Gonzalez", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "mphillips@example.net", Role = "USER" },
                    new User() { Id = 17, FirstName = "Margaret", LastName = "Smith", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "jasonhamilton@example.net", Role = "USER" },
                    new User() { Id = 18, FirstName = "Kristina", LastName = "Brown", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "wilsonkayla@example.com", Role = "USER" },
                    new User() { Id = 19, FirstName = "Allison", LastName = "Wilson", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "shannon76@example.com", Role = "USER" },
                    new User() { Id = 20, FirstName = "Valerie", LastName = "Klein", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "jonathan75@example.com", Role = "USER" },
                    new User() { Id = 21, FirstName = "Brian", LastName = "Herrera", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "andreaharris@example.net", Role = "USER" },
                    new User() { Id = 22, FirstName = "Christina", LastName = "Reeves", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "danielwalker@example.org", Role = "USER" },
                    new User() { Id = 23, FirstName = "Scott", LastName = "Price", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "leeandrea@example.net", Role = "USER" },
                    new User() { Id = 24, FirstName = "Anthony", LastName = "Duncan", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "sstevens@example.org", Role = "USER" },
                    new User() { Id = 25, FirstName = "Adam", LastName = "Parker", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "brownjon@example.com", Role = "USER" },
                    new User() { Id = 26, FirstName = "Gregory", LastName = "Love", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "keynorma@example.com", Role = "USER" },
                    new User() { Id = 27, FirstName = "Kyle", LastName = "Jones", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "terrance01@example.org", Role = "USER" },
                    new User() { Id = 28, FirstName = "Charles", LastName = "Wolf", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "owensraymond@example.org", Role = "USER" },
                    new User() { Id = 29, FirstName = "Angela", LastName = "Rice", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "william21@example.org", Role = "USER" },
                    new User() { Id = 30, FirstName = "Raymond", LastName = "Martinez", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "susan2454@example.org", Role = "USER" },
                    new User() { Id = 31, FirstName = "Szymon", LastName = "Sulejczak", Password = PasswordHasher.HashPassword("Example#Password$23"), Email = "szymon.sul3jczak@gmail.com", Role = "ADMIN" }
                    );
            });
                
            modelBuilder.Entity<Teacher>(eb =>
            {
                eb.HasOne(t => t.Class)
                .WithOne(c => c.Teacher)
                .HasForeignKey<Class>(c => c.EducatorId)
                .OnDelete(DeleteBehavior.ClientSetNull);

                eb.HasMany(t => t.Lessons)
                .WithOne(l => l.Teacher)
                .HasForeignKey(l => l.TeacherId)
                .OnDelete(DeleteBehavior.ClientSetNull);

                eb.HasMany(t => t.TimetableLessons)
                .WithOne(t => t.Teacher)
                .HasForeignKey(t => t.TeacherId)
                .OnDelete(DeleteBehavior.ClientSetNull);

                eb.HasMany(t => t.Subjects)
                .WithMany(s => s.Teachers);
            });

            modelBuilder.Entity<Subject>(eb =>
            {
                eb.HasMany(s => s.Lessons)
                .WithOne(l => l.Subject)
                .HasForeignKey(l => l.SubjectId)
                .OnDelete(DeleteBehavior.Cascade);

                eb.HasMany(s => s.Grades)
                .WithOne(g => g.Subject)
                .HasForeignKey(g => g.SubjectId)
                .OnDelete(DeleteBehavior.Cascade);

                eb.HasMany(s => s.TimetableLessons)
                .WithOne(t => t.Subject)
                .HasForeignKey(t => t.SubjectId)
                .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Class>(eb =>
            {
                eb.HasMany(c => c.Lessons)
                .WithOne(l => l.Class)
                .HasForeignKey(l => l.ClassId)
                .OnDelete(DeleteBehavior.Cascade);

                eb.HasMany(c => c.Students)
                .WithOne(s => s.Class)
                .HasForeignKey(s => s.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull);

                eb.HasMany(c => c.TimetableLessons)
                .WithOne(t => t.Class)
                .HasForeignKey(t => t.ClassId)
                .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Lesson>(eb =>
            {
                eb.HasMany(l => l.Attendances)
                .WithOne(a => a.Lesson)
                .HasForeignKey(a => a.LessonId)
                .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Student>(eb =>
            {
                eb.HasMany(s => s.Attendances)
                .WithOne(a => a.Student)
                .HasForeignKey(a => a.StudentId)
                .OnDelete(DeleteBehavior.Cascade);

                eb.HasMany(s => s.Grades)
                .WithOne(g => g.Student)
                .HasForeignKey(g => g.StudentId)
                .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Tutor>(eb =>
            {
                eb.HasMany(t => t.Students)
                .WithOne(s => s.Tutor)
                .HasForeignKey(s => s.TutorId)
                .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Classroom>(eb =>
            {
                eb.HasMany(c => c.TimetableLessons)
                .WithOne(t => t.Classroom)
                .HasForeignKey(t => t.ClassroomId)
                .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Admin>(eb =>
            {
                eb.HasData(new Admin() { Id = 1, CreatedAt = DateTime.Now, UserId = 31 });
            });

            modelBuilder.Entity<LessonHour>(eb =>
            {
                eb.HasMany(l => l.TimetableLessons)
                .WithOne(t => t.LessonHour)
                .HasForeignKey(t => t.LessonHourId)
                .OnDelete(DeleteBehavior.ClientSetNull);

                eb.HasMany(l => l.Lessons)
                .WithOne(l => l.LessonHour)
                .HasForeignKey(l => l.LessonHourId)
                .OnDelete(DeleteBehavior.ClientSetNull);

                eb.HasData(
                    new LessonHour() { Id = 1, From = "8:00", To = "8:45" },
                    new LessonHour() { Id = 2, From = "8:50", To = "9:35" },
                    new LessonHour() { Id = 3, From = "9:45", To = "10:30" },
                    new LessonHour() { Id = 4, From = "10:40", To = "11:25" },
                    new LessonHour() { Id = 5, From = "11:35", To = "12:20" },
                    new LessonHour() { Id = 6, From = "12:40", To = "13:25" },
                    new LessonHour() { Id = 7, From = "13:35", To = "14:20" },
                    new LessonHour() { Id = 8, From = "14:30", To = "15:15" },
                    new LessonHour() { Id = 9, From = "15:25", To = "16:10" },
                    new LessonHour() { Id = 10, From = "16:20", To = "17:05" },
                    new LessonHour() { Id = 11, From = "17:15", To = "18:00" },
                    new LessonHour() { Id = 12, From = "18:10", To = "18:55" },
                    new LessonHour() { Id = 13, From = "19:05", To = "19:50" }
                 );
            });
        }
    }
}
