using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyCafeList.Models;

namespace MyCafeList.Controllers
{
    [ApiController]
    [Route("api/favorites")]
    public class FavoritesController : ControllerBase
    {
        private readonly DataContext _context;

        public FavoritesController(DataContext context)
        {
            _context = context;
        }

        // POST: api/favorites
        [HttpPost]
        public async Task<ActionResult<Favorites>> AddToFavorites(FavoritesDTO favoritesDTO)
        {
            var favorite = new Favorites(favoritesDTO);
            _context.Favorites.Add(favorite);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetUserFavorites),
                new { idUser = favorite.IdUser },
                new FavoritesDTO(favorite)
            );
        }

        // GET: api/favorites/{idUser}
        [HttpGet("{idUser}")]
        public async Task<ActionResult<IEnumerable<FavoritesDTO>>> GetUserFavorites(int idUser)
        {
            var favorites = await _context
                .Favorites.Where(f => f.IdUser == idUser)
                .Include(f => f.Cafe)
                .ToListAsync();

            if (favorites == null || favorites.Count == 0)
            {
                return NotFound("Aucun favori trouvé.");
            }

            return favorites.Select(f => new FavoritesDTO(f)).ToList();
        }

        // PUT: api/favorites/{idUser}/{idCafe}
        [HttpPut("{idUser}/{idCafe}")]
        public async Task<IActionResult> UpdateFavorite(
            int idUser,
            int idCafe,
            FavoritesDTO favoritesDTO
        )
        {
            if (idUser != favoritesDTO.IdUser || idCafe != favoritesDTO.IdCafe)
            {
                return BadRequest("Les IDs fournis ne correspondent pas.");
            }

            var favorite = await _context.Favorites.SingleOrDefaultAsync(f =>
                f.IdUser == idUser && f.IdCafe == idCafe
            );

            if (favorite == null)
            {
                return NotFound("Ce café n'est pas dans les favoris.");
            }

            favorite.Cafe.Note = favoritesDTO.Cafe.Note;
            favorite.Cafe.Commentaire = favoritesDTO.Cafe.Commentaire;

            _context.Entry(favorite.Cafe).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/favorites/{idUser}/{idCafe}
        [HttpDelete("{idUser}/{idCafe}")]
        public async Task<IActionResult> RemoveFromFavorites(int idUser, int idCafe)
        {
            var favorite = await _context.Favorites.SingleOrDefaultAsync(f =>
                f.IdUser == idUser && f.IdCafe == idCafe
            );

            if (favorite == null)
            {
                return NotFound("Ce café n'est pas dans les favoris.");
            }

            _context.Favorites.Remove(favorite);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
