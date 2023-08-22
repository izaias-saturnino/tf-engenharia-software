using INF_01127.Database.Context;
using INF_01127.Models.Actors;
using Microsoft.AspNetCore.Mvc;

namespace INF_01127.Controllers.Use_Cases
{
    [ApiController]
    [Route("API/[controller]")]
    public class RequestDonationController : Controller
    {
        private readonly Context _context;
        public RequestDonationController(Context context)
        {
            _context = context;
        }

        [HttpPost]
        public ActionResult RequestDonation([FromBody] DonationModel donationModel)
        {
            try
            {
                _context.Kitchens.Single(_kitchen => _kitchen.Identification == donationModel.KitchenIdentification);
            }

            catch (InvalidOperationException)
            {
                return BadRequest("Data inválida.");
            }

            finally
            {
                _context.Donations.Add(new DonationModel
                {
                    KitchenIdentification = donationModel.KitchenIdentification,
                    Name = donationModel.Name,
                    Quantity = donationModel.Quantity,
                    Unit = donationModel.Unit,
                    Price = donationModel.Price
                });

                _context.SaveChanges();
            }

            return Ok("Pedido de doação realizado com sucesso!");
        }
    }
}