namespace MyCafeList.Models;

public class UserDTO
{
    public int Id { get; set; }
    public string? Nom { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string MotDePasse { get; set; } = null!;
    public bool ModePrive { get; set; }

    public UserDTO() { }

    public UserDTO(User user)
    {
        Id = user.Id;
        Nom = user.Nom;
        Email = user.Email;
        MotDePasse = user.MotDePasse;
        ModePrive = user.ModePrive;
    }
}
