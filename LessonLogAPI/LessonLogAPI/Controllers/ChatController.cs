using LessonLogAPI.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LessonLogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;

        public ChatController(IChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpGet]
        public ActionResult GetAllMessages()
        {
            var messages = _chatService.GetAllMessages();

            return Ok(messages);
        }

        [HttpGet("private/{from}/{to}")]
        public ActionResult GetPrivateMessages([FromRoute] int from, [FromRoute] int to)
        {
            var messages = _chatService.GetPrivateMessages(from, to);

            return Ok(messages);
        }
    }
}
