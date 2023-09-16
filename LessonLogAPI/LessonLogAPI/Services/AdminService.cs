using LessonLogAPI.Context;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LessonLogAPI.Services
{
    public class AdminService : IAdminService
    {
        private readonly AppDbContext _dbContext;

        public AdminService(AppDbContext dbContext) 
        { 
            _dbContext = dbContext; 
        }

        public Admin AddAdmin(Admin admin)
        {
            admin.CreatedAt = DateTime.Now;

            _dbContext.Admins.Add(admin);
            _dbContext.SaveChanges();

            return admin;
        }

        public IQueryable<Admin> GetAdmins()
        {
            var admins = _dbContext.Admins
                .Include(a => a.User)
                .AsQueryable();

            return admins;
        }

        public Admin DeleteAdmin(int id)
        {
            var admin = GetAdmin(id);

            if (admin != null)
            {
                _dbContext.Admins.Remove(admin);
            }

            _dbContext.SaveChanges();

            return admin;
        }

        public Admin GetAdmin(int id)
        {
            var admin = _dbContext.Admins.FirstOrDefault(a => a.Id == id);

            return admin;
        }
    }
}
