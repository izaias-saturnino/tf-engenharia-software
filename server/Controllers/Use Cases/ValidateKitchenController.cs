using INF_01127.Database.Context;
using INF_01127.Models.Use_Cases;
using Microsoft.AspNetCore.Mvc;

namespace INF_01127.Controllers.Use_Cases
{
    [ApiController]
    [Route("API/[controller]")]
    public class ValidateKitchenController : Controller
    {
        private readonly Context _context;
        public ValidateKitchenController(Context context)
        {
            _context = context;
        }

        [HttpPatch]
        public ActionResult ValidateKitchen([FromBody] ManagerFieldModel managerField)
        {
            if (managerField.ManagerEmailAddress == "Manager@EmailAddress.com" && managerField.Password == "Manager@0")
            {
                try
                {
                    if (_context.Users.Single(user => user.EmailAddress == managerField.UserEmailAddress).Type) return BadRequest("The email address belongs to a donor, not a kitchen.");
                    if (_context.Kitchens.Single(kitchen => kitchen.EmailAddress == managerField.UserEmailAddress).Validated) return BadRequest("The kitchen has already been validated.");
                    _context.Kitchens.Single(kitchen => kitchen.EmailAddress == managerField.UserEmailAddress).Validated = true;
                    _context.SaveChanges();
                    return NoContent();
                }

                catch (InvalidOperationException)
                {
                    return NotFound("No kitchen was found.");
                }
            }

            return BadRequest("Invalid credentials.");
        }
    }
}