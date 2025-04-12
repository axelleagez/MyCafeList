//ce document définit la classe Cafe qui représente un café dans l'app
//il fournit un constructeur pour initialiser un objet à partir d'un DTO
namespace MyCafeList.Models;

public class Cafe
{
    public int Id { get; set; } // clé primaire
    public int IdUser { get; set; } // clé étrangère
    public string Name { get; set; } = null!;
    public string Adress { get; set; } = null!;
    public string City { get; set; } = null!;
    public string Country { get; set; } = null!;
    public string? Description { get; set; }
    public int? Note { get; set; }
    public string? Comment { get; set; }
    public DateTime CreationDate { get; set; } = DateTime.Now;
    public bool FavStatus { get; set; }

    //on fait référence à la classe user qui est liée
    public User User { get; set; } = null!;

    public Cafe() { }

    //constructeur pour initialiser un café à partir d'un DTO
    public Cafe(CafeDTO cafeDTO)
    {
        Id = cafeDTO.Id;
        IdUser = cafeDTO.IdUser;
        Name = cafeDTO.Name;
        Adress = cafeDTO.Adress;
        City = cafeDTO.City;
        Country = cafeDTO.Country;
        Description = cafeDTO.Description;
        Note = cafeDTO.Note;
        Comment = cafeDTO.Comment;
        CreationDate = cafeDTO.CreationDate;
        FavStatus = cafeDTO.FavStatus;
    }
}
