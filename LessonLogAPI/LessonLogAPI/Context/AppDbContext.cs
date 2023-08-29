using LessonLogAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace LessonLogAPI.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {


        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<Tutor> Tutors { get; set; }
        public DbSet<Admin> Admins { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>()
                .HasOne(r => r.User)
                .WithOne(u => u.Role)
                .HasForeignKey<User>(r => r.RoleId);

            modelBuilder.Entity<User>(eb =>
            {   
                eb.HasOne(u => u.Teacher)
                .WithOne(t => t.User)
                .HasForeignKey<Teacher>(t => t.UserId);

                eb.HasOne(u => u.Student)
                .WithOne(s => s.User)
                .HasForeignKey<Student>(s => s.UserId);

                eb.HasOne(u => u.Tutor)
                .WithOne(t => t.User)
                .HasForeignKey<Tutor>(t => t.UserId);

                eb.HasOne(u => u.Admin)
                .WithOne(a => a.User)
                .HasForeignKey<Admin>(a => a.UserId);
            });
                
            modelBuilder.Entity<Teacher>(eb =>
            {
                eb.HasMany(t => t.Classes)
                .WithMany(c => c.Teachers);

                eb.HasMany(t => t.Lessons)
                .WithOne(l => l.Teacher)
                .HasForeignKey(l => l.TeacherId);
            });

            modelBuilder.Entity<Subject>(eb =>
            {
                eb.HasMany(s => s.Lessons)
                .WithOne(l => l.Subject)
                .HasForeignKey(l => l.SubjectId);

                eb.HasMany(s => s.Grades)
                .WithOne(g => g.Subject)
                .HasForeignKey(g => g.SubjectId);
            });

            modelBuilder.Entity<Class>(eb =>
            {
                eb.HasMany(c => c.Lessons)
                .WithOne(l => l.Class)
                .HasForeignKey(l => l.ClassId);

                eb.HasMany(c => c.Students)
                .WithOne(s => s.Class)
                .HasForeignKey(s => s.ClassId);
            });

            modelBuilder.Entity<Lesson>(eb =>
            {
                eb.HasMany(l => l.Attendances)
                .WithOne(a => a.Lesson)
                .HasForeignKey(a => a.LessonId);
            });

            modelBuilder.Entity<Student>(eb =>
            {
                eb.HasMany(s => s.Attendances)
                .WithOne(a => a.Student)
                .HasForeignKey(a => a.StudentId);

                eb.HasMany(s => s.Grades)
                .WithOne(g => g.Student)
                .HasForeignKey(g => g.StudentId);
            });

            modelBuilder.Entity<Tutor>(eb =>
            {
                eb.HasMany(t => t.Students)
                .WithOne(s => s.Tutor)
                .HasForeignKey(s => s.TutorId);
            });
        }
    }
}
