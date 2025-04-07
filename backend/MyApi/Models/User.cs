namespace MyCafeList.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public bool PrivateMode { get; set; } = false;
    public ICollection<Cafe> Cafes { get; set; } = new List<Cafe>();

    public User() { }

    public User(UserDTO userDTO)
    {
        Id = userDTO.Id;
        Name = userDTO.Name;
        Email = userDTO.Email;
        Password = userDTO.Password;
        PrivateMode = userDTO.PrivateMode;
    }
}
