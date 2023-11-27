using LessonLogAPI.Models;
using LessonLogAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;

namespace LessonLogAPI.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {


        }

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
                .OnDelete(DeleteBehavior.ClientSetNull);

                eb.HasMany(s => s.Grades)
                .WithOne(g => g.Subject)
                .HasForeignKey(g => g.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull);

                eb.HasMany(s => s.TimetableLessons)
                .WithOne(t => t.Subject)
                .HasForeignKey(t => t.SubjectId)
                .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Class>(eb =>
            {
                eb.HasMany(c => c.Lessons)
                .WithOne(l => l.Class)
                .HasForeignKey(l => l.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull);

                eb.HasMany(c => c.Students)
                .WithOne(s => s.Class)
                .HasForeignKey(s => s.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull);

                eb.HasMany(c => c.TimetableLessons)
                .WithOne(t => t.Class)
                .HasForeignKey(t => t.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Lesson>(eb =>
            {
                eb.HasMany(l => l.Attendances)
                .WithOne(a => a.Lesson)
                .HasForeignKey(a => a.LessonId)
                .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Student>(eb =>
            {
                eb.HasMany(s => s.Attendances)
                .WithOne(a => a.Student)
                .HasForeignKey(a => a.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull);

                eb.HasMany(s => s.Grades)
                .WithOne(g => g.Student)
                .HasForeignKey(g => g.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull);
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
