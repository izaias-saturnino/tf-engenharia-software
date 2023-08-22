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
                for (int index = 1; index <= 2; index++)
                {
                    _context.Users.Add((
                        new UserModel
                        {
                            Password = $"Password@{index}",
                            EmailAddress = $"Donor{index}@EmailAddress.com"
                        }
                    ));

                    _context.Users.Add((
                        new UserModel
                        {
                            Password = $"Password@{index}",
                            EmailAddress = $"Kitchen{index}@EmailAddress.com",
                            Type = false
                        }
                    ));

                    _context.Donors.Add((
                        new DonorModel
                        {
                            Name = $"Donor{index}",
                            Password = $"Password@{index}",
                            EmailAddress = $"Donor{index}@EmailAddress.com",
                            ITR = index == 1 ? "12345678910" : "10987654321",
                            PhoneNumber = index == 1 ? "5551987654321" : "5551123456789"
                        }
                    ));

                    _context.Kitchens.Add((
                        new KitchenModel
                        {
                            Name = $"Kitchen{index}",
                            Password = $"Password@{index}",
                            EmailAddress = $"Kitchen{index}@EmailAddress.com",
                            Location = $"KitchenLocation{index}",
                            Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed. Mattis pellentesque id nibh tortor id aliquet lectus. At tempor commodo ullamcorper a lacus vestibulum sed arcu. Nunc sed augue lacus viverra. In mollis nunc sed id semper risus in. Sagittis eu volutpat odio facilisis. Iaculis eu non diam phasellus vestibulum lorem sed risus. Gravida cum sociis natoque penatibus et magnis. Fames ac turpis egestas maecenas pharetra. Feugiat vivamus at augue eget arcu dictum varius. Eget nunc scelerisque viverra mauris in aliquam sem fringilla ut. Est lorem ipsum dolor sit amet. Tristique senectus et netus et. Aliquam ut porttitor leo a diam sollicitudin tempor. Facilisis sed odio morbi quis commodo odio aenean sed adipiscing. Proin nibh nisl condimentum id venenatis a."
                        }
                    ));

                    _context.Donations.Add((
                        new DonationModel
                        {
                            DonorIdentification = index == 1 ? index : null,
                            KitchenIdentification = index,
                            Name = "Arroz",
                            Quantity = 10,
                            Unit = "Quilos",
                            Price = 100
                        }
                    ));

                    _context.Donations.Add((
                        new DonationModel
                        {
                            DonorIdentification = index == 1 ? index : null,
                            KitchenIdentification = index,
                            Name = "Feijão",
                            Quantity = 10,
                            Unit = "Quilos",
                            Price = 100
                        }
                    ));
                }
            }

            _context.Events.Add((
                new EventModel
                {
                    KitchenIdentification = 1,
                    Location = "Campus do Vale",
                    Public = 1127,
                    Date = DateTime.Now
                }
            ));

            _context.Events.Add((
                new EventModel
                {
                    KitchenIdentification = 1,
                    Location = "Campus Litoral Norte",
                    Public = 1128,
                    Date = DateTime.Now
                }
            ));

            _context.Events.Add((
                new EventModel
                {
                    KitchenIdentification = 2,
                    Location = "Campus Saúde",
                    Public = 1129,
                    Date = DateTime.Now
                }
            ));

            _context.Events.Add((
                new EventModel
                {
                    KitchenIdentification = 2,
                    Location = "Campus do Centro",
                    Public = 1130,
                    Date = DateTime.Now
                }
            ));

            _context.Managers.Add(
                    new ManagerModel
                    {
                        Name = "Manager",
                        Password = "Master@0",
                        EmailAddress = "Master@EmailAddress.com"
                    }
                );

            _context.SaveChanges();
            return NoContent();
        }
    }
}