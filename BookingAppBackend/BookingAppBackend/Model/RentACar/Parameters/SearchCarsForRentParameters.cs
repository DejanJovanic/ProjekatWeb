using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.RentACar.Parameters
{
    public class SearchCarsForRentParameters
    {
        [Required]
        public int EnterpriseId { get; set; }
        [Required]
        public string PickUpPlace { get; set; }

        [Required]
        public string ReturnPlace { get; set; }

        [Required]
        public DateTime DateFrom { get; set; }

        [Required]
        public DateTime DateTo { get; set; }

        [Required]
        public string CarType { get; set; }

        [Required]
        public string NumberOfpassengers { get; set; }
        public string PriceFrom { get; set; }
        public string PriceTo { get; set; }
    }
}
