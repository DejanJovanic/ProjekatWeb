using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.RentACar
{
    public class ReservationCar
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
    
        public DateTime RentedDay { get; set; }
        public int NumberOfDays { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public int Price { get; set; }
        public SpecialOffer RealizedPackage { get; set; }
        public bool IsRated { get; set; }
    }
}
