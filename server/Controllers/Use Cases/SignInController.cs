using INF_01127.Database.Context;
using INF_01127.Models.Requests;
using Microsoft.AspNetCore.Mvc;

namespace INF_01127.Controllers.Requests
{
    [ApiController]
    [Route("API/[controller]")]
    public class SignInController : Controller
    {
        private readonly Context _context;
        public SignInController(Context context)
        {
            _context = context;
        }

        [HttpPost]
        public ActionResult SingIn([FromBody] SignInModel signIn)
        {
            try
            {
                if (signIn.EmailAddress == "Master@EmailAddress.com" && signIn.Password == "Master@0") return Ok(new { actor = _context.Managers.First(), actor_type = 0 });
                bool type = _context.Users.Single(user => user.EmailAddress == signIn.EmailAddress && user.Password == signIn.Password).Type;
                if (type) return Ok(new { actor = _context.Donors.Single(donor => donor.EmailAddress == signIn.EmailAddress && donor.Password == signIn.Password), actor_type = 1 });
                return Ok(new { actor = _context.Kitchens.Single(kitchens => kitchens.EmailAddress == signIn.EmailAddress && kitchens.Password == signIn.Password), actor_type = 2});
            }
            
            catch (InvalidOperationException)
            {
                return BadRequest("Credenciais inválidas.");
            }
        }
    }
}