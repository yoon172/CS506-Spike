using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using CS506_Spike.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CS506_Spike.Controllers
{
    
    [Route("api/People")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly ABOUT_ME_DBContext _context;
        public PersonController(ABOUT_ME_DBContext context)
        {
            _context = context;
        }

        private async Task<bool> PersonExists(int id)
        {
            bool isValid = await _context.People.AnyAsync(m => m.Id == id);
            return isValid;
        }

        [HttpGet]
        public IActionResult GetPeople()
        {
            var result = new ObjectResult(_context.People)
            {
                StatusCode = (int)HttpStatusCode.OK
            };
            Request.HttpContext.Response.Headers.Add("X-Total-Count", _context.People.Count().ToString());

            return result;
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetPerson([FromHeader] int id)
        {
            var person = await _context.People.SingleOrDefaultAsync(m => m.Id == id); 
            return Ok(person);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ChangePerson([FromHeader] int id, [FromBody] People person)
        {
            if (PersonExists(id).Result)
            {
                person.Id = id;
                _context.Entry(person).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok(person);
            }
            else
            {
                return NotFound();
            }
            
        }

        [HttpPost]
        public async Task<IActionResult> CreatePerson([FromBody] People person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.Add(person);
            await _context.SaveChangesAsync();
            return CreatedAtAction("getPerson", new { id = person.Id }, person);
        }


    }
}