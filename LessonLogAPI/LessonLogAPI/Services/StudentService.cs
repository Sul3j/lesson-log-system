﻿using LessonLogAPI.Context;
using LessonLogAPI.Models.Entities;
using LessonLogAPI.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LessonLogAPI.Services
{
    public class StudentService : IStudentService
    {
        private readonly AppDbContext _dbContext;

        public StudentService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Student AddStudent(Student student)
        {
            _dbContext.Students.Add(student);
            _dbContext.SaveChanges();

            return student;
        }

        public IQueryable<Student> GetStudents()
        {
            var students = _dbContext.Students
                .Include(s => s.User)
                .AsQueryable();

            return students;
        }

        public Student GetStudent(int id)
        {
            var student = _dbContext.Students.FirstOrDefault(s => s.Id == id);

            return student;
        }

        public Student GetStudentById(int studentId)
        {
            var student = _dbContext.Students.FirstOrDefault(s => s.Id == studentId);
            return student;
        }

        public void UpdateStudent(Student updatedStudent)
        {
            var existingStudent = _dbContext.Students.FirstOrDefault(s => s.Id == updatedStudent.Id);

            if (existingStudent == null)
            {
                throw new Exception("Student not found");
            }

            existingStudent.ClassId = updatedStudent.ClassId; 

            _dbContext.SaveChanges();
        }
    }
}
