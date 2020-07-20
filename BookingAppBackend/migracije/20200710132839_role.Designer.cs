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
    [Migration("20200710132839_role")]
    partial class role
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.4")
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

                    b.Property<int>("Latitude")
                        .HasColumnType("int");

                    b.Property<int>("Longitude")
                        .HasColumnType("int");

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

                    b.Property<int>("Column")
                        .HasColumnType("int");

                    b.Property<int?>("FlightId")
                        .HasColumnType("int");

                    b.Property<int>("Row")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AirlineId");

                    b.HasIndex("FlightId");

                    b.ToTable("FastFlight");
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

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.Ticket", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AirlineId")
                        .HasColumnType("int");

                    b.Property<int>("Column")
                        .HasColumnType("int");

                    b.Property<int?>("FlightId")
                        .HasColumnType("int");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<int>("Row")
                        .HasColumnType("int");

                    b.Property<string>("TicketOwnerUsername")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("AirlineId");

                    b.HasIndex("FlightId");

                    b.HasIndex("TicketOwnerUsername");

                    b.ToTable("Ticket");
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

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

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

                    b.HasData(
                        new
                        {
                            Id = "0",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "8dfe3017-ef32-4ac8-be77-67075dfad90e",
                            EmailConfirmed = false,
                            LockoutEnabled = false,
                            NormalizedUserName = "User0",
                            Password = "user0",
                            PhoneNumberConfirmed = false,
                            Role = "User",
                            SecurityStamp = "7991475c-9195-44c5-b818-07d96d59a570",
                            TwoFactorEnabled = false,
                            UserName = "user0"
                        },
                        new
                        {
                            Id = "1",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "7fd63cab-1f1f-4a24-a3d6-0688d3012243",
                            EmailConfirmed = false,
                            LockoutEnabled = false,
                            NormalizedUserName = "User1",
                            Password = "user1",
                            PhoneNumberConfirmed = false,
                            Role = "User",
                            SecurityStamp = "f0c45a07-0638-44bc-8700-ae091d5c387e",
                            TwoFactorEnabled = false,
                            UserName = "user1"
                        },
                        new
                        {
                            Id = "2",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "a7f40241-d6c4-42c2-bbaa-f4535e669bf3",
                            EmailConfirmed = false,
                            LockoutEnabled = false,
                            NormalizedUserName = "User2",
                            Password = "user2",
                            PhoneNumberConfirmed = false,
                            Role = "User",
                            SecurityStamp = "d144b1db-b5ae-428b-9c4c-de52632f9d2e",
                            TwoFactorEnabled = false,
                            UserName = "user2"
                        },
                        new
                        {
                            Id = "3",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "b6addc2a-fb34-4ed2-bb02-36e6f9d291fd",
                            EmailConfirmed = false,
                            LockoutEnabled = false,
                            NormalizedUserName = "AirlineAdmin0",
                            Password = "airlineAdmin0",
                            PhoneNumberConfirmed = false,
                            Role = "AirlineAdmin",
                            SecurityStamp = "2f38cf54-3440-42d9-94ef-031c6bc9f389",
                            TwoFactorEnabled = false,
                            UserName = "airlineAdmin0"
                        },
                        new
                        {
                            Id = "4",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "be72b3c6-3fb3-4f4f-86ea-d48db16f008c",
                            EmailConfirmed = false,
                            LockoutEnabled = false,
                            NormalizedUserName = "AirlineAdmin1",
                            Password = "airlineAdmin1",
                            PhoneNumberConfirmed = false,
                            Role = "AirlineAdmin",
                            SecurityStamp = "13bcf19c-e940-4bbd-84f3-3c9e2d6c34ed",
                            TwoFactorEnabled = false,
                            UserName = "airlineAdmin1"
                        },
                        new
                        {
                            Id = "5",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "469dbfdc-908e-4699-aef8-fa286eced9f5",
                            EmailConfirmed = false,
                            LockoutEnabled = false,
                            NormalizedUserName = "AirlineAdmin2",
                            Password = "airlineAdmin2",
                            PhoneNumberConfirmed = false,
                            Role = "AirlineAdmin",
                            SecurityStamp = "1fa7a03c-4fb6-4eaa-b50b-87f687d5b51b",
                            TwoFactorEnabled = false,
                            UserName = "airlineAdmin2"
                        });
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

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Username");

                    b.ToTable("AirlineAdmins");

                    b.HasData(
                        new
                        {
                            Username = "airlineadmin0",
                            AirlineID = 100,
                            LastName = "AirlineAdmin0",
                            Name = "AirlineAdmin0",
                            Password = "airlineadmin0",
                            Role = "AirlineAdmin"
                        },
                        new
                        {
                            Username = "airlineadmin1",
                            AirlineID = 101,
                            LastName = "AirlineAdmin1",
                            Name = "AirlineAdmin1",
                            Password = "airlineadmin1",
                            Role = "AirlineAdmin"
                        },
                        new
                        {
                            Username = "airlineadmin2",
                            AirlineID = 102,
                            LastName = "AirlineAdmin2",
                            Name = "AirlineAdmin2",
                            Password = "airlineadmin2",
                            Role = "AirlineAdmin"
                        });
                });

            modelBuilder.Entity("BookingAppBackend.Model.Users.User", b =>
                {
                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ParentId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Passport")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username1")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Username");

                    b.HasIndex("ParentId");

                    b.HasIndex("Username1");

                    b.ToTable("RegisteredUsers");

                    b.HasData(
                        new
                        {
                            Username = "user0",
                            LastName = "User0",
                            Name = "User0",
                            Password = "user0",
                            Role = "User"
                        },
                        new
                        {
                            Username = "user1",
                            LastName = "User1",
                            Name = "User1",
                            Password = "user1",
                            Role = "User"
                        },
                        new
                        {
                            Username = "user2",
                            LastName = "User2",
                            Name = "User2",
                            Password = "user2",
                            Role = "User"
                        });
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
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

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
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

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
                    b.HasOne("BookingAppBackend.Model.Airlines.Airline", null)
                        .WithMany("FastFlights")
                        .HasForeignKey("AirlineId");

                    b.HasOne("BookingAppBackend.Model.Airlines.Flight", "Flight")
                        .WithMany()
                        .HasForeignKey("FlightId");
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

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.RemovedSeat", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Airlines.Airplane", null)
                        .WithMany("RemovedSeats")
                        .HasForeignKey("AirplaneId");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Airlines.Ticket", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Airlines.Airline", null)
                        .WithMany("Tickets")
                        .HasForeignKey("AirlineId");

                    b.HasOne("BookingAppBackend.Model.Airlines.Flight", "Flight")
                        .WithMany()
                        .HasForeignKey("FlightId");

                    b.HasOne("BookingAppBackend.Model.Users.User", "TicketOwner")
                        .WithMany()
                        .HasForeignKey("TicketOwnerUsername");
                });

            modelBuilder.Entity("BookingAppBackend.Model.Users.User", b =>
                {
                    b.HasOne("BookingAppBackend.Model.Users.User", null)
                        .WithMany("PendingRequests")
                        .HasForeignKey("ParentId");

                    b.HasOne("BookingAppBackend.Model.Users.User", null)
                        .WithMany("Friends")
                        .HasForeignKey("Username1");
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