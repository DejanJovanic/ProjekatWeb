using BookingAppBackend.Database.Contex;
using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.Airlines;
using BookingAppBackend.Model.Airlines.Parameters;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Repository
{
    public class AirlineRepository : Repository, IAirlineRepository
    {
        public AirlineRepository(BookingAppDbContext context) : base(context) { }

        public IEnumerable<Airline> GetAirlines()
        {
            return context.Airlines.Include(i => i.Address).Include(i => i.Flights)
                .ToList();
        }

        public async Task<Airline> GetAirline(int id)
        {
            return await context.Airlines
                .Include(i => i.Address)
                .Include(i => i.Reservations).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Flight)
                .Include(i => i.FastFlights).ThenInclude(i => i.Flight)
                .Include(i => i.FastFlights).ThenInclude(i => i.User)
                .Include(i => i.Flights).ThenInclude(i=> i.Airplane).ThenInclude(i => i.DisabledSeats)
                .Include(i => i.Flights).ThenInclude(i => i.Airplane).ThenInclude(i => i.RemovedSeats)
                .Include(i => i.Flights).ThenInclude(i => i.PaidExtras)
                .Include(i => i.Flights).ThenInclude(i => i.WeightPricings)
                .FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Airline> GetAirlineWithFlight(int flightId)
        {
            return await context.Airlines.Include(i => i.Reservations).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Flight).Include(i => i.FastFlights).ThenInclude(i => i.Flight)
               .Include(i => i.Flights).ThenInclude(i => i.Airplane).ThenInclude(i => i.DisabledSeats)
               .Include(i => i.Flights).ThenInclude(i => i.Airplane).ThenInclude(i => i.RemovedSeats)
               .FirstOrDefaultAsync(i => i.Flights.Count(j => j.Id == flightId) > 0);
        }


        public async Task<Airline> EditAirline(AirlineParameter airline)
        {
            var temp = await context.Airlines.Include(i => i.Address).FirstOrDefaultAsync(i => i.Id == airline.Id);
            if(temp != null)
            {
                temp.Name = airline.Name;
                temp.Description = airline.Description;
                temp.Destinations.Clear();
                foreach (var a in airline.Destinations) temp.Destinations.Add(a);

                temp.Address = new AirlineAddress();

                temp.Address.City = airline.Address.City;
                temp.Address.Country = airline.Address.Country;
                temp.Address.Latitude = airline.Address.Latitude;
                temp.Address.Longitude = airline.Address.Longitude;
                temp.Address.Street = airline.Address.Street;
                temp.Address.StreetNo = airline.Address.StreetNo;
                temp.Address.ZipCode = airline.Address.ZipCode;

                return temp;
            }
            return null;
        }
    }
}
