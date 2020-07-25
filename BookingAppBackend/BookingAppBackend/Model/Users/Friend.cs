using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Users
{
    public class Friend
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FriendUsername { get; set; }
        public string FriendName { get; set; }
        public string FriendLastName { get; set; }
    }
}
