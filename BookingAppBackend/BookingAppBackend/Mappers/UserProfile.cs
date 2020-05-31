using AutoMapper;
using BookingAppBackend.Model.Airlines;
using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Model.Airlines.Resources;
using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Mappers
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserResource>();
            CreateMap<AirlineAdmin, AirlineAdminResource>();
            CreateMap<Airline, AirlineResource>();
            CreateMap<Flight, FlightResource>();
        }
    }
}
