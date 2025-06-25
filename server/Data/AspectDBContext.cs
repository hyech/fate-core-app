using Microsoft.EntityFrameworkCore;
using server.Models.Entities;

namespace server.Data
{
    public class AspectDBContext : DbContext
    {
        public AspectDBContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Aspect> Aspects { get; set; }
    }
}