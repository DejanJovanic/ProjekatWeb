using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.RentACar.Parameters
{
    public class ReservationParameters
    {
        [Required]
        public int CarId { get; set; }

        [Required]
        public int EnterpriseId { get; set; }


        [Required]
        public DateTime DateFrom { get; set; }

        [Required]
        public DateTime DateTo { get; set; }

       
    }
}
