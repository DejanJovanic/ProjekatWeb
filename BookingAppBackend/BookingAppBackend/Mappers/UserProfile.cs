using AutoMapper;
using BookingAppBackend.Model.Airlines;
using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Model.Airlines.Resources;
using BookingAppBackend.Model.Users;

namespace BookingAppBackend.Mappers
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserResource>();
            CreateMap<AirlineAdmin, AirlineAdminResource>();
            CreateMap<RentACarAdmin, RentACarAdminResource>();
            CreateMap<Admin, AdminResource>();
            CreateMap<Airline, AirlineResource>();
            CreateMap<Flight, FlightResource>();
            CreateMap<DisabledSeat, Seat>();
            CreateMap<RemovedSeat, Seat>();
            CreateMap<Airplane, AirplaneUser>();
            CreateMap<Ticket, TicketParameter>()
                .ForMember(a => a.InvitedByUsername, b => b.MapFrom(c => c.InvitedBy != null ? c.InvitedBy.Username : null))
                .ForMember(a => a.TicketOwnerUsername, b => b.MapFrom(c => c.TicketOwner != null ? c.TicketOwner.Username : null))
                .ForMember(a => a.FlightId, b => b.MapFrom(c => c.Flight.Id))
                .ForMember(a => a.AirlineId, b => b.MapFrom(c => c.Airline.Id));
            CreateMap<FastFlightPaidExtra, PaidExtras>()
                .ForMember(a => a.Description, opt => opt.MapFrom(b => b.PaidExtra.Description))
                .ForMember(a => a.Id, opt => opt.MapFrom(b => b.PaidExtra.Id))
                .ForMember(a => a.Name, opt => opt.MapFrom(b => b.PaidExtra.Name))
                .ForMember(a => a.Price, opt => opt.MapFrom(b => b.PaidExtra.Price));
            CreateMap<FastFlight, FastFlightResource>();
        }
    }
}
