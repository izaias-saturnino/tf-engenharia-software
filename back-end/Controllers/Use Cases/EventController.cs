using INF_01127.Database.Context;
using INF_01127.Models.Actors;
using Microsoft.AspNetCore.Mvc;

namespace INF_01127.Controllers.Use_Cases
{
    [ApiController]
    [Route("API/[controller]")]
    public class EventController : Controller
    {
        private readonly Context _context;
        public EventController(Context context)
        {
            _context = context;
        }

        [HttpPost("GetAllEvents")]
        public ActionResult GetAllEvents([FromBody] int placeholder)
        {
            return Ok(_context.Events.ToList());
        }

        [HttpPost]
        public ActionResult PostEvent([FromBody] EventModel _event)
        {
            try
            {
                _context.Events.Add(_event);
                _context.SaveChanges();
                return Ok("Evento cadastrado com sucesso!");
            }

            catch (InvalidOperationException)
            {
                return BadRequest("Data inválida.");
            }
        }
    }
}