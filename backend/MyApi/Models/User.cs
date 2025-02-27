namespace MyCafeList.Models;

public class User
{
    public int Id { get; set; }
    public string Nom { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string MotDePasse { get; set; } = null!;
    public bool ModePrive { get; set; } = false;
    public ICollection<Cafe> Cafes { get; set; } = new List<Cafe>();

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
