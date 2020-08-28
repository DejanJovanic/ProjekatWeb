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
        public Car SelectedCar { get; set; }

        [Required]
        public Enterprise SelectedEnterprise { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public int NumberOfDays { get; set; }

        [Required]
        public DateTime DateFrom { get; set; }

        [Required]
        public DateTime DateTo { get; set; }

        [Required]
        public int Price { get; set; }

        [Required]
        public SpecialOffer RealizedPackage;

        [Required]
        public bool IsRated { get; set; }
    }
}
