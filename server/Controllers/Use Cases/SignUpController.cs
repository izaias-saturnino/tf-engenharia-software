using INF_01127.Database.Context;
using INF_01127.Models.Actors;
using Microsoft.AspNetCore.Mvc;

namespace INF_01127.Controllers.Requests
{
    [ApiController]
    [Route("API/[controller]")]
    public class SignUpController : Controller
    {
        private readonly Context _context;
        public SignUpController(Context context)
        {
            _context = context;
        }

        [HttpPost("Donor")]
        public ActionResult SingUpDonor([FromBody] DonorModel donor)
        {
            if (_context.Users.Any(_user => _user.EmailAddress == donor.EmailAddress) || donor.EmailAddress == "Manager@EmailAddress.com") return BadRequest("Endereço de email já existe.");
            _context.Add(donor);
            _context.Add(new UserModel { Password = donor.Password, EmailAddress = donor.EmailAddress });
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPost("Kitchen")]
        public ActionResult SingUpKitchen([FromBody] KitchenModel kitchen)
        {
            if (_context.Users.Any(_user => _user.EmailAddress == kitchen.EmailAddress || kitchen.EmailAddress == "Manager@EmailAddress.com")) return BadRequest("Endereço de email já existe.");
            _context.Add(kitchen);
            _context.Add(new UserModel { Password = kitchen.Password, EmailAddress = kitchen.EmailAddress, Type = false });
            _context.SaveChanges();
            return NoContent();
        }
    }
}