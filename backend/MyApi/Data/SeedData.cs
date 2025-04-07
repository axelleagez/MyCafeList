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

        context.Users.AddRange(user1, user2);
        context.SaveChanges();

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

        context.Cafes.AddRange(cafe1, cafe2);
        context.SaveChanges();
    }
}
