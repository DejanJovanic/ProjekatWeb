using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.RentACar.Parameters
{
    public class EditSpecialOfferParameters
    {
        [Required]
        public int EnterpriseId { get; set; }

        [Required]
        public int SpecialOfferId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int Discount { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int NumberOfDays { get; set; }
    }
}
