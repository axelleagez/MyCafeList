using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyCafeList.Models;

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

        // POST: api/cafes
        [HttpPost]
        public async Task<ActionResult<Cafe>> AddCafe(CafeDTO cafeDTO)
        {
            var cafe = new Cafe(cafeDTO);
            _context.Cafes.Add(cafe);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCafe), new { id = cafe.Id }, new CafeDTO(cafe));
        }

        // GET: api/cafes/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CafeDTO>> GetCafe(int id)
        {
            var cafe = await _context.Cafes.FindAsync(id);

            if (cafe == null)
            {
                return NotFound();
            }

            return new CafeDTO(cafe);
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
    }
}
