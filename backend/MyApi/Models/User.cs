//ce document définit la classe User qui représente un utilisateur de l'app
//il fournit un constructeur pour initialiser un utilisateur à partir d'un DTO
namespace MyCafeList.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public bool PrivateMode { get; set; } = false;
    public ICollection<Cafe> Cafes { get; set; } = new List<Cafe>(); //on ajoute ici le fait qu'un utilisateur peut avoir une liste de cafés

    public User() { }

    //constructeur pour initialiser un user à partir d'un DTO
    public User(UserDTO userDTO)
    {
        Id = userDTO.Id;
        Name = userDTO.Name;
        Email = userDTO.Email;
        Password = userDTO.Password;
        PrivateMode = userDTO.PrivateMode;
    }
}
