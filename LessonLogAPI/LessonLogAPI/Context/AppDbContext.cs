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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>()
                .HasOne(r => r.User)
                .WithOne(u => u.Role)
                .HasForeignKey<User>(r => r.RoleId);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Teacher)
                .WithOne(t => t.User)
                .HasForeignKey<Teacher>(t => t.UserId);

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
            });

            modelBuilder.Entity<Class>(eb =>
            {
                eb.HasMany(c => c.Lessons)
                .WithOne(l => l.Class)
                .HasForeignKey(l => l.ClassId);
            });

            modelBuilder.Entity<Lesson>(eb =>
            {
                eb.HasMany(l => l.Attendances)
                .WithOne(a => a.Lesson)
                .HasForeignKey(a => a.LessonId);
            });

        }
    }
}
