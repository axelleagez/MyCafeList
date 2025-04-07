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

    //public string? ImageUrl { get; set; }
    public int? Note { get; set; }
    public string? Comment { get; set; }
    public DateTime CreationDate { get; set; }
    public bool FavStatus { get; set; }

    public CafeDTO() { }

    public CafeDTO(Cafe cafe)
    {
        Id = cafe.Id;
        IdUser = cafe.IdUser;
        Name = cafe.Name;
        Adress = cafe.Adress;
        City = cafe.City;
        Country = cafe.Country;
        Description = cafe.Description;
        //ImageUrl = cafe.ImageUrl;
        Note = cafe.Note;
        Comment = cafe.Comment;
        CreationDate = cafe.CreationDate;
        FavStatus = cafe.FavStatus;
    }
}
