using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.RentACar.Parameters
{
    public class AddBranchParameters
    {
        [Required]
        public int EnterpriseId { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Street { get; set; }

        [Required]
        public string StreetNo { get; set; }

        [Required]
        public string ZipCode { get; set; }
    }
}
