using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace CS506_Spike.Models
{
    public partial class People
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public string FavoriteMovie { get; set; }
        public string Description { get; set; }
        public string FavoriteFood { get; set; }
    }
}
