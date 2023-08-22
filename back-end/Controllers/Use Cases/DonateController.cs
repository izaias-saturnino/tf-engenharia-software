using INF_01127.Database.Context;
using INF_01127.Models.Actors;
using Microsoft.AspNetCore.Mvc;

namespace INF_01127.Controllers.Use_Cases
{
    [ApiController]
    [Route("API/[controller]")]
    public class DonateController : Controller
    {
        private readonly Context _context;
        public DonateController(Context context)
        {
            _context = context;
        }

        [HttpPost("DisplayDonationRequest")]
        public ActionResult DisplayDonationRequest([FromBody] int donationIdentification)
        {
            return Ok(_context.Donations.Single(_donation => _donation.DonationIdentification == donationIdentification));
        }

        [HttpPost("DisplayDonationRequests")]
        public ActionResult DisplayDonationRequests([FromBody] int kitchenIdentification)
        {
            return Ok(_context.Donations.Where(_donation => _donation.DonorIdentification == null && _donation.KitchenIdentification == kitchenIdentification).ToList());
        }

        [HttpPatch]
        public ActionResult Donate([FromBody] DonateModel donate)
        {
            try
            {
                if (_context.Donations.Single(_donation => _donation.DonationIdentification == donate.DonationIdentification).DonorIdentification != null)
                {
                    return BadRequest("Doação já foi feita.");
                }

                _context.Donations.Single(_donation => _donation.DonationIdentification == donate.DonationIdentification).DonorIdentification = donate.DonorIdentification;
                _context.SaveChanges();
                return Ok("Doação feita com sucesso!");
            }

            catch (InvalidOperationException)
            {
                return BadRequest("Data inválida.");
            }
        }
    }
}