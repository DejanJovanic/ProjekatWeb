﻿using BookingAppBackend.Database.Interfaces;
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

        public async Task<AirlineReservationResponse> Add(ICollection<TicketParameter> tickets)
        {
            try
            {
                var temp = await reservationRepo.Add(tickets);
                if (temp.Success)
                {
                    await unitOfWork.CompleteAsync();
                    var temp2 = CalculatePrices(temp.Resource);
                    var temp3 = await reservationRepo.EditPrices(tickets.First().AirlineId, temp.Resource.Id, temp2);
                    if (temp3.Success)
                        await unitOfWork.CompleteAsync();
                    return temp3;
                }
                else
                    return new AirlineReservationResponse(temp.Message);
            }
            catch(Exception e)
            {
                return new AirlineReservationResponse(e.Message);
            }
        }

        public async Task<AirlineReservationResponse> AcceptReservation(ReservationOptionsParameter param,string username)
        {
            try
            {
                var temp = await reservationRepo.AcceptReservation(param, username);
                if (temp.Success)
                {
                    await unitOfWork.CompleteAsync();
                    var temp2 = CalculatePrices(temp.Resource);
                    var temp3 = await reservationRepo.EditPrices(param.AirlineId, temp.Resource.Id, temp2);
                    if (temp3.Success)
                        await unitOfWork.CompleteAsync();
                    return temp3;
                }
                else
                    return new AirlineReservationResponse(temp.Message);
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
                if (temp.Success)
                {
                    await unitOfWork.CompleteAsync();
                    if(temp.Resource != null && temp.Resource.AirlineTickets != null && temp.Resource.AirlineTickets.Count > 0)
                    {
                        var temp2 = CalculatePrices(temp.Resource);
                        var temp3 = await reservationRepo.EditPrices(param.AirlineId, temp.Resource.Id, temp2);
                        if (temp3.Success)
                            await unitOfWork.CompleteAsync();
                        return temp3;
                    }
                    return temp;
                  
                }
                else
                    return new AirlineReservationResponse(temp.Message);
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
                {
                    await unitOfWork.CompleteAsync();
                    if (temp.Resource != null && temp.Resource.AirlineTickets != null && temp.Resource.AirlineTickets.Count > 0)
                    {
                        var temp2 = CalculatePrices(temp.Resource);
                        var temp3 = await reservationRepo.EditPrices(param.AirlineId, temp.Resource.Id, temp2);
                        if (temp3.Success)
                            await unitOfWork.CompleteAsync();
                        return temp3;
                    }
                    return temp;
                }
                else
                    return new AirlineReservationResponse(temp.Message);
            }
            catch (Exception e)
            {
                return new AirlineReservationResponse(e.Message);
            }
        }
        public ICollection<(int,double)> CalculatePrices(Reservation reservation)
        {
            var ret = new List<(int, double)>();
            double cost = 0;
            if(reservation.AirlineTickets.Count > 0)
            {
                var distanceDiscountPercentage = reservation.AirlineTickets.Count(i => i.TicketOwner != null && i.InvitedBy != null && i.TicketOwner != i.InvitedBy && i.IsApproved) * reservation.AirlineTickets.First().Flight.Distance / 300;
                foreach (var a in reservation.AirlineTickets)
                {
                    cost = a.Flight.Price;
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

                    if(distanceDiscountPercentage > 0)
                        cost = cost / 100.00 * (100 - distanceDiscountPercentage);

                    ret.Add((a.Id, cost));
                }
            }

            return ret;
          
        }

        public async Task<ICollection<Reservation>> GetReservationsAsync(string username)
        {
            return await reservationRepo.GetReservations(username);
        }
    }
}
