namespace MyCafeList.Models;

public class FavoritesDTO
{
    public int Id { get; set; }
    public int IdUser { get; set; }
    public int IdCafe { get; set; }
    public string NomCafe { get; set; } = null!;
    public string Adresse { get; set; } = null!;
    public DateTime DateAjout { get; set; }
    public Cafe Cafe { get; set; } = null!;

    public FavoritesDTO() { }

    public FavoritesDTO(Favorites favorites)
    {
        Id = favorites.Id;
        IdUser = favorites.IdUser;
        IdCafe = favorites.IdCafe;
        NomCafe = favorites.Cafe.Nom;
        Adresse = favorites.Cafe.Adresse;
        DateAjout = favorites.DateAjout;
    }
}
