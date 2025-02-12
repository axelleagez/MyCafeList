using Microsoft.EntityFrameworkCore;
using MyCafeList.Models;

public class DataContext : DbContext
{
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Cafe> Cafes { get; set; } = null!;
    public DbSet<CafeList> CafeLists { get; set; } = null!;
    public DbSet<Favorites> Favorites { get; set; } = null!;

    public string DbPath { get; private set; }

    public DataContext()
    {
        // Définition du chemin vers la base de données SQLite
        DbPath = "ApiCafe.db";
    }

    // Configuration d'Entity Framework pour utiliser SQLite
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite($"Data Source={DbPath}");
    }
}
