﻿namespace LessonLogAPI.Models.Entities
{
    public class Grade
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int GradeValue { get; set; }
        public int Percent { get; set; }
        public int GradeWeight { get; set; }
        public DateTime GetDate { get; set; }
        public Subject Subject { get; set; }
        public int SubjectId { get; set; }
    }
}
