﻿using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Interfaces
{
    public interface IAirlineReservationRepository
    {
        Task<AirlineReservationResponse> Add(ICollection<TicketParameter> tickets);
        Task<AirlineReservationResponse> EditPrices(int airlineId, int reservationId, ICollection<(int, double)> prices);
    }
}
