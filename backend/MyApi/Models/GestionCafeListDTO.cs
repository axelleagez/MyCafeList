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
    public List<CafeDTO> ListCafe { get; set; } = new();

    public GestionCafeListDTO() { }

    public GestionCafeListDTO(CafeList cafeList)
    {
        Id = cafeList.Id;
        IdUser = cafeList.IdUser;
        NomCafe = cafeList.Cafe.Nom;
        Adresse = cafeList.Cafe.Adresse;
        Note = cafeList.Cafe.Note;
        Commentaire = cafeList.Cafe.Commentaire;
        ListCafe = cafeList.ListCafe.Select(c => new CafeDTO(c)).ToList();
    }
}
