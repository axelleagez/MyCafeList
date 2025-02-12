using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyCafeList.Models;

namespace MyCafeList.Controllers
{
    [ApiController]
    [Route("api/cafelist")]
    public class CafeListController : ControllerBase
    {
        private readonly DataContext _context;

        public CafeListController(DataContext context)
        {
            _context = context;
        }

        // POST: api/cafelist
        [HttpPost]
        public async Task<ActionResult<CafeList>> AddCafeToList(GestionCafeListDTO gestionDTO)
        {
            var cafeList = new CafeList(gestionDTO);
            _context.CafeLists.Add(cafeList);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetUserCafeList),
                new { idUser = cafeList.IdUser },
                new GestionCafeListDTO(cafeList)
            );
        }

        // GET: api/cafelist/{idUser}
        [HttpGet("{idUser}")]
        public async Task<ActionResult<IEnumerable<GestionCafeListDTO>>> GetUserCafeList(int idUser)
        {
            var cafes = await _context
                .CafeLists.Where(cl => cl.IdUser == idUser)
                .Include(cl => cl.Cafe)
                .ToListAsync();

            if (cafes == null || cafes.Count == 0)
            {
                return NotFound("Aucun café trouvé dans la liste.");
            }

            return cafes.Select(cl => new GestionCafeListDTO(cl)).ToList();
        }

        // DELETE: api/cafelist/{idUser}/{idCafe}
        [HttpDelete("{idUser}/{idCafe}")]
        public async Task<IActionResult> RemoveCafeFromList(int idUser, int idCafe)
        {
            var cafeList = await _context.CafeLists.SingleOrDefaultAsync(cl =>
                cl.IdUser == idUser && cl.IdCafe == idCafe
            );

            if (cafeList == null)
            {
                return NotFound("Ce café n'est pas dans la liste.");
            }

            _context.CafeLists.Remove(cafeList);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
