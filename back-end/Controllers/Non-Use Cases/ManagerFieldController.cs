using INF_01127.Database.Context;
using Microsoft.AspNetCore.Mvc;

namespace INF_01127.Controllers.Others
{
    [Route("API/[controller]")]
    public class ManagerFieldController : Controller
    {
        private readonly Context _context;
        public ManagerFieldController(Context context)
        {
            _context = context;
        }

        [HttpPost("GetAllRegistrations")]
        public ActionResult GetAllRegistrations([FromBody] int placeholder)
        {
            return Ok(new { donors = _context.Donors.ToList(), kitchens = _context.Kitchens.ToList(),  });
        }

        [HttpPost("GetRegistrationsByFilter")]
        public ActionResult GetRegistrationsByFilter([FromBody] string name)
        {
            return Ok(new { donors = _context.Donors.Where(x => x.Name.Contains(name)).ToList(), kitchens = _context.Kitchens.Where(x => x.Name.Contains(name)).ToList() });
        }
    }
}