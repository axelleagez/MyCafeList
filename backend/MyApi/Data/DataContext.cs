using Microsoft.EntityFrameworkCore;
using MyCafeList.Models;

public class DataContext : DbContext
{
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Cafe> Cafes { get; set; } = null!;

    public string DbPath { get; private set; }

    public DataContext()
    {
        DbPath = "ApiCafe.db";
    }

    // Configuration d'Entity Framework pour utiliser SQLite
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite($"Data Source={DbPath}");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<Cafe>()
            .HasOne(c => c.User)
            .WithMany(u => u.Cafes)
            .HasForeignKey(c => c.IdUser)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
