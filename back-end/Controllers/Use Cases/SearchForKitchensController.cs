using INF_01127.Database.Context;
using INF_01127.Models.Use_Cases;
using Microsoft.AspNetCore.Mvc;

namespace INF_01127.Controllers.Actors
{
    [ApiController]
    [Route("API/[controller]")]
    public class SearchForKitchensController : Controller
    {
        private readonly Context _context;
        public SearchForKitchensController(Context context)
        {
            _context = context;
        }

        [HttpPost("All")]
        public ActionResult SearchForKitchens([FromBody] int placeholer)
        {
            return Ok(_context.Kitchens.ToList());
        }

        [HttpPost("ByFilter")]
        public ActionResult SearchForKitchensByFilter([FromBody] SearchForKitchensModel searchForKitchens)
        {
            switch (searchForKitchens.Key)
            {
                case "Name":

                    return Ok(_context.Kitchens.Where(_kitchen => _kitchen.Name.Contains(searchForKitchens.Value)).ToList());

                case "Location":

                    return Ok(_context.Kitchens.Where(_kitchen => _kitchen.Location.Contains(searchForKitchens.Value)).ToList());

                default:

                    return BadRequest("Chave inválida.");
            }
        }
    }
}