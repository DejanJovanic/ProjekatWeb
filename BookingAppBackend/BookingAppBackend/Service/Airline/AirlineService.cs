using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.Airlines.Resources;
using BookingAppBackend.Model.Airlines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingAppBackend.Model.Responses;
using BookingAppBackend.Model.Airlines.Parameters;

namespace BookingAppBackend.Service.Airline
{
    public class AirlineService : IAirlineService
    {
        IAirlineRepository repo;
        IAirlineAdminRepository adminRepo;
        IUnitOfWork unitOfWork;

        public AirlineService(IAirlineRepository repo, IAirlineAdminRepository adminRepo, IUnitOfWork unitOfWork)
        {
            this.repo = repo;
            this.adminRepo = adminRepo;
            this.unitOfWork = unitOfWork;
        }

        public async Task<BookingAppBackend.Model.Airlines.Airline> GetAirline(int id)
        {
            return await repo.GetAirline(id);
        }

        public async Task<AirlineAdminResponse> CheckAdmin(string username, int id)
        {
            var temp = await adminRepo.GetAirlineAdminAsync(username);
            if (temp != null)
            {
                if (temp.AirlineID != id)
                    return new AirlineAdminResponse("Given admin is not admin for company with id " + id);
                else
                    return new AirlineAdminResponse(temp);
            }
            else
                return new AirlineAdminResponse("Admin with given name does not exist.");
        }

        public async Task<IEnumerable<BookingAppBackend.Model.Airlines.Airline>> GetAirlines(AirlineSearchParameters param)
        {
            return await new Task<IEnumerable<BookingAppBackend.Model.Airlines.Airline>>(b =>
            {
                var airlines = repo.GetAirlines();
                var temp = (AirlineSearchParameters)b;
                foreach (var a in airlines)
                {
                    a.Flights = a.Flights.Where(i =>
                    {
                        if (i.StartDate < temp.StartDate)
                            return false;
                        if (i.EndDate > temp.EndDate)
                            return false;
                        if (i.StartLocation.ToLower() != temp.StartLocation.ToLower())
                            return false;
                        if (i.EndLocation.ToLower() != temp.EndLocation.ToLower())
                            return false;
                        if (i.IsRoundTrip != temp.IsRoundTrip)
                            return false;
                        if (temp.MultiCity && i.StopsLocations.Count == 0)
                            return false;
                        if (i.FlightClass != (FlightClass)Enum.Parse(typeof(FlightClass), temp.FlightClass))
                            return false;
                        return true;
                    }).ToList();
                }
                return airlines.Where(i => i.Flights.Count() > 0);
            }, param);
            
        }

        public async Task<BookingAppBackend.Model.Airlines.Airline> EditAirlineAsync(AirlineParameter airline)
        {
            var ret = await repo.EditAirline(airline);
            await unitOfWork.CompleteAsync();
            return ret;
        }
    }
}
