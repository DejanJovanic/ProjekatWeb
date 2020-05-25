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
                //context.SaveChanges();
                return new FlightResponse(tempFlight);
            }

            return new FlightResponse("Airline does not exist.");
        }

        public async Task<FlightResponse> RemoveSeat(int row,int column,int airlineId,int flightId)
        {
            var airline = await context.Airlines.Include(i => i.FastFlights).Include(i => i.Tickets)
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
            if (!IsSeatTaken(row, column, airline, flight,true,true))
            {
                flight.Airplane.RemovedSeats.Add(new RemovedSeat() { Column = column, Row = row });
                context.SaveChanges();
                if (IsSeatTaken(row, column, airline, flight,false,true))
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
            var airline = await context.Airlines.Include(i => i.FastFlights).Include(i => i.Tickets)
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
            if (!IsSeatTaken(row, column, airline, flight,true,true))
            {
                flight.Airplane.DisabledSeats.Add(new DisabledSeat() { Column = column, Row = row });
                context.SaveChanges();
                if (IsSeatTaken(row, column, airline, flight,true,false))
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

        public async Task<FlightResponse> AddSeats(int rowsTop, int rowsBottom,int columnsLeft,int columnsRight, int airlineId, int flightId)
        {
            var airline = await context.Airlines.Include(i => i.FastFlights).Include(i => i.Tickets)
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
            foreach (var a in airline.Tickets.Where(i => i.Flight.Id == flight.Id))
            {
                a.Row += rowsTop;
                a.Column += columnsLeft;
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

        private bool IsSeatTaken(int row,int column,Airline airline,Flight flight,bool checkRemoved,bool checkDisabled)
        {
           var tickets =  airline.Tickets.Where(i => i.Flight.Id == flight.Id);

            if (tickets.Count(i => i.Row == row && i.Column == column) > 0)
                return true;

            var fastTickets = airline.FastFlights.Where(i => i.Flight.Id == flight.Id);

            if (fastTickets.Count(i => i.Row == row && i.Column == column) > 0)
                return true;

            if(checkDisabled && flight.Airplane.DisabledSeats.Count(i => i.Row == row && i.Column == column) > 0)          
                return true;
            if (checkRemoved && flight.Airplane.RemovedSeats.Count(i => i.Row == row && i.Column == column) > 0)
                return true;

            return false;
        }
    }
}
