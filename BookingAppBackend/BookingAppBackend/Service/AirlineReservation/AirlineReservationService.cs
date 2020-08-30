using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.Airlines;
using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Model.Responses;
using Microsoft.AspNetCore.Components.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.AirlineReservation
{
    public class AirlineReservationService : IAirlineReservationService
    {

        IUserRepository userRepo;
        IAirlineReservationRepository reservationRepo;
        IUnitOfWork unitOfWork;
        IFlightRepository flightRepo;

        public AirlineReservationService(IUserRepository userRepo, IAirlineReservationRepository reservationRepo, IUnitOfWork unitOfWork, IFlightRepository flightRepo)
        {
            this.userRepo = userRepo;
            this.reservationRepo = reservationRepo;
            this.unitOfWork = unitOfWork;
            this.flightRepo = flightRepo;
        }

        public async Task<AirlineReservationResponse> Add(ICollection<TicketParameter> tickets,bool ownerInvestingPoints)
        {
            bool isOk = true;
            var ret = new AirlineReservationResponse("Error");
            try
            {
                await unitOfWork.StartTransaction(Database.Repository.TransactionType.Normal);
              
                if(tickets != null)
                {
                    ret = await reservationRepo.Add(tickets);
                    if (ret.Success)
                    {

                        CalculatePrices(ret.Resource);

                        if (ownerInvestingPoints)
                        {
                            var temp4 = ReducePrice(ret.Resource, ret.Resource.SettingUser.Username);
                            ret = temp4;
                            if (temp4.Success)
                            {
                                var points = CalculatePoints(ret.Resource.AirlineTickets.First().Flight.Distance);
                                temp4.Resource.SettingUser.Points += points;
                               
                                await unitOfWork.CompleteAsync();

                            }
                            else
                            {
                                isOk = false;
                                await unitOfWork.Rollback();
                            }
                            
                        }
                        else
                        {
                            var points2 = CalculatePoints(ret.Resource.AirlineTickets.First().Flight.Distance);
                            ret.Resource.SettingUser.Points += points2;
                            await unitOfWork.CompleteAsync();
                        }
                    
                        if (ret.Success)
                        {
                            foreach (var a in ret.Resource.AirlineTickets)
                            {
                                if (flightRepo.IsSeatRemovedOrChanged(a.Row, a.Column, a.Airline, a.Flight))
                                {
                                    isOk = false;
                                    ret = new AirlineReservationResponse("Seat is not available");
                                    await unitOfWork.Rollback();

                                }
                            }

                        }

                        //Logika za rezervacije automobila uz rezervaciju aviona

                    }
                    else
                    {
                        isOk = false;
                        await unitOfWork.Rollback();
                    }
                }

                //Logika za rezervaciju samo automobila

            }
            catch(Exception e)
            {
                ret = new AirlineReservationResponse(e.Message);
                await unitOfWork.Rollback();
                isOk = false;
            }

            if (isOk)
                await unitOfWork.Commit();

            await unitOfWork.EndTransaction();
            return ret;
        }

        public async Task<AirlineReservationResponse> AcceptReservation(ReservationOptionsParameter param,string username, bool investingPoints)
        {
            try
            {
                var temp = await reservationRepo.AcceptReservation(param, username);
                if (temp.Success)
                {
                    //await unitOfWork.CompleteAsync();
                    CalculatePrices(temp.Resource);
                    if (investingPoints)
                    {
                        var temp4 = ReducePrice(temp.Resource,username);

                        var points = CalculatePoints(temp.Resource.AirlineTickets.First().Flight.Distance);
                        var temp5 = temp.Resource.AirlineTickets.FirstOrDefault(i => i.TicketOwner != null && i.TicketOwner.Username == username);
                        if (temp5 != null)
                        {
                            temp5.TicketOwner.Points += points;
                            await unitOfWork.CompleteAsync();
                        }

                        return temp4;
                    }

                    var points2 = CalculatePoints(temp.Resource.AirlineTickets.First().Flight.Distance);
                    var temp6 = temp.Resource.AirlineTickets.FirstOrDefault(i => i.TicketOwner != null && i.TicketOwner.Username == username);
                    if (temp6 != null)
                    {
                        temp6.TicketOwner.Points += points2;
                        await unitOfWork.CompleteAsync();
                    }
                    
                }
                return temp;
            }
            catch (Exception e)
            {
                return new AirlineReservationResponse(e.Message);
            }
        }

        public async Task<AirlineReservationResponse> RejectReservation(ReservationOptionsParameter param, string username)
        {
            try
            {
                var temp = await reservationRepo.RejectReservation(param, username);
                if (temp.Success) { }
                    await unitOfWork.CompleteAsync();
                    
                return temp;
            }
            catch (Exception e)
            {
                return new AirlineReservationResponse(e.Message);
            }
        }

        public async Task<AirlineReservationResponse> CancelReservation(ReservationOptionsParameter param, string username)
        {
            try
            {
                var temp = await reservationRepo.CancelReservation(param, username);
                if (temp.Success)
                    await unitOfWork.CompleteAsync();
                
                return temp;
            }
            catch (Exception e)
            {
                return new AirlineReservationResponse(e.Message);
            }
        }
        public void CalculatePrices(Reservation reservation)
        {

            if (reservation.AirlineTickets.Count > 0)
            {
                foreach (var a in reservation.AirlineTickets)
                {
                    double cost = a.Flight.Price;
                    foreach (var b in a.SelectedExtras)
                        cost += b.PaidExtra.Price;

                    foreach(var b in a.Flight.WeightPricings)
                    {
                        if(b.From <= a.LoadWeight && b.To >= a.LoadWeight)
                        {
                            cost += a.LoadWeight * b.Price;
                            break;
                        }
                    }
                    cost -= a.NumberOfPointsInvested;
                    a.Price = cost;

                }
            }
          
        }

        public double CalculatePoints(double travelDistance)
        {
            return travelDistance / 200 * 10;
        }

        public AirlineReservationResponse ReducePrice(Reservation reservation, string username)
        {
            foreach(var ticket in reservation.AirlineTickets)
            {
                if (ticket.TicketOwner != null && ticket.TicketOwner.Username == username)
                {
                    if (ticket.TicketOwner.Points > 0)
                    {
                        if (ticket.TicketOwner.Points >= ticket.Price)
                        {
                            
                            ticket.NumberOfPointsInvested =  ticket.Price;
                            ticket.TicketOwner.Points -= ticket.Price;
                            ticket.Price = 0;
                        }
                        else
                        {
                            ticket.Price -= ticket.TicketOwner.Points;
                            ticket.NumberOfPointsInvested = ticket.TicketOwner.Points;
                            ticket.TicketOwner.Points = 0;
                        }
                        return new AirlineReservationResponse(reservation);
                    }
                    else
                        return new AirlineReservationResponse("User has no points.");
                }

            }
            return new AirlineReservationResponse("User with given username hasn't booked flight in this reservation");

        }

        public async Task<ICollection<Reservation>> GetReservationsAsync(string username)
        {
            return await reservationRepo.GetReservations(username);
        }
    }
}
