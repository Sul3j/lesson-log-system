using System.ComponentModel.DataAnnotations;

namespace LessonLogAPI.Models.Entities
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        public int From { get; set; }
        public int To { get; set; }
        public string Content { get; set; }
        public int Group { get; set; }
    }
}
