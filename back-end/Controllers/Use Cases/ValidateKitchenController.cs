using INF_01127.Database.Context;
using INF_01127.Models.Actors;
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
            if (managerField.ManagerIdentification == 1)
            {
                try
                {
                    UserModel user = _context.Users.Single(user => user.Identification == managerField.UserIdentification);

                    if (user.Type) return BadRequest("O endreço de email é de um doador, não de uma cozinha.");
                    if (_context.Kitchens.Single(kitchen => kitchen.EmailAddress == user.EmailAddress).Validated) return BadRequest("A cozinha já foi validada.");

                    _context.Kitchens.Single(kitchen => kitchen.EmailAddress == user.EmailAddress).Validated = true;
                    _context.SaveChanges();
                    return Ok("A cozinha foi validada com sucesso!");
                }

                catch (InvalidOperationException)
                {
                    return NotFound("Nenhuma cozinha foi encontrada.");
                }
            }
            else
            {
                return BadRequest("Credenciais inválidas.");
            }
        }
    }
}