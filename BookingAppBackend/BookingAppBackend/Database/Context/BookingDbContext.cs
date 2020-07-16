﻿using BookingAppBackend.Database.Context;
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
    public class BookingAppDbContext : IdentityDbContext<AuthentificationUser,AuthorizationRole,string>
    {
        public DbSet<User> RegisteredUsers { get; set; }
        public DbSet<AirlineAdmin> AirlineAdmins { get; set; }
        public DbSet<Airline> Airlines { get; set; }
        public BookingAppDbContext(DbContextOptions options) : base(options) { }
 

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<User>().HasKey(i => i.Username);
            builder.Entity<User>().HasMany(i => i.Friends).WithOne().HasForeignKey("ParentId").IsRequired(false);
            builder.Entity<User>().HasMany(i => i.PendingRequests).WithOne().HasForeignKey("ParentId").IsRequired(false);

            builder.Entity<User>().HasData(
                new User { Name = "User0", LastName = "User0", Username = "user0", Password = "user0", Role = "User" },
                new User { Name = "User1", LastName = "User1", Username = "user1", Password = "user1", Role = "User" },
                new User { Name = "User2", LastName = "User2", Username = "user2", Password = "user2", Role = "User" }
                );
            builder.Entity<AirlineAdmin>().HasKey(i => i.Username);
            builder.Entity<AirlineAdmin>().HasData(
                new AirlineAdmin { AirlineID = 100, Name = "AirlineAdmin0", LastName = "AirlineAdmin0", Username = "airlineadmin0", Password = "airlineadmin0", Role = "AirlineAdmin" },
                new AirlineAdmin { AirlineID = 101, Name = "AirlineAdmin1", LastName = "AirlineAdmin1", Username = "airlineadmin1", Password = "airlineadmin1", Role = "AirlineAdmin" },
                new AirlineAdmin { AirlineID = 102, Name = "AirlineAdmin2", LastName = "AirlineAdmin2", Username = "airlineadmin2", Password = "airlineadmin2", Role = "AirlineAdmin" }
                );
            builder.Entity<AuthentificationUser>().HasData(
                new AuthentificationUser { Id = "0",NormalizedUserName="User0", UserName = "user0", Password = "user0", Role = "User" },
                new AuthentificationUser { Id = "1", NormalizedUserName = "User1", UserName = "user1", Password = "user1", Role = "User" },
                new AuthentificationUser { Id = "2", NormalizedUserName = "User2", UserName = "user2", Password = "user2", Role = "User" },
                new AuthentificationUser { Id = "3", NormalizedUserName = "AirlineAdmin0", UserName = "airlineAdmin0", Password = "airlineAdmin0", Role = "AirlineAdmin" },
                new AuthentificationUser { Id = "4", NormalizedUserName = "AirlineAdmin1", UserName = "airlineAdmin1", Password = "airlineAdmin1", Role = "AirlineAdmin" },
                new AuthentificationUser { Id = "5", NormalizedUserName = "AirlineAdmin2", UserName = "airlineAdmin2", Password = "airlineAdmin2", Role = "AirlineAdmin" }
                );

            builder.Entity<Airline>().Property(i => i.Destinations).HasJsonConversion();

            builder.Entity<Airline>().HasData(
                new Airline { Id = 100, Description ="Really good airline !!!!"},
                new Airline { Id = 101, Description = "Really good airline !!!!" },
                new Airline { Id = 102, Description = "Really good airline !!!!" }
                );
            builder.Entity<Flight>().Property(i => i.FlightClass).HasConversion(new EnumToStringConverter<FlightClass>());
            builder.Entity<Flight>().Property(i => i.StopsLocations).HasJsonConversion();
        }
   
    }
}
