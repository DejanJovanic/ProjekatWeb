using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.RentACar.Parameters
{
    public class SearchEnterpriseParameters
    {
        public string EnterpriseName { get; set; }
        public string BranchLocation { get; set; }

        [Required]
        public DateTime RentFrom { get; set; }

        [Required]
        public DateTime RentTo { get; set; }
    }
}
