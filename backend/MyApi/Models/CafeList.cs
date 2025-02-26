namespace MyCafeList.Models;

public class CafeList
{
    public int Id { get; set; }
    public int IdUser { get; set; } // clé étrangère
    public List<Cafe> ListCafe { get; set; } = new();

    public User User { get; set; } = null!;
    public Cafe Cafe { get; set; } = null!;

    public CafeList() { }

    public CafeList(GestionCafeListDTO GestionCafeListDTO)
    {
        Id = GestionCafeListDTO.Id;
        IdUser = GestionCafeListDTO.IdUser;
        ListCafe = GestionCafeListDTO.ListCafe.Select(c => new Cafe(c)).ToList();
    }
}
