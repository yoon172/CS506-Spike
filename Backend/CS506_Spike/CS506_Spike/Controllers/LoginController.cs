using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CS506_Spike.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CS506_Spike.Controllers
{
    [Route("api/Login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ABOUT_ME_DBContext _context;
        public LoginController(ABOUT_ME_DBContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] People person)
        {
            var username = person.UserName;
            var password = person.PassWord;
            if (await _context.People.AnyAsync(p => p.UserName == username && p.PassWord == password))
            {
                var foundPerson = _context.People.Where(p => p.UserName == username);
                return Ok(foundPerson);
            }
            else 
            {
                return NotFound();
            }
        }
    }
}