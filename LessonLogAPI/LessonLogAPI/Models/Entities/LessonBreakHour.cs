﻿using System.ComponentModel.DataAnnotations;

namespace LessonLogAPI.Models.Entities
{
    public class LessonBreakHour
    {
        [Key]
        public int Id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public TimetableLesson TimetableLesson { get; set; }
    }
}
