using BookingAppBackend.Database.Contex;
using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.Airlines;
using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Model.Airlines.Resources;
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
            return context.Airlines.Include(i => i.Address).Include(i => i.Flights).ToList();

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

        public async Task<Airline> GetAirlineData(int id)
        {
            return await context.Airlines
                .Include(i => i.Ratings)
                .Include(i => i.Reservations).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Flight)
                .Include(i => i.FastFlights).ThenInclude(i => i.Flight)
                .Include(i => i.FastFlights).ThenInclude(i => i.User)
                .Include(i => i.Flights).ThenInclude(i => i.Ratings)
                .FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<AirlineDataResource> GetData(int airlineId)
        {
            var airline = await GetAirlineData(airlineId);
            if (airline != null)
            {
                var ret = new AirlineDataResource();
                foreach(var a in airline.Ratings)
                {
                    ret.AirlineRatings.Add(new RatingResource { DateTime = a.DateTime, Rate = a.Rate });
                }

                foreach(var a in airline.Flights)
                {
                    var flight = new FlightDataResource();
                    flight.Id = a.Id;
                    flight.StartDate = a.StartDate;
                    flight.EndDate = a.EndDate;
                    flight.StartLocation = a.StartLocation;
                    flight.EndLocation = a.EndLocation;
                    if (a.IsRoundTrip)
                    {
                        flight.IsRoundTrip = true;
                        flight.StartDateBack = a.StartDateBack;
                        flight.EndDateBack = a.EndDateBack;
                    }
                    foreach(var b in airline.Reservations)
                    {
                        if (b.AirlineTickets.First().Flight.Id == a.Id)
                        {
                            foreach(var c in b.AirlineTickets)
                            {
                                flight.Tickets.Add(new TicketDataResource { BookingDate = c.BookingDate, Price = c.Price });
                            }

                        }
                    }
                    foreach(var b in airline.FastFlights)
                    {
                        if(b.Flight.Id == a.Id && b.User != null)
                        {
                            flight.Tickets.Add(new TicketDataResource { BookingDate = b.BookingDate, Price = b.Price });
                        }
                    }
                    foreach(var b in a.Ratings)
                    {
                        flight.FlightRatings.Add(new RatingResource { DateTime = b.DateTime, Rate = b.Rate });
                    }
                    ret.Flights.Add(flight);
                }
                return ret;
            }
            else
                return null;
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
