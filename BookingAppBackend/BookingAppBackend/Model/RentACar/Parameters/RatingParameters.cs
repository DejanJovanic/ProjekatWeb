using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.RentACar.Parameters
{
    public class RatingParameters
    {
        [Required]
        public int EnterpriseId { get; set; }

        [Required]
        public int CarId { get; set; }

        [Required]
        public int EnterpriseRating { get; set; }

        [Required]
        public int CarRating { get; set; }

    }
}
