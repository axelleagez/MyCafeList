namespace MyCafeList.Models;

public class CafeDTO
{
    public int Id { get; set; }
    public int IdUser { get; set; }
    public string Nom { get; set; } = null!;
    public string Adresse { get; set; } = null!;
    public string Ville { get; set; } = null!;
    public string Pays { get; set; } = null!;
    public string? Description { get; set; }

    //public string? ImageUrl { get; set; }
    public int? Note { get; set; }
    public string? Commentaire { get; set; }
    public DateTime DateCreation { get; set; }
    public bool StatutFav { get; set; }

    public CafeDTO() { }

    public CafeDTO(Cafe cafe)
    {
        Id = cafe.Id;
        IdUser = cafe.IdUser;
        Nom = cafe.Nom;
        Adresse = cafe.Adresse;
        Ville = cafe.Ville;
        Pays = cafe.Pays;
        Description = cafe.Description;
        //ImageUrl = cafe.ImageUrl;
        Note = cafe.Note;
        Commentaire = cafe.Commentaire;
        DateCreation = cafe.DateCreation;
        StatutFav = cafe.StatutFav;
    }
}
