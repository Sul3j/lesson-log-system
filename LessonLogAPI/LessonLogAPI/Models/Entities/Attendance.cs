﻿namespace LessonLogAPI.Models.Entities
{
    public class Attendance
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public Lesson Lesson { get; set; }
        public int LessonId { get; set; }
        public Student Student { get; set; }
        public int StudentId { get; set;}
    }
}