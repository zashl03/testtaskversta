using Microsoft.EntityFrameworkCore;
using TestTaskVersta.Models;

namespace TestTaskVersta.Data;

public class AppDbContext : DbContext
{   
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var builder = modelBuilder.Entity<Order>();

        builder.ToTable("Orders");

        builder.HasKey(o => o.Id);

        builder.Property(o => o.Id)
            .IsRequired();
        
        builder.Property(o => o.SenderCity)
            .IsRequired();
        
        builder.Property(o => o.SenderAddress)
            .IsRequired();
        
        builder.Property(o => o.RecipientCity)
            .IsRequired();
        
        builder.Property(o => o.RecipientAddress)
            .IsRequired();
        
        builder.Property(o => o.CargoWeight)
            .IsRequired();
        
        builder.Property(o => o.CargoDatePickup)
            .IsRequired();
    }
}
