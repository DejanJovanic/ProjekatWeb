using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.RentACar
{
    public class Car
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int YearOfProduction { get; set; }
        public string Type { get; set; }
        public string FuelType { get; set; }
        public string TransmissionType { get; set; }
        public int NumberOfSeats { get; set; }
        public int Price { get; set; }
        public ICollection<CarRating> Ratings { get; set; } = new List<CarRating>();
        public ICollection<ReservationCar> Reservations { get; set; } = new List<ReservationCar>();
        public ICollection<Discount> Discounts { get; set; } = new List<Discount>();

    }
}
