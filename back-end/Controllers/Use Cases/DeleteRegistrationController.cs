using INF_01127.Database.Context;
using INF_01127.Models.Actors;
using INF_01127.Models.Use_Cases;
using Microsoft.AspNetCore.Mvc;

namespace INF_01127.Controllers.Use_Cases
{
    [ApiController]
    [Route("API/[controller]")]
    public class DeleteRegistrationController : Controller
    {
        private readonly Context _context;
        public DeleteRegistrationController(Context context)
        {
            _context = context;
        }

        [HttpDelete]
        public ActionResult DeleteRegistration([FromBody] ManagerFieldModel managerField)
        {
            if (managerField.ManagerIdentification == 1)
            {
                try
                {
                    if (managerField.UserType)
                    {
                        DonorModel donor = _context.Donors.Single(donor => donor.Identification == managerField.UserIdentification);
                        _context.Donors.Remove(donor);
                        UserModel user = _context.Users.Single(user => user.EmailAddress == donor.EmailAddress);
                        _context.Users.Remove(user);
                    }

                    else
                    {
                        KitchenModel kitchen = _context.Kitchens.Single(kitchen => kitchen.Identification == managerField.UserIdentification);
                        _context.Kitchens.Remove(kitchen);
                        UserModel user = _context.Users.Single(user => user.EmailAddress == kitchen.EmailAddress);
                        _context.Users.Remove(user);
                    }

                    _context.SaveChanges();
                    return Ok("Conta deletada com sucesso!");
                }

                catch (InvalidOperationException)
                {
                    return NotFound("Nenhuma conta foi encontrada.");
                }
            }

            return BadRequest("Credenciais inválidas.");
        }
    }
}