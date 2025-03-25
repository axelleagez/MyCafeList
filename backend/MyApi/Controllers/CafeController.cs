using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyCafeList.Models;

//controller pour les cafés : post, get avec id, put avec id et delete avec id
namespace MyCafeList.Controllers
{
    [ApiController]
    [Route("api/cafes")]
    public class CafeController : ControllerBase
    {
        private readonly DataContext _context;

        public CafeController(DataContext context)
        {
            _context = context;
        }

        // GET: api/cafes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CafeDTO>>> GetCafes()
        {
            var cafes = await _context.Cafes.Select(c => new CafeDTO(c)).ToListAsync();

            return Ok(cafes);
        }

        // GET: api/cafes/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CafeDTO>> GetCafe(int id)
        {
            var cafe = await _context.Cafes.FindAsync(id);

            if (cafe == null)
            {
                return NotFound("Café non trouvé.");
            }

            return new CafeDTO(cafe);
        }

        // GET: api/cafes/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<CafeDTO>>> GetUserCafes(int userId)
        {
            var cafes = await _context
                .Cafes.Where(c => c.IdUser == userId)
                .Select(c => new CafeDTO(c))
                .ToListAsync();

            return Ok(cafes);
        }

        // POST: api/cafes
        [HttpPost]
        public async Task<ActionResult<Cafe>> AddCafe(CafeDTO cafeDTO) //ajout du frombody pour qu'il comprenne que ça vient du corps de la requete
        {
            var cafe = new Cafe(cafeDTO);
            _context.Cafes.Add(cafe);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCafe), new { id = cafe.Id }, new CafeDTO(cafe));
        }

        // PUT: api/cafes/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCafe(int id, CafeDTO cafeDTO)
        {
            if (id != cafeDTO.Id)
            {
                return BadRequest("L'ID du café ne correspond pas.");
            }

            var cafe = await _context.Cafes.FindAsync(id);
            if (cafe == null)
            {
                return NotFound();
            }

            cafe.Nom = cafeDTO.Nom;
            cafe.Adresse = cafeDTO.Adresse;
            cafe.Ville = cafeDTO.Ville;
            cafe.Pays = cafeDTO.Pays;
            cafe.Description = cafeDTO.Description;
            cafe.Note = cafeDTO.Note;
            cafe.Commentaire = cafeDTO.Commentaire;

            _context.Entry(cafe).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/cafes/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCafe(int id)
        {
            var cafe = await _context.Cafes.FindAsync(id);
            if (cafe == null)
            {
                return NotFound();
            }

            _context.Cafes.Remove(cafe);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/cafes/favorite/{id}
        [HttpPut("favorite/{id}")]
        public async Task<IActionResult> ToggleFavorite(int id)
        {
            var cafe = await _context.Cafes.FindAsync(id);
            if (cafe == null)
                return NotFound("Café non trouvé.");

            cafe.StatutFav = !cafe.StatutFav;

            _context.Entry(cafe).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new CafeDTO(cafe));
        }
    }
}
