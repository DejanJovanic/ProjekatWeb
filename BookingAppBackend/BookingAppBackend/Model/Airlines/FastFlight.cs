using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines
{
    public class FastFlight
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public Flight Flight { get; set; }
        public int Row { get; set; }
        public int Column { get; set; }
        public User User { get; set; }
        public double DiscountPercentage { get; set; }
        public ICollection<PaidExtras> Extras { get; set; }
        public double LoadWeight { get; set; }
    }
}
