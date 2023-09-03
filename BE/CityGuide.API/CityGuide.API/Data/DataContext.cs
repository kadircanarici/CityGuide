using Microsoft.EntityFrameworkCore;

namespace CityGuide.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):base(options)
        {

        }

        //public DbSet<User> Users  { get; set; }
    }
}
