using LessonLogAPI.Models.Entities;

namespace LessonLogAPI.Models.Interfaces
{
    public interface IChatService
    {
        void AddUserConnectionId(int userId, string connectionId);

        int GetUserByConnectionId(string connectionId);

        string GetConnectionIdByUser(int userId);

        List<User> GetAllUsers();
    }
}
