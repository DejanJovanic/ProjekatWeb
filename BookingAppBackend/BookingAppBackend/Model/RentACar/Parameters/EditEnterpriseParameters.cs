using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.RentACar.Parameters
{
    public class EditEnterpriseParameters
    {
        [Required]
        public int EnterpriseId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public EnterpriseAddress Address { get; set; }
        [Required]
        public string Description { get; set; }
  
    }
}
