﻿using System.ComponentModel.DataAnnotations;

namespace LessonLogAPI.Models.Entities
{
    public class LessonHour
    {
        [Key]
        public int Id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public List<TimetableLesson> TimetableLessons { get; set; } = new List<TimetableLesson>();
        public List<Lesson> Lessons { get; set; } = new List<Lesson>();
    }
}
