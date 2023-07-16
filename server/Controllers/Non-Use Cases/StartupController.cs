using INF_01127.Database.Context;
using INF_01127.Models.Actors;
using Microsoft.AspNetCore.Mvc;

namespace INF_01127.Controllers.Others
{
    [ApiController]
    [Route("API/[controller]")]
    public class StartupController : Controller
    {
        private readonly Context _context;
        public StartupController(Context context)
        {
            _context = context;
        }
        [HttpGet]
        public ActionResult Startup()
        {
            if (!_context.Managers.Any())
            {
                for (int index = 0; index <= 9; index++)
                {
                    _context.Users.Add((
                        new UserModel
                        {
                            Password = $"Password@{index}",
                            EmailAddress = $"MockDonor{index}@EmailAddress.com"
                        }
                    ));

                    _context.Users.Add((
                        new UserModel
                        {
                            Password = $"Password@{index}",
                            EmailAddress = $"MockKitchen{index}@EmailAddress.com",
                            Type = false
                        }
                    ));

                    _context.Donors.Add((
                        new DonorModel
                        {
                            Name = $"MockDonorName{index}",
                            Password = $"Password@{index}",
                            EmailAddress = $"MockDonor{index}@EmailAddress.com"
                        }
                    ));

                    _context.Kitchens.Add((
                        new KitchenModel
                        {
                            Name = $"MockKitchenName{index}",
                            Password = $"Password@{index}",
                            EmailAddress = $"MockKitchen{index}@EmailAddress.com",
                            Location = $"MockKitchenLocation{index}"
                        }
                    ));
                }

                _context.Managers.Add(
                    new ManagerModel
                    {
                        Name = "Manager",
                        Password = "Master@0",
                        EmailAddress = "Master@EmailAddress.com"
                    }
                );
            }

            _context.SaveChanges();
            return NoContent();
        }
    }
}