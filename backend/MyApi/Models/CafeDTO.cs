//ce dpcument définit la classe CafeDTO
//il permet de faciliter le transfert de données back/front sans exposer directement la classe de base

namespace MyCafeList.Models;

public class CafeDTO
{
    public int Id { get; set; }
    public int IdUser { get; set; }
    public string Name { get; set; } = null!;
    public string Adress { get; set; } = null!;
    public string City { get; set; } = null!;
    public string Country { get; set; } = null!;
    public string? Description { get; set; }
    public int? Note { get; set; }
    public string? Comment { get; set; }
    public DateTime CreationDate { get; set; }
    public bool FavStatus { get; set; }

    public CafeDTO() { }

    //constructeur pour créer un DTO à partir d'un café
    public CafeDTO(Cafe cafe)
    {
        Id = cafe.Id;
        IdUser = cafe.IdUser;
        Name = cafe.Name;
        Adress = cafe.Adress;
        City = cafe.City;
        Country = cafe.Country;
        Description = cafe.Description;
        Note = cafe.Note;
        Comment = cafe.Comment;
        CreationDate = cafe.CreationDate;
        FavStatus = cafe.FavStatus;
    }
}
