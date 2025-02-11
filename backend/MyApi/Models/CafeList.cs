namespace MyCafeList.Models;

public class CafeList
{
    public int Id { get; set; }
    public int IdUser { get; set; }  // clé étrangère
    public int IdCafe { get; set; }  // clé étrangère
    public DateTime DateAjout { get; set; } = DateTime.Now;

    public User User { get; set; } = null!;
    public Cafe Cafe { get; set; } = null!;

    public CafeList() { }

    public CafeList(GestionCafeListDTO GestionCafeListDTO)
    {
        Id = GestionCafeListDTO.Id;
        IdUser = GestionCafeListDTO.IdUser;
        IdCafe = GestionCafeListDTO.IdCafe;
        DateAjout = GestionCafeListDTO.DateAjout;
    }
}
