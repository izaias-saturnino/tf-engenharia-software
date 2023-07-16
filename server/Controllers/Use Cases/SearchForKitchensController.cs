using INF_01127.Database.Context;
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

        [HttpGet("All")]
        public ActionResult SearchForKitchens()
        {
            return (_context.Kitchens.Any()) ? Ok(_context.Kitchens.ToList()) : NoContent();
        }

        [HttpGet("ByFilter/{key}/{value}")]
        public ActionResult SearchForKitchensByFilter([FromRoute] string key, [FromRoute] string value)
        {
            switch (key)
            {
                case "Name":

                    return (_context.Kitchens.Where(_kitchen => _kitchen.Name.Contains(value)).ToList().Any()) ? Ok(_context.Kitchens.Where(_kitchen => _kitchen.Name.Contains(value)).ToList()) : NoContent();

                case "Location":

                    return (_context.Kitchens.Where(_kitchen => _kitchen.Location.Contains(value)).ToList().Any()) ? Ok(_context.Kitchens.Where(_kitchen => _kitchen.Name.Contains(value)).ToList()) : NoContent();

                default:

                    return BadRequest("Invalid key.");
            }
        }
    }
}