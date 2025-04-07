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

    //public string? ImageUrl { get; set; }
    public int? Note { get; set; }
    public string? Comment { get; set; }
    public DateTime CreationDate { get; set; } = DateTime.Now;
    public bool FavStatus { get; set; }

    public User User { get; set; } = null!;

    public Cafe() { }

    public Cafe(CafeDTO cafeDTO)
    {
        Id = cafeDTO.Id;
        IdUser = cafeDTO.IdUser;
        Name = cafeDTO.Name;
        Adress = cafeDTO.Adress;
        City = cafeDTO.City;
        Country = cafeDTO.Country;
        Description = cafeDTO.Description;
        //ImageUrl = cafeDTO.ImageUrl;
        Note = cafeDTO.Note;
        Comment = cafeDTO.Comment;
        CreationDate = cafeDTO.CreationDate;
        FavStatus = cafeDTO.FavStatus;
    }
}
