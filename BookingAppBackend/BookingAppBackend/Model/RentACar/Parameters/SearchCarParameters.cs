using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.RentACar.Parameters
{
    public class SearchCarParameters
    {
        [Required]
        public int EnterpriseId { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string YearOfProductionFrom { get; set; }
        public string YearOfProductionTo { get; set; }
        public string Type { get; set; }
        public string FuelType { get; set; }
        public string TransmissionType { get; set; }
        public string NumberOfSeats { get; set; }
        public string PriceFrom { get; set; }
        public string PriceTo { get; set; }
    }
}
