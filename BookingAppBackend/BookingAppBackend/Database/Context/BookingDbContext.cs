using BookingAppBackend.Database.Context;
using BookingAppBackend.Model.Airlines;
using BookingAppBackend.Model.AuthentificationAndAuthorization;
using BookingAppBackend.Model.Users;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Contex
{
    public class BookingAppDbContext : IdentityDbContext<AuthentificationUser, AuthorizationRole, string>
    {
        public DbSet<User> RegisteredUsers { get; set; }
        public DbSet<AirlineAdmin> AirlineAdmins { get; set; }
        public DbSet<Airline> Airlines { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketPaidExtra> TicketPaidExtras { get; set; }
        public DbSet<Reservation> Reservation { get; set; }
        public DbSet<FastFlightPaidExtra> FastFlightPaidExtras { get; set; }
        public DbSet<UserReservation> UserReservations { get; set; }

        public BookingAppDbContext(DbContextOptions options) : base(options) { }
 

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<User>().HasKey(i => i.Username);
            builder.Entity<User>().HasMany(i => i.Friends).WithOne().HasForeignKey("ParentId").IsRequired(false);
            builder.Entity<User>().HasMany(i => i.PendingRequests).WithOne().HasForeignKey("ParentId").IsRequired(false);

            builder.Entity<AirlineAdmin>().HasKey(i => i.Username);
            builder.Entity<Airline>().Property(i => i.Destinations).HasJsonConversion();

            builder.Entity<Airline>().HasData(
                new Airline { Id = 100, Description ="Really good airline !!!!"},
                new Airline { Id = 101, Description = "Really good airline !!!!" },
                new Airline { Id = 102, Description = "Really good airline !!!!" }
                );
            builder.Entity<Flight>().Property(i => i.FlightClass).HasConversion(new EnumToStringConverter<FlightClass>());
            builder.Entity<Flight>().Property(i => i.StopsLocations).HasJsonConversion();

            builder.Entity<TicketPaidExtra>().HasKey(i => new { i.TicketId, i.PaidExtraId });
            builder.Entity<TicketPaidExtra>().HasOne(i => i.Ticket).WithMany(i => i.SelectedExtras).HasForeignKey(i => i.TicketId);
            builder.Entity<TicketPaidExtra>().HasOne(i => i.PaidExtra).WithMany(i => i.Tickets).HasForeignKey(i => i.PaidExtraId);

            builder.Entity<FastFlightPaidExtra>().HasKey(i => new { i.FastFlightId, i.PaidExtraId });
            builder.Entity<FastFlightPaidExtra>().HasOne(i => i.FastFlight).WithMany(i => i.PaidExtras).HasForeignKey(i => i.FastFlightId);
            builder.Entity<FastFlightPaidExtra>().HasOne(i => i.PaidExtra).WithMany(i => i.FastFlights).HasForeignKey(i => i.PaidExtraId);


            builder.Entity<UserReservation>().HasKey(i => new { i.Username, i.ReservationId });
            builder.Entity<UserReservation>().HasOne(i => i.User).WithMany(i => i.MyReservations).HasForeignKey(i => i.Username);
            builder.Entity<UserReservation>().HasOne(i => i.Reservation).WithMany(i => i.Users).HasForeignKey(i => i.ReservationId);

        }
   
    }
}
