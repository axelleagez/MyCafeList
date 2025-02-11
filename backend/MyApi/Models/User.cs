namespace MyCafeList.Models;

public class User
{
    public int Id { get; set; }
    public string Nom { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string MotDePasse { get; set; } = null!;
    public bool ModePrive { get; set; } = false;
    public List<Cafe> CafesAjoutes { get; set; } = new();
    public List<Favorites> Favorites { get; set; } = new();

    public User() { }

    public User(UserDTO userDTO)
    {
        Id = userDTO.Id;
        Nom = userDTO.Nom;
        Email = userDTO.Email;
        MotDePasse = userDTO.MotDePasse;
        ModePrive = userDTO.ModePrive;
    }
}
