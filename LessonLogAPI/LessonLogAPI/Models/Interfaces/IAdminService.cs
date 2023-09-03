using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface IAdminService
    {
        Admin AddAdmin(Admin admin);

        List<Admin> GetAdmins();

        Admin DeleteAdmin(int id);
    }
}
