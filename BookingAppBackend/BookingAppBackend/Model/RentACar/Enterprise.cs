using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.RentACar
{
    public class Enterprise
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public EnterpriseAddress Address { get; set; }
        public ICollection<EnterpriseBranch> Branches { get; set; } = new List<EnterpriseBranch>();
        public string Description { get; set; }
        public ICollection<EnterpriseRating> Rating { get; set; } = new List<EnterpriseRating>();
        public ICollection<Car> Cars { get; set; } = new List<Car>();
        public ICollection<SpecialOffer> SpecialOffers { get; set; } = new List<SpecialOffer>();
       
        
    }
}
