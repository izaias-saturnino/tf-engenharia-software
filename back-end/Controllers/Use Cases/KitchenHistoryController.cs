using INF_01127.Database.Context;
using Microsoft.AspNetCore.Mvc;

namespace INF_01127.Controllers.Use_Cases
{
    [ApiController]
    [Route("API/[controller]")]
    public class KitchenHistoryController : Controller
    {
        private readonly Context _context;
        public KitchenHistoryController(Context context)
        {
            _context = context;
        }

        [HttpPost]
        public ActionResult KitchenHistory([FromBody] int kitchenIdentification)
        {
            try
            {
                return Ok(new { donations = _context.Donations.Where(_donations => _donations.KitchenIdentification == kitchenIdentification && _donations.DonorIdentification != null).ToList() });
            }

            catch (InvalidOperationException)
            {
                return BadRequest("Data inválida.");
            }
        }
    }
}