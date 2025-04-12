//ce dpcument définit la classe UserDTO
//il permet de faciliter le transfert de données back/front sans exposer directement la classe de base

namespace MyCafeList.Models;

public class UserDTO
{
    public int Id { get; set; }
    public string? Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public bool PrivateMode { get; set; }

    public UserDTO() { }

    //constructeur pour créer un DTO à partir d'un user
    public UserDTO(User user)
    {
        Id = user.Id;
        Name = user.Name;
        Email = user.Email;
        Password = user.Password;
        PrivateMode = user.PrivateMode;
    }
}
