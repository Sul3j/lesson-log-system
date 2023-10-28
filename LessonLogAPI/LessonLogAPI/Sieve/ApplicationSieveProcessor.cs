using LessonLogAPI.Models.Entities;
using Microsoft.Extensions.Options;
using Sieve.Models;
using Sieve.Services;

namespace LessonLogAPI.Sieve
{
    public class ApplicationSieveProcessor : SieveProcessor
    {
        public ApplicationSieveProcessor(IOptions<SieveOptions> options) : base(options)
        {
        }

        protected override SievePropertyMapper MapProperties(SievePropertyMapper mapper)
        {
            mapper.Property<Admin>(a => a.User.FirstName)
                .CanSort()
                .CanFilter()
                .HasName("userFirstName");

            mapper.Property<Admin>(a => a.User.LastName)
                .CanSort()
                .CanFilter()
                .HasName("userLastName");

            mapper.Property<Admin>(a => a.CreatedAt)
                .CanFilter()
                .CanSort();

            mapper.Property<Teacher>(t => t.User.FirstName)
                .CanSort()
                .CanFilter()
                .HasName("userFirstName");

            mapper.Property<Teacher>(t => t.User.LastName)
                .CanSort()
                .CanFilter()
                .HasName("userLastName");

            mapper.Property<Student>(s => s.User.FirstName)
                .CanSort()
                .CanFilter()
                .HasName("userFirstName");

            mapper.Property<Student>(s => s.User.LastName)
                .CanSort()
                .CanFilter()
                .HasName("userLastName");

            mapper.Property<Student>(s => s.User.PhoneNumber)
                .CanSort()
                .CanFilter()
                .HasName("userPhoneNumber");

            mapper.Property<Student>(s => s.User.Email)
                .CanSort()
                .CanFilter()
                .HasName("userEmail");

            mapper.Property<Student>(s => s.Pesel)
                .CanSort()
                .CanFilter();

            mapper.Property<Student>(s => s.Class.Year)
                .CanSort()
                .CanFilter()
                .HasName("classYear");

            mapper.Property<Student>(s => s.Class.Name)
                .CanSort()
                .CanFilter()
                .HasName("className");

            mapper.Property<Tutor>(t => t.User.FirstName)
                .CanSort()
                .CanFilter()
                .HasName("userFirstName");

            mapper.Property<Tutor>(t => t.User.LastName)
                .CanSort()
                .CanFilter()
                .HasName("userLastName");

            mapper.Property<Tutor>(t => t.User.PhoneNumber)
                .CanSort()
                .CanFilter()
                .HasName("userPhoneNumber");

            mapper.Property<Tutor>(t => t.User.Email)
                .CanSort()
                .CanFilter()
                .HasName("userEmail");

            mapper.Property<Subject>(s => s.Name)
                .CanSort()
                .CanFilter();

            mapper.Property<Classroom>(c => c.Name)
                .CanSort()
                .CanFilter();

            mapper.Property<Classroom>(c => c.Number)
                .CanSort()
                .CanFilter();

            return mapper;
        }
    }
}
