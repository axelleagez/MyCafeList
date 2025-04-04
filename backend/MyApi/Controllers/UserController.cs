using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyCafeList.Models;

//controller pour les cafés : post pour s'enregistrer, post pour se connecter, get avec id, put avec id et delete avec id
namespace MyCafeList.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
        {
            var users = await _context.Users.Select(u => new UserDTO(u)).ToListAsync();

            return Ok(users);
        }

        // POST: api/users/register
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDTO userDTO)
        {
            if (await _context.Users.AnyAsync(u => u.Email == userDTO.Email))
            {
                return BadRequest("Cet email est déjà utilisé.");
            }

            var user = new User(userDTO);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, new UserDTO(user));
        }

        // POST: api/users/login
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login([FromBody] UserDTO loginDTO)
        {
            if (string.IsNullOrEmpty(loginDTO.Email) || string.IsNullOrEmpty(loginDTO.MotDePasse))
            {
                return BadRequest("L'email et le mot de passe sont requis.");
            }
            var user = await _context.Users.SingleOrDefaultAsync(u =>
                u.Email == loginDTO.Email && u.MotDePasse == loginDTO.MotDePasse
            );

            if (user == null)
            {
                return Unauthorized("Email ou mot de passe incorrect.");
            }

            return new UserDTO
            {
                Id = user.Id,
                Nom = user.Nom, // Le nom de l'utilisateur est récupéré depuis la base
                Email = user.Email,
                MotDePasse = user.MotDePasse,
                ModePrive = user.ModePrive, // Mode privé récupéré également
            };
        }

        // GET: api/users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return new UserDTO(user);
        }

        // PUT: api/users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserDTO userDTO)
        {
            if (id != userDTO.Id)
            {
                return BadRequest("L'ID de l'utilisateur ne correspond pas.");
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("Utilisateur introuvable.");
            }

            user.Nom = userDTO.Nom;
            user.Email = userDTO.Email;
            user.MotDePasse = userDTO.MotDePasse;
            user.ModePrive = userDTO.ModePrive;

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("Utilisateur introuvable.");
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
