//ce document est un initialisateur de données
//il insère un jeu de données de base dans la base de données

using Microsoft.EntityFrameworkCore;
using MyCafeList.Models;

public class SeedData
{
    public static void Init()
    {
        //déclaration du contexte pour accéder à la bdd
        using var context = new DataContext();

        //si des cafés ou des users existent déjà dans notre bdd, on ne fait rien
        if (context.Cafes.Any() || context.Users.Any())
        {
            return;
        }

        //création de deux users initiaux
        User user1 = new User
        {
            Name = "UtilisateurTest",
            Email = "aagez@ensc.fr",
            Password = "mdp",
            PrivateMode = false,
        };
        User user2 = new User
        {
            Name = "UtilisateurTest2",
            Email = "fpicavet@ensc.fr",
            Password = "mdp",
            PrivateMode = false,
        };

        //on les enregistre dans la bdd
        context.Users.AddRange(user1, user2);
        context.SaveChanges();

        //création de deux cafés initiaux
        Cafe cafe1 = new Cafe
        {
            IdUser = user1.Id,
            Name = "CaféTest1",
            Adress = "Adresse Test 1",
            City = "Bordeaux",
            Country = "France",
            Description = "Test test test 1",
            Note = null,
            Comment = null,
            CreationDate = DateTime.Now,
            FavStatus = false,
        };
        Cafe cafe2 = new Cafe
        {
            IdUser = user1.Id,
            Name = "CaféTest2",
            Adress = "Adresse Test 2",
            City = "Bordeaux",
            Country = "France",
            Description = null,
            Note = null,
            Comment = null,
            CreationDate = DateTime.Now,
            FavStatus = false,
        };

        //on les enregistre dans la bdd
        context.Cafes.AddRange(cafe1, cafe2);
        context.SaveChanges();
    }
}
