using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.Airlines;
using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.Seat
{
    public class SeatService : ISeatService
    {
        private IFlightRepository repo;
        private IAirlineRepository airlineRepository;
        private IUnitOfWork unitOfWork;

        public SeatService(IFlightRepository repo, IAirlineRepository airlineRepository, IUnitOfWork unitOfWork)
        {
            this.repo = repo;
            this.airlineRepository = airlineRepository;
            this.unitOfWork = unitOfWork;
        }

        public async Task<FlightResponse> AddSeats(int rowsTop, int rowsBottom, int columnsLeft, int columnsRight, int airlineId, int flightId)
        {
            try
            {
                await unitOfWork.StartTransaction(Database.Repository.TransactionType.Serializible);
                var temp = await repo.AddSeats(rowsTop, rowsBottom, columnsLeft, columnsRight, airlineId, flightId);
                await unitOfWork.CompleteAsync();

                if (temp.Success)
                {
                    await unitOfWork.Commit();
                }
                else
                {
                    await unitOfWork.Rollback();
                }
                await unitOfWork.EndTransaction();

                if (temp.Success)
                    await unitOfWork.CompleteAsync();
                return temp;
                

            }
            catch
            {
                return new FlightResponse("Something went wrong. Please, try again later.");
            }
        }
        public async Task<FlightResponse> DisableSeat(int row, int column, int airlineId, int flightId)
        {
            try
            {
                await unitOfWork.StartTransaction(Database.Repository.TransactionType.Serializible);
                var temp = await repo.DisableSeat(row, column, airlineId, flightId);
                await unitOfWork.CompleteAsync();

                if (temp.Success)
                {
                    await unitOfWork.Commit();
                }
                else
                {
                    await unitOfWork.Rollback();
                }
                await unitOfWork.EndTransaction();

                if (temp.Success)
                    await unitOfWork.CompleteAsync();
                return temp;


            }
            catch
            {
                return new FlightResponse("Something went wrong. Please, try again later.");
            }
        }

        public async Task<FlightResponse> EnableSeat(int row, int column, int airlineId, int flightId)
        {
            try
            {
                await unitOfWork.StartTransaction(Database.Repository.TransactionType.Serializible);
                var temp = await repo.EnableSeat(row, column, airlineId, flightId);
                await unitOfWork.CompleteAsync();

                if (temp.Success)
                {
                    await unitOfWork.Commit();
                }
                else
                {
                    await unitOfWork.Rollback();
                }
                await unitOfWork.EndTransaction();
             
                if (temp.Success)
                    await unitOfWork.CompleteAsync();
                return temp;

            }
            catch
            {
                return new FlightResponse("Something went wrong. Please, try again later.");
            }
        }

        public async Task<FlightResponse> RemoveSeat(int row, int column, int airlineId, int flightId)
        {
            try
            {
                await unitOfWork.StartTransaction(Database.Repository.TransactionType.Serializible);
                var temp = await repo.RemoveSeat(row, column, airlineId, flightId);
                await unitOfWork.CompleteAsync();

                if (temp.Success)
                {
                    await unitOfWork.Commit();
                }
                else
                {
                    await unitOfWork.Rollback(); 
                }
                await unitOfWork.EndTransaction();
                   
                return temp;

            }
            catch
            {
                return new FlightResponse("Something went wrong. Please, try again later.");
            }
        }

        public async Task<AirplaneUserResponse> GetSeats(int flightId)
        {
            var temp = await airlineRepository.GetAirlineWithFlight(flightId);
            if (temp != null)
            {
                var flight = temp.Flights.FirstOrDefault(i => i.Id == flightId);
                var ret = new AirplaneUser();
                if (flight != null)
                {
                    ret.Columns = flight.Airplane.Columns;
                    ret.Rows = flight.Airplane.Rows;
                    ret.RemovedSeats = new List<Model.Airlines.Seat>();
                    foreach (var a in flight.Airplane.RemovedSeats)
                    {
                        ret.RemovedSeats.Add(new Model.Airlines.Seat { Column = a.Column, Row = a.Row });
                    }
                    ret.DisabledSeats = new List<Model.Airlines.Seat>();
                    foreach (var a in flight.Airplane.DisabledSeats)
                    {
                        ret.DisabledSeats.Add(new Model.Airlines.Seat { Column = a.Column, Row = a.Row });
                    }
                    ret.TakenSeats = new List<Model.Airlines.Seat>();

                    foreach (var a in temp.Tickets)
                    {
                        if (a.Flight.Id == flight.Id)
                        {
                            ret.TakenSeats.Add(new Model.Airlines.Seat { Column = a.Column, Row = a.Row });
                        }
                    }
                
                    
                  
                    ret.SpecialSeats = new List<Model.Airlines.Seat>();
                    foreach(var a in temp.FastFlights.Where(i => i.Flight.Id == flightId))
                    {
                        ret.SpecialSeats.Add(new Model.Airlines.Seat { Column = a.Column, Row = a.Row });
                    }

                    return new AirplaneUserResponse(ret);
                }
                else
                {
                    return new AirplaneUserResponse("Flight with given id does not exist.");
                }
            }
            else
            {
                return new AirplaneUserResponse("Flight with given id does not exist.");
            }
        }
    }
}
