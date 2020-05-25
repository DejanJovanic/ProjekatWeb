using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines
{
    public class Flight
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime StartDateBack { get; set; }
        public DateTime EndDateBack { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
        public ICollection<string> StopsLocations { get; set; } = new List<string>();
        public double Price { get; set; }
        public Airplane Airplane { get; set; }
        public bool IsRoundTrip { get; set; }
        public FlightClass FlightClass { get; set; }

    }
}
