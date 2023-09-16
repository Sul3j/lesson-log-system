using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface IAdminService
    {
        Admin AddAdmin(Admin admin);

        IQueryable<Admin> GetAdmins();

        Admin DeleteAdmin(int id);

        Admin GetAdmin(int id);
    }
}
