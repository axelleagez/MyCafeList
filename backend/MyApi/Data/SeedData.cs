using Microsoft.EntityFrameworkCore;
using MyCafeList.Models;

public class SeedData
{
    public static void Init()
    {
        using var context = new DataContext();

        if (context.Cafes.Any() || context.Users.Any())
        {
            return;
        }

        // Création de l'utilisateur fictif
        User user1 = new User
        {
            Nom = "UtilisateurTest",
            Email = "test@example.com",
            MotDePasse = "password123",
            ModePrive = false,
        };
        User user2 = new User
        {
            Nom = "UtilisateurTest2",
            Email = "test2@example.com",
            MotDePasse = "password123",
            ModePrive = false,
        };

        context.Users.AddRange(user1, user2);
        context.SaveChanges();

        // Add café1
        Cafe cafe1 = new Cafe
        {
            IdUser = user1.Id, // ID utilisateur fictif
            Nom = "CaféTest1",
            Adresse = "Adresse Test 1",
            Ville = "Bordeaux",
            Pays = "France",
            Description = "Test test test 1",
            Note = null,
            Commentaire = null,
            DateCreation = DateTime.Now,
            StatutFav = false,
        };
        // Add café2
        Cafe cafe2 = new Cafe
        {
            IdUser = user1.Id, // ID utilisateur fictif
            Nom = "CaféTest2",
            Adresse = "Adresse Test 2",
            Ville = "Bordeaux",
            Pays = "France",
            Description = null,
            Note = null,
            Commentaire = null,
            DateCreation = DateTime.Now,
            StatutFav = false,
        };

        // Ajout des cafés à la base de données
        context.Cafes.AddRange(cafe1, cafe2);
        context.SaveChanges();
    }
}
