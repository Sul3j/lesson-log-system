using LessonLogAPI.Models.Dto;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.AspNetCore.JsonPatch.Internal;
using Microsoft.AspNetCore.SignalR;
using Microsoft.VisualBasic;

namespace LessonLogAPI.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IChatService _chatService;

        public ChatHub(IChatService chatService)
        {
            _chatService = chatService;
        }

        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "LessonLogChat");

            await Clients.Caller.SendAsync("UserConnected");
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "LessonLogChat");

            await base.OnDisconnectedAsync(exception);
        }

        public List<User> AddUserConnectionId(int userId)
        {
            _chatService.AddUserConnectionId(userId, Context.ConnectionId);
            return _chatService.GetAllUsers();
        }

        public async Task ReciveMessage(MessageDto message)
        {
            await Clients.Group("LessonLogChat").SendAsync("NewMessage", message);
        }
    }
}
