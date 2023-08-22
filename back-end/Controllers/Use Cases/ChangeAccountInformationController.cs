using INF_01127.Database.Context;
using INF_01127.Models.Use_Cases;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace INF_01127.Controllers.Use_Cases
{
    [ApiController]
    [Route("API/[controller]")]
    public class ChangeAccountInformationController : Controller
    {
        private readonly Context _context;
        public ChangeAccountInformationController(Context context)
        {
            _context = context;
        }

        [HttpPatch("Donor/PhoneNumber")]
        public ActionResult ChangeDonorPhoneNumber([FromBody] ChangeAccountInformationModel changeAccountInformation)
        {
            try
            {
                if (changeAccountInformation.Password == _context.Donors.Single(_donor => _donor.Identification == changeAccountInformation.Identification).Password)
                {
                    if (!Regex.IsMatch(changeAccountInformation.Change, @"^[0-9]*$")) return BadRequest("Invalid phone number.");
                    _context.Donors.Single(_donor => _donor.Identification == changeAccountInformation.Identification).PhoneNumber = changeAccountInformation.Change;
                    _context.SaveChanges();
                    return Ok("Succesfully changed phone number.");
                }

                return BadRequest("Incorrect password.");
            }

            catch (InvalidOperationException)
            {
                return BadRequest("Invalid data.");
            }
        }

        [HttpPatch("Donor/Name")]
        public ActionResult ChangeDonorName([FromBody] ChangeAccountInformationModel changeAccountInformation)
        {
            try
            {
                if (changeAccountInformation.Password == _context.Donors.Single(_donor => _donor.Identification == changeAccountInformation.Identification).Password)
                {
                    if (changeAccountInformation.Change.Length > 20) return BadRequest("Name cannot exceed twenty characters.");
                    _context.Donors.Single(_donor => _donor.Identification == changeAccountInformation.Identification).Name = changeAccountInformation.Change;
                    _context.SaveChanges();
                    return Ok("Succesfully changed name.");
                }

                return BadRequest("Incorrect password.");
            }

            catch (InvalidOperationException)
            {
                return BadRequest("Invalid data.");
            }
        }

        [HttpPatch("Kitchen/Name")]
        public ActionResult ChangeKitchenName([FromBody] ChangeAccountInformationModel changeAccountInformation)
        {
            try
            {
                if (changeAccountInformation.Password == _context.Kitchens.Single(_donor => _donor.Identification == changeAccountInformation.Identification).Password)
                {
                    if (changeAccountInformation.Change.Length > 20) return BadRequest("Name cannot exceed twenty characters.");
                    _context.Kitchens.Single(_kitchens => _kitchens.Identification == changeAccountInformation.Identification).Name = changeAccountInformation.Change;
                    _context.SaveChanges();
                    return Ok("Succesfully changed name.");
                }

                return BadRequest("Incorrect password.");
            }

            catch (InvalidOperationException)
            {
                return BadRequest("Invalid data.");
            }
        }

        [HttpPatch("Donor/Password")]
        public ActionResult ChangeDonorPassword([FromBody] ChangeAccountInformationModel changeAccountInformation)
        {
            try
            {
                if (changeAccountInformation.Password == _context.Donors.Single(_donor => _donor.Identification == changeAccountInformation.Identification).Password)
                {
                    if (!Regex.IsMatch(changeAccountInformation.Change, @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$")) return BadRequest("Password must have at least eight characters, one uppercase letter, one lowercase letter, one number, one special character and at most ten characters.");
                    _context.Donors.Single(_donor => _donor.Identification == changeAccountInformation.Identification).Password = changeAccountInformation.Change;
                    _context.Users.Single(_user => _user.EmailAddress == _context.Donors.Single(_donor => _donor.Identification == changeAccountInformation.Identification).EmailAddress).Password = changeAccountInformation.Change;
                    _context.SaveChanges();
                    return Ok("Succesfully changed password.");
                }

                return BadRequest("Incorrect password.");
            }

            catch (InvalidOperationException)
            {
                return BadRequest("Invalid data.");
            }
        }

        [HttpPatch("Kitchen/Password")]
        public ActionResult ChangeKitchenPassword([FromBody] ChangeAccountInformationModel changeAccountInformation)
        {
            try
            {
                if (changeAccountInformation.Password == _context.Kitchens.Single(_kitchens => _kitchens.Identification == changeAccountInformation.Identification).Password)
                {
                    if (!Regex.IsMatch(changeAccountInformation.Change, @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$")) return BadRequest("Password must have at least eight characters, one uppercase letter, one lowercase letter, one number, one special character and at most ten characters.");
                    _context.Kitchens.Single(_donor => _donor.Identification == changeAccountInformation.Identification).Password = changeAccountInformation.Change;
                    _context.Users.Single(_user => _user.EmailAddress == _context.Kitchens.Single(_kitchens => _kitchens.Identification == changeAccountInformation.Identification).EmailAddress).Password = changeAccountInformation.Change;
                    _context.SaveChanges();
                    return Ok("Succesfully changed password.");
                }

                return BadRequest("Incorrect password.");
            }

            catch (InvalidOperationException)
            {
                return BadRequest("Invalid data.");
            }
        }

        [HttpPatch("Donor/EmailAddress")]
        public ActionResult ChangeDonorEmailAddress([FromBody] ChangeAccountInformationModel changeAccountInformation)
        {
            try
            {
                if (changeAccountInformation.Password == _context.Donors.Single(_donor => _donor.Identification == changeAccountInformation.Identification).Password)
                {
                    if (!Regex.IsMatch(changeAccountInformation.Change, @"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")) return BadRequest("Email address must be valid.");
                    _context.Donors.Single(_donor => _donor.Identification == changeAccountInformation.Identification).EmailAddress = changeAccountInformation.Change;
                    _context.Users.Single(_user => _user.EmailAddress == _context.Donors.Single(_donor => _donor.Identification == changeAccountInformation.Identification).EmailAddress).EmailAddress = changeAccountInformation.Change;
                    _context.SaveChanges();
                    return Ok("Succesfully changed email address.");
                }

                return BadRequest("Incorrect password.");
            }

            catch (InvalidOperationException)
            {
                return BadRequest("Invalid data.");
            }
        }

        [HttpPatch("Kitchen/EmailAddress")]
        public ActionResult ChangeKitchenEmailAddress([FromBody] ChangeAccountInformationModel changeAccountInformation)
        {
            try
            {
                if (changeAccountInformation.Password == _context.Kitchens.Single(_kitchens => _kitchens.Identification == changeAccountInformation.Identification).Password)
                {
                    if (!Regex.IsMatch(changeAccountInformation.Change, @"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")) return BadRequest("Email address must be valid.");
                    _context.Kitchens.Single(_kitchens => _kitchens.Identification == changeAccountInformation.Identification).EmailAddress = changeAccountInformation.Change;
                    _context.Users.Single(_user => _user.EmailAddress == _context.Kitchens.Single(_kitchens => _kitchens.Identification == changeAccountInformation.Identification).EmailAddress).EmailAddress = changeAccountInformation.Change;
                    _context.SaveChanges();
                    return Ok("Succesfully changed email address.");
                }

                return BadRequest("Incorrect password.");
            }

            catch (InvalidOperationException)
            {
                return BadRequest("Invalid data.");
            }
        }
    }
}