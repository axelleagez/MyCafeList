using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyCafeList.Models;

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
            var user = await _context.Users.SingleOrDefaultAsync(u =>
                u.Email == loginDTO.Email && u.MotDePasse == loginDTO.MotDePasse
            );

            if (user == null)
            {
                return Unauthorized("Email ou mot de passe incorrect.");
            }

            return new UserDTO(user);
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
