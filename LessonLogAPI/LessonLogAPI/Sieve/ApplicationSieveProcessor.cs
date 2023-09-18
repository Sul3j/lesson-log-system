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

            return mapper;
        }
    }
}
