using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class changedticket : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApprovedCostReductionPercentage",
                table: "Reservation");

            migrationBuilder.AddColumn<int>(
                name: "AirlineId",
                table: "Tickets",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "BookingDate",
                table: "Tickets",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsRated",
                table: "Tickets",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "BookingDate",
                table: "FastFlight",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsRated",
                table: "FastFlight",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "FlightRating",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rate = table.Column<float>(nullable: false),
                    DateTime = table.Column<DateTime>(nullable: false),
                    FlightId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightRating", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FlightRating_Flight_FlightId",
                        column: x => x.FlightId,
                        principalTable: "Flight",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserReservations",
                columns: table => new
                {
                    Username = table.Column<string>(nullable: false),
                    ReservationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserReservations", x => new { x.Username, x.ReservationId });
                    table.ForeignKey(
                        name: "FK_UserReservations_Reservation_ReservationId",
                        column: x => x.ReservationId,
                        principalTable: "Reservation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserReservations_RegisteredUsers_Username",
                        column: x => x.Username,
                        principalTable: "RegisteredUsers",
                        principalColumn: "Username",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_AirlineId",
                table: "Tickets",
                column: "AirlineId");

            migrationBuilder.CreateIndex(
                name: "IX_FlightRating_FlightId",
                table: "FlightRating",
                column: "FlightId");

            migrationBuilder.CreateIndex(
                name: "IX_UserReservations_ReservationId",
                table: "UserReservations",
                column: "ReservationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Airlines_AirlineId",
                table: "Tickets",
                column: "AirlineId",
                principalTable: "Airlines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Airlines_AirlineId",
                table: "Tickets");

            migrationBuilder.DropTable(
                name: "FlightRating");

            migrationBuilder.DropTable(
                name: "UserReservations");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_AirlineId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "AirlineId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "BookingDate",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "IsRated",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "BookingDate",
                table: "FastFlight");

            migrationBuilder.DropColumn(
                name: "IsRated",
                table: "FastFlight");

            migrationBuilder.AddColumn<double>(
                name: "ApprovedCostReductionPercentage",
                table: "Reservation",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
