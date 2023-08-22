using INF_01127.Database.Context;
using Microsoft.AspNetCore.Mvc;
using System.Web.Http.Cors;

namespace INF_01127.Controllers.Use_Cases
{
    [ApiController]
    [Route("API/[controller]")]
    public class DonationHistoryController : Controller
    {
        private readonly Context _context;
        public DonationHistoryController(Context context)
        {
            _context = context;
        }

        [HttpPost]
        public ActionResult GetDonationHistory([FromBody] int donorIdentification)
        {
            try
            {
                _context.Donors.Single(_donor => _donor.Identification == donorIdentification);
            }

            catch (InvalidOperationException)
            {
                return BadRequest("Data inválida.");
            }

            return _context.Donations.Where(_donations => _donations.DonorIdentification == donorIdentification).ToList().Any() ? Ok(_context.Donations.Where(_donations => _donations.DonorIdentification == donorIdentification).ToList()) : NoContent();
        }
    }
}