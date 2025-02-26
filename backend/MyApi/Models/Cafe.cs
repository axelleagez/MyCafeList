namespace MyCafeList.Models;

public class Cafe
{
    public int Id { get; set; } // clé primaire
    public int IdUser { get; set; } // clé étrangère
    public string Nom { get; set; } = null!;
    public string Adresse { get; set; } = null!;
    public string Ville { get; set; } = null!;
    public string Pays { get; set; } = null!;
    public string? Description { get; set; }

    //public string? ImageUrl { get; set; }
    public int? Note { get; set; }
    public string? Commentaire { get; set; }
    public DateTime DateCreation { get; set; } = DateTime.Now;
    public bool StatutFav { get; set; }

    public User User { get; set; } = null!;

    public Cafe() { }

    public Cafe(CafeDTO cafeDTO)
    {
        Id = cafeDTO.Id;
        IdUser = cafeDTO.IdUser;
        Nom = cafeDTO.Nom;
        Adresse = cafeDTO.Adresse;
        Ville = cafeDTO.Ville;
        Pays = cafeDTO.Pays;
        Description = cafeDTO.Description;
        //ImageUrl = cafeDTO.ImageUrl;
        Note = cafeDTO.Note;
        Commentaire = cafeDTO.Commentaire;
        DateCreation = cafeDTO.DateCreation;
        StatutFav = cafeDTO.StatutFav;
    }
}
