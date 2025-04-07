namespace MyCafeList.Models;

public class UserDTO
{
    public int Id { get; set; }
    public string? Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public bool PrivateMode { get; set; }

    public UserDTO() { }

    public UserDTO(User user)
    {
        Id = user.Id;
        Name = user.Name;
        Email = user.Email;
        Password = user.Password;
        PrivateMode = user.PrivateMode;
    }
}
