using LessonLogAPI.Context;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;

namespace LessonLogAPI.Services
{
    public class ChatService : IChatService
    {
        private readonly AppDbContext _dbContext;

        public ChatService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // dodanie do usera connectionId
        public void AddUserConnectionId(int userId, string connectionId)
        {
            var users = _dbContext.Users.ToList();

            lock (users)
            {
                foreach (User user in users)
                {
                    if(user.Id == userId)
                    {
                        user.ChatConnectionKey = connectionId;
                    }
                }
            }

            _dbContext.SaveChanges();
        }

        // wyszukanie usera o danym connectionId i wypisanie jego nazwy
        public int GetUserByConnectionId(string connectionId)
        {
            return _dbContext.Users
                .Where(user => user.ChatConnectionKey == connectionId)
                .Select(user => user.Id)
                .FirstOrDefault();
        }

        // wyszukanie usera po nazwie i wypisanie jego connectionId
        public string GetConnectionIdByUser(int userId)
        {
            return _dbContext.Users
                .Where(user => user.Id == userId)
                .Select(user => user.ChatConnectionKey)
                .FirstOrDefault();   
        }

        public List<User> GetAllUsers()
        {
            return _dbContext.Users.ToList();
        }
    }
}
