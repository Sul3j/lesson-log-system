﻿namespace LessonLogAPI.Models.Dto
{
    public class LessonDto
    {
        public int Id { get; set; }
        public string Topic { get; set; }
        public string SubjectName { get; set; }
        public int ClassYear { get; set; }
        public string ClassName { get; set; }
        public string TeacherName { get; set; }
    }
}
