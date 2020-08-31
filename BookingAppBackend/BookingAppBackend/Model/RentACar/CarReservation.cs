using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.RentACar
{
    public class CarReservation
    {

       [Required]
        public Car SelectedCar { get; set; }

        [Required]
        public Enterprise SelectedEnterprise { get; set; }

        [Required]
        public DateTime RentedDay { get; set; }
        [Required]

        public int NumberOfDays { get; set; }
        [Required]

        public DateTime DateFrom { get; set; }

        [Required]
        public DateTime DateTo { get; set; }

        [Required]
        public int Price { get; set; }

        [Required]
        public SpecialOffer RealizedPackage { get; set; }

        [Required]
        public bool IsRated { get; set; }
    }
}
