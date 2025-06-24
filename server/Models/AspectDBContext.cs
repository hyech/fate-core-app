using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    public class AspectDBContext : DbContext
    {
        public AspectDBContext(DbContextOptions<AspectDBContext> options) : base(options)
        {

        }
        
        public DbSet<Aspect> Aspects { get; set; }
    }
}