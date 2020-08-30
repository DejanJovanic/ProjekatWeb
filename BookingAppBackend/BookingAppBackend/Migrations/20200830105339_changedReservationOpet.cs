using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class changedReservationOpet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_Airlines_AirlineId",
                table: "Reservation");

            migrationBuilder.DropIndex(
                name: "IX_Reservation_AirlineId",
                table: "Reservation");

            migrationBuilder.DropColumn(
                name: "AirlineId",
                table: "Reservation");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AirlineId",
                table: "Reservation",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_AirlineId",
                table: "Reservation",
                column: "AirlineId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_Airlines_AirlineId",
                table: "Reservation",
                column: "AirlineId",
                principalTable: "Airlines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
