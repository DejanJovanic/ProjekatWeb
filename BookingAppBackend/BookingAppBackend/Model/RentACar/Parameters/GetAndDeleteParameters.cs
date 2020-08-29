using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.RentACar.Parameters
{
    public class GetAndDeleteParameters
    {
        [Required]
        public int ObjectId { get; set; }
        [Required]
        public int EnterpriseId { get; set; }
    }
}
