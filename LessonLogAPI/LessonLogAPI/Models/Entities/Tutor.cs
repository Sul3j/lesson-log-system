﻿using System.ComponentModel.DataAnnotations;

namespace LessonLogAPI.Models.Entities
{
    public class Tutor
    {
        [Key]
        public int Id { get; set; }
        public List<Student> Students { get; set; } = new List<Student>();
        public User User { get; set; }
        public int? UserId { get; set; }
    }
}
