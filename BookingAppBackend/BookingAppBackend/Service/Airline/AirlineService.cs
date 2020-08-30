using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.Airlines.Resources;
using BookingAppBackend.Model.Airlines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingAppBackend.Model.Responses;
using BookingAppBackend.Model.Airlines.Parameters;
using System.Net.Http;
using System.Web;
using System.Text.Json;
using BookingAppBackend.Model;

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
        public async Task<AirlineDataResource> GetData(int airlineId)
        {
            return await repo.GetData(airlineId);
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

        public async Task<IEnumerable<Model.Airlines.Airline>> GetAirlines(AirlineSearchParameters param)
        {

            var airlines = repo.GetAirlines();
            var temp = param;
            foreach (var a in airlines)
            {
                a.Flights = a.Flights.Where(i =>
                {
                    if (i.StartDate < temp.StartDate)
                        return false;
                    if (i.StartDate > temp.EndDate)
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
        }

        public async Task<BookingAppBackend.Model.Airlines.Airline> EditAirlineAsync(AirlineParameter airline)
        {
            if(airline.Address != null)
            {
                if(!string.IsNullOrWhiteSpace(airline.Address.City) && !string.IsNullOrWhiteSpace(airline.Address.Country) && !string.IsNullOrWhiteSpace(airline.Address.Street) && !string.IsNullOrWhiteSpace(airline.Address.ZipCode))
                {
                    HttpClient client = new HttpClient();
                    
                    var link = $"qq=city={HttpUtility.UrlEncode(airline.Address.City)};country={HttpUtility.UrlEncode(airline.Address.Country)};street={HttpUtility.UrlEncode(airline.Address.Street)};postalCode={HttpUtility.UrlEncode(airline.Address.ZipCode)};houseNumber={airline.Address.StreetNo}";

                    HttpResponseMessage response = await client.GetAsync("https://geocode.search.hereapi.com/v1/geocode?" + link + "&apiKey=_e_CFfK2-tpCb_Yn48j1u9lqkFVBhEOp2Uf2l_0owqE");
                    response.EnsureSuccessStatusCode();
                    var temp3 = await response.Content.ReadAsStringAsync();
                    var here = await JsonSerializer.DeserializeAsync<HEREMapsResponse>(await response.Content.ReadAsStreamAsync());
                    if (here != null && here.items != null && here.items.Count > 0)
                    {
                        foreach (var a in here.items)
                        {
                            if (a.position != null)
                            {
                                airline.Address.Latitude = a.position.lat;
                                airline.Address.Longitude = a.position.lng;
                            }
                        }


                    }
                    else
                    {
                        airline.Address.Latitude = 0;
                        airline.Address.Longitude = 0;
                    }

                }
                else
                {
                    airline.Address.Latitude = 0;
                    airline.Address.Longitude = 0;
                }
            }
            var ret = await repo.EditAirline(airline);
            await unitOfWork.CompleteAsync();
            return ret;
        }
    }
}
