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
        IUserRepository userRepo;

        public AirlineReservationRepository(IFlightRepository flightRepo, IUserRepository userRepo,BookingAppDbContext context) : base(context)
        {
            this.flightRepo = flightRepo;
            this.userRepo = userRepo;
        }

        public async Task<AirlineReservationResponse> Add(ICollection<TicketParameter> tickets)
        {
            if (tickets.Count > 0)
            {
                var users = new List<string>();
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
                            ticket.Airline = airline;
                            ticket.Flight = flight;
                            ticket.Column = a.Column;
                            ticket.Row = a.Row;
                            ticket.BookingDate = DateTime.Now;
                            ticket.TicketOwner = owner;
                            if (owner != null)
                                users.Add(owner.Username);

                            ticket.InvitedBy = inviter;
                            if (string.IsNullOrWhiteSpace(a.TicketOwnerUsername) || (owner == inviter) || (string.IsNullOrWhiteSpace(a.InvitedByUsername) && owner != null))
                                ticket.IsApproved = true;
                            else
                                ticket.IsApproved = false;
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
                foreach(var a in users)
                {
                   var temp = await userRepo.AddReservation(a, reservation);
                    if (!temp.Success)
                        return new AirlineReservationResponse(temp.Message);
                }
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

        public async Task<AirlineReservationResponse> AcceptReservation(ReservationOptionsParameter param,string username)
        {
            var temp = await context.RegisteredUsers
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.TicketOwner)
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.SelectedExtras).ThenInclude(i => i.PaidExtra)
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.Users).ThenInclude(i => i.User)
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.SettingUser)
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Flight).ThenInclude(i => i.PaidExtras)
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Flight).ThenInclude(i => i.WeightPricings)
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Airline).ThenInclude(i => i.Address)
              .FirstOrDefaultAsync(i => i.Username.ToLower() == username.ToLower());
            if (temp != null)
            {
                foreach(var b in temp.MyReservations)
                {
                    var ticket = b.Reservation.AirlineTickets.FirstOrDefault(i => i.Id == param.TicketId);
                    if(ticket != null)
                    {
                        ticket.IsApproved = true;
                        ticket.LoadWeight = param.LuggageWeight;
                        ticket.Passport = param.PassportNumber;
                        foreach (var a in ticket.Flight.PaidExtras)
                        {
                            if (param.SelectedExtras.Contains(a.Id))
                            {
                                var extra = new TicketPaidExtra();
                                extra.PaidExtra = a;
                                extra.Ticket = ticket;
                                a.Tickets.Add(extra);
                                ticket.SelectedExtras.Add(extra);
                                context.TicketPaidExtras.Add(extra);
                            }
                        }
                        return new AirlineReservationResponse(b.Reservation);
                    }
                }
                return new AirlineReservationResponse("User has no reservation with given id");                              
            }
            else
                return new AirlineReservationResponse("User does not exist");
        }

        public async Task<AirlineReservationResponse> RejectReservation(ReservationOptionsParameter param, string username)
        {
            var temp = await context.RegisteredUsers
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.TicketOwner)
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.SelectedExtras).ThenInclude(i => i.PaidExtra)
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.Users).ThenInclude(i => i.User)
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.SettingUser)
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Flight).ThenInclude(i => i.PaidExtras)
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Flight).ThenInclude(i => i.WeightPricings)
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Airline).ThenInclude(i => i.Address)
              .FirstOrDefaultAsync(i => i.Username.ToLower() == username.ToLower());
            if (temp != null)
            {
                foreach (var b in temp.MyReservations)
                {
                    var ticket = b.Reservation.AirlineTickets.FirstOrDefault(i => i.Id == param.TicketId);
                    if (ticket != null)
                    {
                        b.Reservation.AirlineTickets.Remove(ticket);
                        b.Reservation.Users.Remove(b);
                        temp.MyReservations.Remove(b);
                        context.Tickets.Remove(ticket);
                        if(b.Reservation.AirlineTickets.Count == 0)
                        {
                            context.Reservation.Remove(b.Reservation);
                        }
                        return new AirlineReservationResponse(b.Reservation);
                    }
                }
                return new AirlineReservationResponse("User has no reservation with given id");
            }
            else
                return new AirlineReservationResponse("User does not exist");
        }

        public async Task<AirlineReservationResponse> CancelReservation(ReservationOptionsParameter param, string username)
        {
            var temp = await context.RegisteredUsers
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.TicketOwner)
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.SelectedExtras).ThenInclude(i => i.PaidExtra)
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.Users).ThenInclude(i => i.User)
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.SettingUser)
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Flight).ThenInclude(i => i.PaidExtras)
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Flight).ThenInclude(i => i.WeightPricings)
              .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Airline).ThenInclude(i => i.Address)
              .FirstOrDefaultAsync(i => i.Username.ToLower() == username.ToLower());
            if (temp != null)
            {
                foreach (var b in temp.MyReservations)
                {
                    var ticket = b.Reservation.AirlineTickets.FirstOrDefault(i => i.Id == param.TicketId);
                    if (ticket != null)
                    {

                        foreach(var a in ticket.SelectedExtras)
                        {
                            context.TicketPaidExtras.Remove(a);
                        }
                        if(ticket.TicketOwner == null)
                        {
                            b.Reservation.AirlineTickets.Remove(ticket);
                            context.Tickets.Remove(ticket);
                            if (b.Reservation.AirlineTickets.Count(i => i.TicketOwner == null) == 0 && b.Reservation.AirlineTickets.Count(i => i.TicketOwner.Username.ToLower() == b.Reservation.SettingUser.Username.ToLower()) == 0)
                            {
                                var user = b.Reservation.Users.FirstOrDefault(i => i.Username.ToLower() == b.Reservation.SettingUser.Username.ToLower());
                                if (user != null)
                                {
                                    b.Reservation.Users.Remove(b);
                                    user.User.MyReservations.Remove(b);
                                }
                                
                            }
                        }
                        else if(ticket.TicketOwner.Username.ToLower() == b.Reservation.SettingUser.Username.ToLower())
                        {
                            b.Reservation.AirlineTickets.Remove(ticket);
                            context.Tickets.Remove(ticket);
                            if(b.Reservation.AirlineTickets.Count(i => i.TicketOwner == null) == 0)
                            {
                                b.Reservation.Users.Remove(b);
                                temp.MyReservations.Remove(b);
                            }
                            ticket.TicketOwner.Points += ticket.NumberOfPointsInvested;
                            ticket.TicketOwner.Points -= ticket.Flight.Distance / 200 * 10;
                        }
                        else
                        {
                            b.Reservation.AirlineTickets.Remove(ticket);
                            context.Tickets.Remove(ticket);
                            b.Reservation.Users.Remove(b);
                            temp.MyReservations.Remove(b);
                            ticket.TicketOwner.Points += ticket.NumberOfPointsInvested;
                            ticket.TicketOwner.Points -= ticket.Flight.Distance / 200 * 10;
                        }
                        
                      
                     
                        if (b.Reservation.AirlineTickets.Count == 0)
                        {
                            context.Reservation.Remove(b.Reservation);
                        }

                        
                        return new AirlineReservationResponse(b.Reservation);
                    }
                }
                return new AirlineReservationResponse("User has no reservation with given id");
            }
            else
                return new AirlineReservationResponse("User does not exist");
        }
        public async Task<ICollection<Reservation>> GetReservations(string username)
        {
            var ret = new List<Reservation>();
            try
            {
                var temp = await context.RegisteredUsers
               .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.TicketOwner)
               .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.SettingUser)
               .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Flight).ThenInclude(i => i.PaidExtras)
               .Include(i => i.MyReservations).ThenInclude(i => i.Reservation).ThenInclude(i => i.AirlineTickets).ThenInclude(i => i.Airline).ThenInclude(i => i.Address)
               .FirstOrDefaultAsync(i => i.Username.ToLower() == username.ToLower());
                if (temp != null)
                {
                    foreach (var a in temp.MyReservations)
                    {
                        var reservation = new Reservation();
                        foreach (var b in a.Reservation.AirlineTickets)
                        {
                            if (b.TicketOwner?.Username.ToLower() == username.ToLower())
                                reservation.AirlineTickets.Add(b);
                            if (b.TicketOwner == null && a.Reservation.SettingUser.Username.ToLower() == username.ToLower())
                                reservation.AirlineTickets.Add(b);
                        }
                        ret.Add(reservation);
                    }
                }
                return ret;
            }
            catch(Exception e)
            {
                return ret;
            }
           
        }
    }
}
