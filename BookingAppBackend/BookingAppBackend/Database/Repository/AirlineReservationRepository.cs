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
    public class AirlineReservationRepository : Repository,IAirlineReservationRepository
    {
        IFlightRepository flightRepo;

        public AirlineReservationRepository(IFlightRepository flightRepository,BookingAppDbContext context) : base(context)
        {
            flightRepo = flightRepository;
        }  

        public async Task<AirlineReservationResponse> Add(ICollection<TicketParameter> tickets)
        {
            if (tickets.Count > 0)
            {
                var reservation = new Reservation();
                var airlineId = tickets.First().AirlineId;
                var flightId = tickets.First().FlightId;
                var airline = await context.Airlines.Include(i => i.FastFlights).ThenInclude(i => i.Flight).Include(i => i.Reservations).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Flight)
                      .Include(i => i.Flights).ThenInclude(i => i.Airplane).ThenInclude(i => i.RemovedSeats)
                      .Include(i => i.Flights).ThenInclude(i => i.Airplane).ThenInclude(i => i.DisabledSeats)
                      .Include(i => i.Flights).ThenInclude(i => i.PaidExtras)
                      .Include(i => i.Flights).ThenInclude(i => i.WeightPricings)
                      .FirstOrDefaultAsync(i => i.Id == airlineId);
                if (airline == null)                    
                    return new AirlineReservationResponse("Airline with given id does not exist.");

                var flight = airline.Flights.FirstOrDefault(i => i.Id == flightId);
                if (flight == null)
                    return new AirlineReservationResponse("Flight with given id does not exist.");
                foreach (var a in tickets)
                {
                    if (flightRepo.IsSeatTaken(a.Row, a.Column, airline, flight, true, true))
                        return new AirlineReservationResponse("Seat is already taken");

                    var owner = await context.RegisteredUsers.FindAsync(a.TicketOwnerUsername);
                    if (owner != null || string.IsNullOrWhiteSpace(a.TicketOwnerUsername))
                    {
                        if (string.IsNullOrWhiteSpace(a.InvitedByUsername) && owner != null)
                            reservation.SettingUser = owner;

                        var inviter = await context.RegisteredUsers.FindAsync(a.InvitedByUsername);
                        if (inviter != null || (string.IsNullOrWhiteSpace(a.InvitedByUsername) && owner != null))
                        {
                            var ticket = new Ticket();
                            
                            ticket.Flight = flight;
                            ticket.Column = a.Column;
                            ticket.Row = a.Row;

                            ticket.TicketOwner = owner;
                            ticket.InvitedBy = inviter;
                            if (string.IsNullOrWhiteSpace(a.TicketOwnerUsername) || (owner == inviter) || (string.IsNullOrWhiteSpace(a.InvitedByUsername) && owner != null))
                                ticket.IsApporved = true;
                            else
                                ticket.IsApporved = false;
                            ticket.LoadWeight = a.LoadWeight;
                            foreach (var b in flight.PaidExtras)
                            {
                                if (a.SelectedExtras.Contains(b.Id))
                                {
                                    var extra = new TicketPaidExtra();
                                    extra.PaidExtra = b;
                                    extra.Ticket = ticket;
                                    b.Tickets.Add(extra);
                                    ticket.SelectedExtras.Add(extra);
                                    context.TicketPaidExtras.Add(extra);
                                }

                            }
                            if (owner != null)
                            {
                                ticket.Name = owner.Name;
                                ticket.LastName = owner.LastName;
                            }
                            else
                            {
                                ticket.Name = a.Name;
                                ticket.LastName = a.LastName;
                            }
                            ticket.Passport = a.Passport;
                            reservation.AirlineTickets.Add(ticket);
                            
                       
                        }
                        else
                            return new AirlineReservationResponse("Inviter with given username does not exist.");
                    }
                    else
                        return new AirlineReservationResponse("Owner with given username does not exist.");     
                }
                airline.Reservations.Add(reservation);
                return new AirlineReservationResponse(reservation);
            }
            else
                return new AirlineReservationResponse("No tickets given.");
        }

        public async Task<AirlineReservationResponse> EditPrices(int airlineId,int reservationId, ICollection<(int,double)> prices)
        {
            var airline = await context.Airlines.Include(i => i.Reservations).ThenInclude(i => i.AirlineTickets).FirstOrDefaultAsync(i => i.Id == airlineId);


            if (airline == null)
                return new AirlineReservationResponse("Airline with given id does not exist.");

            var reservation = airline.Reservations.FirstOrDefault(i => i.Id == reservationId);
            if (reservation == null)
                return new AirlineReservationResponse("Reservation with given id does not exist.");

            foreach(var a in reservation.AirlineTickets)
            {
                var temp = prices.FirstOrDefault(i => i.Item1 == a.Id);
                a.Price = temp.Item2;
            }

            return new AirlineReservationResponse(reservation);
        }
    }
}
