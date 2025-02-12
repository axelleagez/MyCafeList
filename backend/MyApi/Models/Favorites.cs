namespace MyCafeList.Models;

public class Favorites
{
    public int Id { get; set; } // clé primaire
    public int IdUser { get; set; } // clé étrangère
    public int IdCafe { get; set; } // clé étrangère
    public DateTime DateAjout { get; set; } = DateTime.Now;

    public User User { get; set; } = null!;
    public Cafe Cafe { get; set; } = null!;

    public Favorites() { }

    public Favorites(FavoritesDTO favoritesDTO)
    {
        Id = favoritesDTO.Id;
        IdUser = favoritesDTO.IdUser;
        IdCafe = favoritesDTO.IdCafe;
        DateAjout = favoritesDTO.DateAjout;
    }
}
