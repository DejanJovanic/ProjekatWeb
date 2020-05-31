using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines.Parameters
{
    public class FlightAddParameter
    {
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        public DateTime StartDateBack { get; set; }
        public DateTime EndDateBack { get; set; }
        [Required]
        public string StartLocation { get; set; }
        [Required]
        public string EndLocation { get; set; }
        public List<string> StopsLocations { get; set; }
        [Required]
        public double Price { get; set; }
        public Airplane Airplane { get; set; }
        [Required]
        public bool IsRoundTrip { get; set; }
        [Required]
        public FlightClass FlightClass { get; set; }
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (EndDate < StartDate)
            {
                yield return
                  new ValidationResult(errorMessage: "EndDate must be greater or equal to StartDate",
                                       memberNames: new[] { "EndDate" });
            }
            if (IsRoundTrip)
            {
                if (EndDateBack != null && StartDateBack != null)
                {
                    if (EndDateBack < StartDateBack || StartDateBack < EndDate || EndDateBack < EndDate)
                        yield return
                            new ValidationResult(errorMessage: "Invalid back dates back specified", memberNames: new[] { "StartDateBack", "EndDateBack" });

                }
                else
                {
                    yield return
                    new ValidationResult(errorMessage: "Back dates have to be supplied", memberNames: new[] { "StartDateBack", "EndDateBack" });
                }
          }
         

        }
    }
}
