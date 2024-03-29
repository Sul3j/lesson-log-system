﻿using System.ComponentModel.DataAnnotations;

namespace LessonLogAPI.Models.Entities
{
    public class Teacher
    {
        [Key]
        public int Id { get; set; }
        public User User { get; set; }
        public int? UserId { get; set; }
        public Class Class { get; set; }
        public List<Lesson> Lessons { get; set; } = new List<Lesson>();
        public List<TimetableLesson> TimetableLessons { get; set; } = new List<TimetableLesson>();
        public List<Subject> Subjects { get; set; }
    }
}
