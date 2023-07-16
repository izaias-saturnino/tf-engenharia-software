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
            if (managerField.ManagerEmailAddress == "Manager@EmailAddress.com" && managerField.Password == "Manager@0")
            {
                try
                {
                    UserModel user = _context.Users.Single(user => user.EmailAddress == managerField.UserEmailAddress);
                    _context.Users.Remove(user);
                    bool type = user.Type;

                    if (type)
                    {
                        DonorModel donor = _context.Donors.Single(donor => donor.EmailAddress == managerField.UserEmailAddress);
                        _context.Donors.Remove(donor);
                    }

                    else
                    {
                        KitchenModel kitchen = _context.Kitchens.Single(kitchen => kitchen.EmailAddress == managerField.UserEmailAddress);
                        _context.Kitchens.Remove(kitchen);
                    }

                    _context.SaveChanges();
                    return NoContent();
                }

                catch (InvalidOperationException)
                {
                    return NotFound("No registration was found.");
                }
            }

            return BadRequest("Invalid credentials.");
        }
    }
}