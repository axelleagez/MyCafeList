using Microsoft.EntityFrameworkCore;
using MyCafeList.Models;

public class SeedData
{
    public static void Init()
    {
        DataContext context = new DataContext();

        if (context.Cafes.Any())
        {
            return;
        }

        // Add café1
        Cafe cafe1 = new Cafe
        {
            Id = 1,
            IdUser = 1, // ID utilisateur fictif
            Nom = "CaféTest1",
            Adresse = "Adresse Test 1",
            Ville = "Bordeaux",
            Pays = "France",
            Description = "Test test test 1",
            Note = null,
            Commentaire = null,
            DateCreation = DateTime.Now,
        };
        // Add café2
        Cafe cafe2 = new Cafe
        {
            Id = 2,
            IdUser = 1, // ID utilisateur fictif
            Nom = "CaféTest2",
            Adresse = "Adresse Test 2",
            Ville = "Bordeaux",
            Pays = "France",
            Description = null,
            Note = null,
            Commentaire = null,
            DateCreation = DateTime.Now,
        };

        // Ajout des cafés à la base de données
        context.Cafes.AddRange(cafe1, cafe2);
        context.SaveChanges();

        //Add café1 et café2 à cafeList
        CafeList cafeList = new CafeList
        {
            Id = 1,
            IdUser = 1, // ID utilisateur fictif
            ListCafe = new List<Cafe> { cafe1, cafe2 },
        };

        // Ajout de la liste de cafés à la base de données
        context.CafeLists.Add(cafeList);
        context.SaveChanges();
    }
}
