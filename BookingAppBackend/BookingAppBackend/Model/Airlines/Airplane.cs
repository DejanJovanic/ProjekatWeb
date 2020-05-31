using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines
{
    public class Airplane
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int Rows { get; set; }
        [Required]
        public int Columns { get; set; }
        public ICollection<DisabledSeat> DisabledSeats { get; set; } = new List<DisabledSeat>();
        public ICollection<RemovedSeat> RemovedSeats { get; set; } = new List<RemovedSeat>();
        
    }
}
