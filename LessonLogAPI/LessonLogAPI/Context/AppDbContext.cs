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
            });
        }
    }
}
