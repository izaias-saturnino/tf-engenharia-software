using INF_01127.Database.Context;
using Microsoft.AspNetCore.Mvc;

namespace INF_01127.Controllers.Use_Cases
{
    [ApiController]
    [Route("API/[controller]")]
    public class AccessKitchenProfileController : Controller
    {
        private readonly Context _context;
        public AccessKitchenProfileController(Context context)
        {
            _context = context;
        }

        [HttpPost]
        public ActionResult AccessKitchenProfile([FromBody] int kitchenIdentification)
        {
            try
            {
                return Ok(new { kitchen = _context.Kitchens.Single(_kitchen => _kitchen.Identification == kitchenIdentification), events = _context.Events.Where(event_ => event_.KitchenIdentification == kitchenIdentification).ToList(), user = _context.Users.Single(_user => _user.EmailAddress == _context.Kitchens.Single(_kitchen => _kitchen.Identification == kitchenIdentification).EmailAddress).Identification });
            }

            catch (InvalidOperationException)
            {
                return BadRequest("Data inválida.");
            }
        }
    }
}