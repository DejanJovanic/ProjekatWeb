using BookingAppBackend.Database.Contex;
using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.Airlines;
using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Model.Responses;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Repository
{
    public class FlightRepository : Repository, IFlightRepository
    {
        public FlightRepository(BookingAppDbContext context) : base(context) { }
        public async Task<Flight> GetFlightAsync(int flightId)
        {
            var temp =  await context.Airlines.Include(i => i.Reservations).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Flight).Include(i => i.FastFlights).ThenInclude(i => i.Flight)
               .Include(i => i.Flights).ThenInclude(i => i.Airplane).ThenInclude(i => i.DisabledSeats)
               .Include(i => i.Flights).ThenInclude(i => i.Airplane).ThenInclude(i => i.RemovedSeats)
               .Include(i => i.Flights).ThenInclude(i => i.PaidExtras)
               .Include(i => i.Flights).ThenInclude(i => i.WeightPricings)
               .FirstOrDefaultAsync(i => i.Flights.Count(j => j.Id == flightId) > 0);
            if (temp != null)
                return temp.Flights.FirstOrDefault(i => i.Id == flightId);
            else
                return null;
        }
        public async Task<FlightResponse> AddFlight(FlightAddParameter flight, int airlineId)
        {
            var temp = await context.Airlines.Include(i => i.Flights).Include(i => i.Airplanes).FirstOrDefaultAsync(i => i.Id == airlineId);
            
            if(temp != null)
            {
                var tempFlight = new Flight();
                tempFlight.StartLocation = flight.StartLocation;
                tempFlight.EndLocation = flight.EndLocation;
                tempFlight.EndDate = flight.EndDate;
                tempFlight.FlightClass = flight.FlightClass;
                tempFlight.StartDate = flight.StartDate;
                tempFlight.IsRoundTrip = flight.IsRoundTrip;
                tempFlight.Distance = flight.Distance;
                tempFlight.LoadInCabin = flight.LoadInCabin;
                tempFlight.WeightPricings = flight.WeightPricings;
                tempFlight.PaidExtras = flight.Extras;
                if (flight.IsRoundTrip)
                {
                    tempFlight.StartDateBack = flight.StartDateBack;
                    tempFlight.EndDateBack = flight.EndDateBack;
                }
                tempFlight.Price = flight.Price;
                var tempAirplane = new Airplane();
                tempAirplane.Rows = flight.Airplane.Rows;
                tempAirplane.Columns = flight.Airplane.Columns;
                tempFlight.Airplane = tempAirplane;
                foreach (var a in flight.StopsLocations) tempFlight.StopsLocations.Add(a);
                temp.Flights.Add(tempFlight);

                temp.Airplanes.Add(tempFlight.Airplane);

                return new FlightResponse(tempFlight);
            }

            return new FlightResponse("Airline does not exist.");
        }

        public async Task<FlightResponse> GetFlightAsync(int flightId,int airlineId)
        {
            var airline = await context.Airlines.Include(i => i.FastFlights).ThenInclude(i => i.Flight).Include(i => i.Reservations).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Flight)
             .Include(i => i.Flights).ThenInclude(i => i.Airplane).ThenInclude(i => i.RemovedSeats)
             .Include(i => i.Flights).ThenInclude(i => i.Airplane).ThenInclude(i => i.DisabledSeats)
             .Include(i => i.Flights).ThenInclude(i => i.PaidExtras)
             .Include(i => i.Flights).ThenInclude(i => i.WeightPricings)
             .FirstOrDefaultAsync(i => i.Id == airlineId);
            if (airline == null)
                return new FlightResponse("Airline does not exist.");
            var flight = airline.Flights.FirstOrDefault(i => i.Id == flightId);
            if (flight == null)
                return new FlightResponse("Flight with given id does not exist.");

            return new FlightResponse(flight);
        }
        public async Task<FlightResponse> RemoveSeat(int row,int column,int airlineId,int flightId)
        {
            var airline = await context.Airlines
                    .Include(i => i.FastFlights).ThenInclude(i => i.Flight)
                    .Include(i => i.FastFlights).ThenInclude(i => i.User)
                    .Include(i => i.Reservations).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Flight)
                    .Include(i => i.Flights).ThenInclude(i => i.Airplane).ThenInclude(i => i.RemovedSeats)
                    .Include(i => i.Flights).ThenInclude(i => i.Airplane).ThenInclude(i => i.DisabledSeats)
                .FirstOrDefaultAsync(i => i.Id == airlineId);
            if (airline == null)
                return new FlightResponse("Airline does not exist.");
            var flight = airline.Flights.FirstOrDefault(i => i.Id == flightId);
            if (flight == null)
                return new FlightResponse("Flight with given id does not exist.");
            if(flight.Airplane.Rows <= row)
                return new FlightResponse("Invalid rows supplied.");
            if (flight.Airplane.Columns <= column)
                return new FlightResponse("Invalid columns supplied.");
            if (!IsSeatOkForChange(row, column, airline, flight,true,true))
            {
                flight.Airplane.RemovedSeats.Add(new RemovedSeat() { Column = column, Row = row });
                context.SaveChanges();
                if (IsSeatOkForChange(row, column, airline, flight,false,true))
                {
                    flight.Airplane.RemovedSeats.Remove(flight.Airplane.RemovedSeats.First(i => i.Row == row && i.Column == column));
                    context.SaveChanges();
                    return new FlightResponse("Seat is already reserved.");
                }
                else
                    return new FlightResponse(flight);
            }
            else
                return new FlightResponse("Seat is already reserved.");
        }

        public async Task<FlightResponse> DisableSeat(int row, int column, int airlineId, int flightId)
        {
            var airline = await context.Airlines
                    .Include(i => i.FastFlights).ThenInclude(i => i.Flight)
                    .Include(i => i.FastFlights).ThenInclude(i => i.User)
                    .Include(i => i.Reservations).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Flight)
                    .Include(i => i.Flights).ThenInclude(i => i.Airplane).ThenInclude(i => i.RemovedSeats)
                    .Include(i => i.Flights).ThenInclude(i => i.Airplane).ThenInclude(i => i.DisabledSeats)
                    .FirstOrDefaultAsync(i => i.Id == airlineId); if (airline == null)
                return new FlightResponse("Airline does not exist.");
            var flight = airline.Flights.FirstOrDefault(i => i.Id == flightId);
            if (flight == null)
                return new FlightResponse("Flight with given id does not exist.");
            if (flight.Airplane.Rows <= row)
                return new FlightResponse("Invalid rows supplied.");
            if (flight.Airplane.Columns <= column)
                return new FlightResponse("Invalid columns supplied.");
            if (!IsSeatOkForChange(row, column, airline, flight,true,true))
            {
                flight.Airplane.DisabledSeats.Add(new DisabledSeat() { Column = column, Row = row });
                context.SaveChanges();
                if (IsSeatOkForChange(row, column, airline, flight,true,false))
                {
                    flight.Airplane.DisabledSeats.Remove(flight.Airplane.DisabledSeats.First(i => i.Row == row && i.Column == column));
                    context.SaveChanges();
                    return new FlightResponse("Seat is already reserved.");
                }
                else
                    return new FlightResponse(flight);
            }
            else
                return new FlightResponse("Seat is already reserved.");
        }

        public async Task<FlightResponse> EnableSeat(int row, int column, int airlineId, int flightId)
        {
            var airline = await context.Airlines
                    .Include(i => i.FastFlights).ThenInclude(i => i.Flight)
                    .Include(i => i.FastFlights).ThenInclude(i => i.User)
                    .Include(i => i.Reservations).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Flight)
                    .Include(i => i.Flights).ThenInclude(i => i.Airplane).ThenInclude(i => i.RemovedSeats)
                    .Include(i => i.Flights).ThenInclude(i => i.Airplane).ThenInclude(i => i.DisabledSeats)
                    .FirstOrDefaultAsync(i => i.Id == airlineId); if (airline == null)
                return new FlightResponse("Airline does not exist.");
            var flight = airline.Flights.FirstOrDefault(i => i.Id == flightId);
            if (flight == null)
                return new FlightResponse("Flight with given id does not exist.");
            if (flight.Airplane.Rows <= row)
                return new FlightResponse("Invalid rows supplied.");
            if (flight.Airplane.Columns <= column)
                return new FlightResponse("Invalid columns supplied.");
            DisabledSeat seat = null;
            foreach(var a in flight.Airplane.DisabledSeats)
            {
                if(a.Row == row && a.Column == column)
                {
                    seat = a;
                    break;
                }
            }
            if (seat != null)
            {
                flight.Airplane.DisabledSeats.Remove(seat);
                return new FlightResponse(flight);
            }
            else
                return new FlightResponse("Seat with given row and column isn't disabled on given flight.");
        }

        public async Task<FlightResponse> AddSeats(int rowsTop, int rowsBottom,int columnsLeft,int columnsRight, int airlineId, int flightId)
        {
            var airline = await context.Airlines
                    .Include(i => i.FastFlights).ThenInclude(i => i.Flight)
                    .Include(i => i.FastFlights).ThenInclude(i => i.User)
                    .Include(i => i.Reservations).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Flight)
                    .Include(i => i.Flights).ThenInclude(i => i.Airplane).ThenInclude(i => i.RemovedSeats)
                    .Include(i => i.Flights).ThenInclude(i => i.Airplane).ThenInclude(i => i.DisabledSeats)
                    .FirstOrDefaultAsync(i => i.Id == airlineId); if (airline == null)
                return new FlightResponse("Airline does not exist.");
            var flight = airline.Flights.FirstOrDefault(i => i.Id == flightId);
            if (flight == null)
                return new FlightResponse("Flight with given id does not exist.");

            foreach(var a in airline.FastFlights.Where(i => i.Flight.Id == flight.Id))
            {
                a.Row += rowsTop;
                a.Column += columnsLeft;
            }
            foreach (var a in airline.Reservations)
            {
                foreach(var b in a.AirlineTickets.Where(i => i.Flight.Id == flight.Id))
                {
                    b.Row += rowsTop;
                    b.Column += columnsLeft;
                }
           
            }
            foreach(var a in flight.Airplane.DisabledSeats)
            {
                a.Row += rowsTop;
                a.Column += columnsLeft;
            }
            foreach (var a in flight.Airplane.RemovedSeats)
            {
                a.Row += rowsTop;
                a.Column += columnsLeft;
            }
            flight.Airplane.Rows += rowsTop + rowsBottom;
            flight.Airplane.Columns += columnsLeft + columnsRight;

            return new FlightResponse(flight);
        }


        public bool IsSeatTaken(int row,int column,Airline airline,Flight flight,bool checkRemoved,bool checkDisabled)
        {
            var tickets = new List<Ticket>();
            foreach(var a in airline.Reservations)
            {
                foreach(var b in a.AirlineTickets.Where(i => i.Flight.Id == flight.Id))
                {
                    tickets.Add(b);
                }
            }

            if (tickets.Count(i => i.Row == row && i.Column == column) > 0)
                return true;

            var fastTickets = airline.FastFlights.Where(i => i.Flight.Id == flight.Id);

            if (fastTickets.Count(i => i.Row == row && i.Column == column && i.User != null) > 0)
                return true;

            if(checkDisabled && flight.Airplane.DisabledSeats.Count(i => i.Row == row && i.Column == column) > 0)          
                return true;
            if (checkRemoved && flight.Airplane.RemovedSeats.Count(i => i.Row == row && i.Column == column) > 0)
                return true;

            return false;
        }

        public bool IsSeatOkForChange(int row, int column, Airline airline, Flight flight, bool checkRemoved, bool checkDisabled)
        {
            var tickets = new List<Ticket>();
            foreach (var a in airline.Reservations)
            {
                foreach (var b in a.AirlineTickets.Where(i => i.Flight.Id == flight.Id))
                {
                    tickets.Add(b);
                }
            }

            if (tickets.Count(i => i.Row == row && i.Column == column) > 0)
                return true;

            var fastTickets = airline.FastFlights.Where(i => i.Flight.Id == flight.Id);

            if (fastTickets.Count(i => i.Row == row && i.Column == column) > 0)
                return true;

            if (checkDisabled && flight.Airplane.DisabledSeats.Count(i => i.Row == row && i.Column == column) > 0)
                return true;
            if (checkRemoved && flight.Airplane.RemovedSeats.Count(i => i.Row == row && i.Column == column) > 0)
                return true;

            return false;
        }


    }
}
