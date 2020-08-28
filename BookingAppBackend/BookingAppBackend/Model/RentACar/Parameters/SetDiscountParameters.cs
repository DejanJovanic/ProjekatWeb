using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.RentACar.Parameters
{
    public class SetDiscountParameters
    {
        [Required]
        public int EnterpriseId { get; set; }

        [Required]
        public int CarId { get; set; }

        [Required]
        public DateTime DiscountFrom { get; set; }

        [Required]
        public DateTime DiscountTo { get; set; }
        public int Discount { get; set; }

    }
}
