namespace MyCafeList.Models;

public class GestionCafeListDTO
{
    public int Id { get; set; }
    public int IdUser { get; set; }
    public int IdCafe { get; set; }
    public string NomCafe { get; set; } = null!;
    public string Adresse { get; set; } = null!;
    public int? Note { get; set; }
    public string? Commentaire { get; set; }
    public DateTime DateAjout { get; set; }
    public Cafe Cafe { get; set; } = null!;

    public GestionCafeListDTO() { }

    public GestionCafeListDTO(CafeList cafeList)
    {
        Id = cafeList.Id;
        IdUser = cafeList.IdUser;
        IdCafe = cafeList.IdCafe;
        NomCafe = cafeList.Cafe.Nom;
        Adresse = cafeList.Cafe.Adresse;
        Note = cafeList.Cafe.Note;
        Commentaire = cafeList.Cafe.Commentaire;
        DateAjout = cafeList.DateAjout;
    }
}
