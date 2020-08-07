using BookingAppBackend.Database.Contex;
using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.Airlines;
using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Repository
{
    public class FastFlightRepository : Repository, IFastFlightRepository
    {
        IAirlineRepository airlineRepo;
        IFlightRepository flightRepo;
        IUserRepository userRepo;
        public FastFlightRepository(IAirlineRepository airlineRepo, IFlightRepository flightRepo, IUserRepository userRepo, BookingAppDbContext context) : base(context)
        {
            this.airlineRepo = airlineRepo;
            this.flightRepo = flightRepo;
            this.userRepo = userRepo;
        }

        public async Task<FastFlightResponse> Add(int airlineId,int flightId,int row,int column, double discountPercentage)
        {
            var airline = await airlineRepo.GetAirline(airlineId);

            if (airline != null)
            {
                foreach(var flight in airline.Flights)
                {
                    if(flight.Id == flightId)
                    {
                        if (!flightRepo.IsSeatOkForChange(row, column, airline, flight, true, true))
                        {
                            var fastFlight = new FastFlight();
                            fastFlight.Flight = flight;
                            fastFlight.DiscountPercentage = discountPercentage;
                            fastFlight.Column = column;
                            fastFlight.Row = row;
                            fastFlight.Airline = airline;
                            airline.FastFlights.Add(fastFlight);
                            return new FastFlightResponse(fastFlight);
                        }
                        return new FastFlightResponse("Seat is not available.");
                    }
                }
                return new FastFlightResponse("Flight with given id does not exist.");
            }
            else
                return new FastFlightResponse("Airline with given id does not exist.");
        }

        public async Task<IEnumerable<FastFlight>> Get(int airlineId)
        {
            var airline = await airlineRepo.GetAirline(airlineId);
            if(airline != null)
            {
                return airline.FastFlights;
            }
            return null;
        }

        public async Task<FastFlight> Get(int airlineId,int fastFlightId)
        {
            var airline = await airlineRepo.GetAirline(airlineId);
            if (airline != null)
            {
                foreach(var a in airline.FastFlights)
                {
                    if (a.Id == fastFlightId)
                        return a;
                }
            }
            return null;
        }

        public async Task<IEnumerable<FastFlight>> Get(string username)
        {
            var user = await userRepo.GetUserWithFastFlightsAsync(username);
            if (user != null)
            {
                return user.FastFlights;
            }
            return null;
        }
        public async Task<FastFlightResponse> Cancel(int airlineId,int fastFlightId,string username)
        {
            var airline = await airlineRepo.GetAirline(airlineId);
            if (airline != null)
            {
                foreach (var a in airline.FastFlights)
                {
                    if (a.Id == fastFlightId)
                    {
                        var user = await userRepo.GetUserWithFastFlightsAsync(username);
                        if (user != null)
                        {
                            if (a.User == null)
                                return new FastFlightResponse("Seat isn't reserved");
                            if (a.User.Username.ToLower() != username.ToLower())
                                return new FastFlightResponse("This user hasn't reserved this flight.");
                            a.User.Points -= a.Flight.Distance / 200 * 10;
                            a.User = null;
                            user.FastFlights.Remove(a);
                            a.BookingDate = new DateTime();
                            a.PassportNumber = null;
                            var temp = new List<FastFlightPaidExtra>();
                            foreach (var b in a.PaidExtras)
                            {
                                b.PaidExtra.FastFlights.Remove(b);
                                temp.Add(b);
                            }
                            foreach(var b in temp)
                            {
                                a.PaidExtras.Remove(b);
                                context.FastFlightPaidExtras.Remove(b);
                            }
                            a.LoadWeight = 0;
                            a.Price = 0;
                            return new FastFlightResponse(a);
                        }
                        else
                            return new FastFlightResponse("User with given username does not exist.");
                    }
                }
                return new FastFlightResponse("Fast flight with given id does not exist");
            }
            else
                return new FastFlightResponse("Airline with given id does not exist.");
        }
        public async Task<FastFlightResponse> Set(int airlineId, int fastFlightId,string username,ICollection<int> paidExtras,double loadWeight,string passportNum)
        {
            var airline = await airlineRepo.GetAirline(airlineId);
            if (airline != null)
            {
                foreach(var a in airline.FastFlights)
                {
                    if(a.Id == fastFlightId)
                    {
                        var user = await userRepo.GetUserWithFastFlightsAsync(username);
                        if (user != null)
                        {
                            if (a.User != null)
                                return new FastFlightResponse("Seat is already taken");

                            a.User = user;
                            user.FastFlights.Add(a);
                            a.BookingDate = DateTime.Now;
                            a.PassportNumber = passportNum;
                            a.LoadWeight = loadWeight;
                            foreach (var b in a.Flight.PaidExtras)
                            {
                                if (paidExtras.Contains(b.Id))
                                {
                                    var extra = new FastFlightPaidExtra();
                                    extra.FastFlight = a;
                                    extra.PaidExtra = b;
                                    b.FastFlights.Add(extra);
                                    a.PaidExtras.Add(extra);
                               
                                }
                            }
                            a.Price = a.Flight.Price;
                            foreach (var b in a.PaidExtras)
                                a.Price += b.PaidExtra.Price;

                            foreach (var b in a.Flight.WeightPricings)
                            {
                                if (b.From <= a.LoadWeight && b.To >= a.LoadWeight)
                                {
                                    a.Price += a.LoadWeight * b.Price;
                                    break;
                                }
                            }
                            a.Price -= (a.Price / 100) * a.DiscountPercentage;
                       
                            return new FastFlightResponse(a);
                        }
                        else
                            return new FastFlightResponse("User with given username does not exist.");
                    }
                }
                return new FastFlightResponse("Fast flight with given id does not exist");
            }
            else
                return new FastFlightResponse("Airline with given id does not exist.");
        }
    }
}
