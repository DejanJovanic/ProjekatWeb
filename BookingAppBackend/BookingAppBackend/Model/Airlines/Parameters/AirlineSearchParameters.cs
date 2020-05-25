using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines.Parameters
{
    public class AirlineSearchParameters : IValidatableObject
    {
        [Required]
        [DateValidation(ErrorMessage ="Start date has to be greater or equal to current date")]
        
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public bool IsRoundTrip { get; set; }
        [Required]
        public bool MultiCity { get; set; }
        [Required]
        public string FlightClass { get; set; }
        [Required]
        public string StartLocation { get; set; }
        [Required]
        public string EndLocation { get; set; }
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (EndDate < StartDate)
            {
                yield return
                  new ValidationResult(errorMessage: "EndDate must be greater or equal to StartDate",
                                       memberNames: new[] { "EndDate" });
            }
            if(FlightClass != "First" && FlightClass != "Economy" && FlightClass != "Business")
            {
                yield return
                    new ValidationResult(errorMessage: "Invalid flight class supplied", memberNames: new[] { "FlightClass" });
            }

        }
    }
}
