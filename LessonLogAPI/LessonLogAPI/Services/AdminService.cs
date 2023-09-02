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

        public async Task<Admin> AddAdmin(Admin admin)
        {
            admin.CreatedAt = DateTime.Now;

            await _dbContext.Admins.AddAsync(admin);
            await _dbContext.SaveChangesAsync();

            return admin;
        }

        public List<Admin> GetAdmins()
        {
            var admins = _dbContext.Admins
                .Include(a => a.User)
                .ToList();

            return admins;
        }

        public object DeleteAdmin(int id)
        {
            var admin = _dbContext.Admins.FirstOrDefault(a => a.Id == id);

            var test = admin;

            if (admin != null)
            {
                _dbContext.Admins.Remove(admin);
            }

            _dbContext.SaveChanges();

            return new { Message = test };
        }
    }
}
