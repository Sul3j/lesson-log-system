using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface IAdminService
    {
        Task<Admin> AddAdmin(Admin admin);

        List<Admin> GetAdmins();

    }
}
