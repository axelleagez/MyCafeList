//ce document définit un contexte de données
//il déclare les tables Users et Cafes et configure leur relation

using Microsoft.EntityFrameworkCore;
using MyCafeList.Models;

public class DataContext : DbContext
{
    // déclaration des tables du back
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Cafe> Cafes { get; set; } = null!;

    public string DbPath { get; private set; }

    public DataContext()
    {
        DbPath = "ApiCafe.db"; //définition du chemin d'accès
    }

    // configuration d'entity framework pour utiliser le back et la bdd SQLite
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite($"Data Source={DbPath}");
    }

    //on établit le modèle : 1 café appartient à 1 user, 1 user peut avoir plusieurs cafés, lorsqu'on supprime un user ses cafés sont supprimés
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
