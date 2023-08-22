using INF_01127.Models.Actors;
using Microsoft.EntityFrameworkCore;

namespace INF_01127.Database.Context
{
    public class Context : DbContext
    {
        public DbSet<UserModel> Users { get; set; }
        public DbSet<DonorModel> Donors { get; set; }
        public DbSet<KitchenModel> Kitchens { get; set; }
        public DbSet<ManagerModel> Managers { get; set; }
        public DbSet<DonationModel> Donations { get; set; }

        public DbSet<EventModel> Events { get; set; }
        public Context(DbContextOptions<Context> options) : base(options)
        {

        }
    }
}