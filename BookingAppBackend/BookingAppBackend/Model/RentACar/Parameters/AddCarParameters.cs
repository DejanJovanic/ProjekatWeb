using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.RentACar.Parameters
{
    public class AddCarParameters
    {
        [Required]
        public int EnterpriseId { get; set; }

        [Required]
        public string Brand { get; set; }

        [Required]
        public string Model { get; set; }

        [Required]
        public string YearOfProduction { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string FuelType { get; set; }

        [Required]
        public string TransmissionType { get; set; }

        [Required]
        public string NumberOfSeats { get; set; }

        [Required]
        public string Price { get; set; }
    }
}
