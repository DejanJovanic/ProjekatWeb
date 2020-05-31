using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines.Parameters
{
    public class AirlineParameter
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public AirlineAddress Address { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public List<string> Destinations { get; set; }

    }
}
