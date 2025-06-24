using Microsoft.EntityFrameworkCore;

namespace server.Data
{
    public class AspectDBContext : DbContext
    {
        protected readonly IConfiguration Configuration;
        public AspectDBContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(Configuration.GetConnectionString("AspectsDatabase"));
        }

        public DbSet<Aspect> Aspects { get; set; }
    }
}