﻿// <auto-generated />
using System;
using BookingAppBackend.Database.Contex;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BookingAppBackend.Migrations
{
    [DbContext(typeof(BookingAppDbContext))]
    [Migration("20200824172046_latlng")]
    partial class latlng
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.Airline", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AddressId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Destinations")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.ToTable("Airlines");

                    b.HasData(
                        new
                        {
                            Id = 100,
                            Description = "Really good airline !!!!",
                            Destinations = "[]"
                        },
                        new
                        {
                            Id = 101,
                            Description = "Really good airline !!!!",
                            Destinations = "[]"
                        },
                        new
                        {
                            Id = 102,
                            Description = "Really good airline !!!!",
                            Destinations = "[]"
                        });
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.AirlineAddress", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Latitude")
                        .HasColumnType("float");

                    b.Property<double>("Longitude")
                        .HasColumnType("float");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StreetNo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ZipCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("AirlineAddress");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.AirlineRating", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AirlineId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<float>("Rate")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("AirlineId");

                    b.ToTable("AirlineRating");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.Airplane", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AirlineId")
                        .HasColumnType("int");

                    b.Property<int>("Columns")
                        .HasColumnType("int");

                    b.Property<int>("Rows")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AirlineId");

                    b.ToTable("Airplane");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.DisabledSeat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AirplaneId")
                        .HasColumnType("int");

                    b.Property<int>("Column")
                        .HasColumnType("int");

                    b.Property<int>("Row")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AirplaneId");

                    b.ToTable("DisabledSeat");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.FastFlight", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AirlineId")
                        .HasColumnType("int");

                    b.Property<DateTime>("BookingDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("Column")
                        .HasColumnType("int");

                    b.Property<double>("DiscountPercentage")
                        .HasColumnType("float");

                    b.Property<int?>("FlightId")
                        .HasColumnType("int");

                    b.Property<bool>("IsRated")
                        .HasColumnType("bit");

                    b.Property<double>("LoadWeight")
                        .HasColumnType("float");

                    b.Property<string>("PassportNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<int>("Row")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("AirlineId");

                    b.HasIndex("FlightId");

                    b.HasIndex("Username");

                    b.ToTable("FastFlight");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.FastFlightPaidExtra", b =>
                {
                    b.Property<int>("FastFlightId")
                        .HasColumnType("int");

                    b.Property<int>("PaidExtraId")
                        .HasColumnType("int");

                    b.HasKey("FastFlightId", "PaidExtraId");

                    b.HasIndex("PaidExtraId");

                    b.ToTable("FastFlightPaidExtras");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.Flight", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AirlineId")
                        .HasColumnType("int");

                    b.Property<int?>("AirplaneId")
                        .HasColumnType("int");

                    b.Property<double>("Distance")
                        .HasColumnType("float");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("EndDateBack")
                        .HasColumnType("datetime2");

                    b.Property<string>("EndLocation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FlightClass")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsRoundTrip")
                        .HasColumnType("bit");

                    b.Property<double>("LoadInCabin")
                        .HasColumnType("float");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("StartDateBack")
                        .HasColumnType("datetime2");

                    b.Property<string>("StartLocation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StopsLocations")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AirlineId");

                    b.HasIndex("AirplaneId");

                    b.ToTable("Flight");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.FlightRating", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<int?>("FlightId")
                        .HasColumnType("int");

                    b.Property<float>("Rate")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("FlightId");

                    b.ToTable("FlightRating");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.PaidExtras", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("FlightId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("FlightId");

                    b.ToTable("PaidExtras");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.RemovedSeat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AirplaneId")
                        .HasColumnType("int");

                    b.Property<int>("Column")
                        .HasColumnType("int");

                    b.Property<int>("Row")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AirplaneId");

                    b.ToTable("RemovedSeat");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AirlineId")
                        .HasColumnType("int");

                    b.Property<string>("SettingUserUsername")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("AirlineId");

                    b.HasIndex("SettingUserUsername");

                    b.ToTable("Reservation");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.Ticket", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AirlineId")
                        .HasColumnType("int");

                    b.Property<DateTime>("BookingDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("Column")
                        .HasColumnType("int");

                    b.Property<int>("FlightId")
                        .HasColumnType("int");

                    b.Property<string>("InvitedByUsername")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("IsApproved")
                        .HasColumnType("bit");

                    b.Property<bool>("IsRated")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("LoadWeight")
                        .HasColumnType("float");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("NumberOfPointsInvested")
                        .HasColumnType("float");

                    b.Property<string>("Passport")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<int?>("ReservationId")
                        .HasColumnType("int");

                    b.Property<int>("Row")
                        .HasColumnType("int");

                    b.Property<string>("TicketOwnerUsername")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("AirlineId");

                    b.HasIndex("InvitedByUsername");

                    b.HasIndex("ReservationId");

                    b.HasIndex("TicketOwnerUsername");

                    b.HasIndex("FlightId", "Row", "Column")
                        .IsUnique();

                    b.ToTable("Tickets");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.TicketPaidExtra", b =>
                {
                    b.Property<int>("TicketId")
                        .HasColumnType("int");

                    b.Property<int>("PaidExtraId")
                        .HasColumnType("int");

                    b.HasKey("TicketId", "PaidExtraId");

                    b.HasIndex("PaidExtraId");

                    b.ToTable("TicketPaidExtras");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.UserReservation", b =>
                {
                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("ReservationId")
                        .HasColumnType("int");

                    b.HasKey("Username", "ReservationId");

                    b.HasIndex("ReservationId");

                    b.ToTable("UserReservations");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.WeightPricing", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("FlightId")
                        .HasColumnType("int");

                    b.Property<float>("From")
                        .HasColumnType("real");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<float>("To")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("FlightId");

                    b.ToTable("WeightPricing");
                });

            modelBuilder.Entity("BookingAppBackend.Model.AuthentificationAndAuthorization.AuthentificationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("IsPasswordOk")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("BookingAppBackend.Model.AuthentificationAndAuthorization.AuthorizationRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Users.AirlineAdmin", b =>
                {
                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AirlineID")
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Username");

                    b.ToTable("AirlineAdmins");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Users.Friend", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FriendLastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FriendName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FriendUsername")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("Username");

                    b.ToTable("Friend");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Users.PendingRequest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("RequestSenderUsername")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SendingUserUsername")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("SendingUserUsername");

                    b.ToTable("PendingRequest");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Users.User", b =>
                {
                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Points")
                        .HasColumnType("float");

                    b.HasKey("Username");

                    b.ToTable("RegisteredUsers");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.Airline", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Airlines.AirlineAddress", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.AirlineRating", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Airlines.Airline", null)
                        .WithMany("Ratings")
                        .HasForeignKey("AirlineId");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.Airplane", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Airlines.Airline", null)
                        .WithMany("Airplanes")
                        .HasForeignKey("AirlineId");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.DisabledSeat", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Airlines.Airplane", null)
                        .WithMany("DisabledSeats")
                        .HasForeignKey("AirplaneId");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.FastFlight", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Airlines.Airline", "Airline")
                        .WithMany("FastFlights")
                        .HasForeignKey("AirlineId");

                    b.HasOne("BookingAppBackend.Model.Airlines.Flight", "Flight")
                        .WithMany()
                        .HasForeignKey("FlightId");

                    b.HasOne("BookingAppBackend.Model.Users.User", "User")
                        .WithMany("FastFlights")
                        .HasForeignKey("Username");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.FastFlightPaidExtra", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Airlines.FastFlight", "FastFlight")
                        .WithMany("PaidExtras")
                        .HasForeignKey("FastFlightId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookingAppBackend.Model.Airlines.PaidExtras", "PaidExtra")
                        .WithMany("FastFlights")
                        .HasForeignKey("PaidExtraId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.Flight", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Airlines.Airline", null)
                        .WithMany("Flights")
                        .HasForeignKey("AirlineId");

                    b.HasOne("BookingAppBackend.Model.Airlines.Airplane", "Airplane")
                        .WithMany()
                        .HasForeignKey("AirplaneId");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.FlightRating", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Airlines.Flight", null)
                        .WithMany("Ratings")
                        .HasForeignKey("FlightId");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.PaidExtras", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Airlines.Flight", null)
                        .WithMany("PaidExtras")
                        .HasForeignKey("FlightId");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.RemovedSeat", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Airlines.Airplane", null)
                        .WithMany("RemovedSeats")
                        .HasForeignKey("AirplaneId");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.Reservation", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Airlines.Airline", null)
                        .WithMany("Reservations")
                        .HasForeignKey("AirlineId");

                    b.HasOne("BookingAppBackend.Model.Users.User", "SettingUser")
                        .WithMany()
                        .HasForeignKey("SettingUserUsername");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.Ticket", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Airlines.Airline", "Airline")
                        .WithMany()
                        .HasForeignKey("AirlineId");

                    b.HasOne("BookingAppBackend.Model.Airlines.Flight", "Flight")
                        .WithMany()
                        .HasForeignKey("FlightId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookingAppBackend.Model.Users.User", "InvitedBy")
                        .WithMany()
                        .HasForeignKey("InvitedByUsername");

                    b.HasOne("BookingAppBackend.Model.Airlines.Reservation", null)
                        .WithMany("AirlineTickets")
                        .HasForeignKey("ReservationId");

                    b.HasOne("BookingAppBackend.Model.Users.User", "TicketOwner")
                        .WithMany()
                        .HasForeignKey("TicketOwnerUsername");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.TicketPaidExtra", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Airlines.PaidExtras", "PaidExtra")
                        .WithMany("Tickets")
                        .HasForeignKey("PaidExtraId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookingAppBackend.Model.Airlines.Ticket", "Ticket")
                        .WithMany("SelectedExtras")
                        .HasForeignKey("TicketId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.UserReservation", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Airlines.Reservation", "Reservation")
                        .WithMany("Users")
                        .HasForeignKey("ReservationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookingAppBackend.Model.Users.User", "User")
                        .WithMany("MyReservations")
                        .HasForeignKey("Username")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.WeightPricing", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Airlines.Flight", null)
                        .WithMany("WeightPricings")
                        .HasForeignKey("FlightId");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Users.Friend", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Users.User", null)
                        .WithMany("MyFriends")
                        .HasForeignKey("Username");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Users.PendingRequest", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Users.User", "SendingUser")
                        .WithMany("MyPendingRequests")
                        .HasForeignKey("SendingUserUsername")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("BookingAppBackend.Model.AuthentificationAndAuthorization.AuthorizationRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("BookingAppBackend.Model.AuthentificationAndAuthorization.AuthentificationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("BookingAppBackend.Model.AuthentificationAndAuthorization.AuthentificationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("BookingAppBackend.Model.AuthentificationAndAuthorization.AuthorizationRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookingAppBackend.Model.AuthentificationAndAuthorization.AuthentificationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("BookingAppBackend.Model.AuthentificationAndAuthorization.AuthentificationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
