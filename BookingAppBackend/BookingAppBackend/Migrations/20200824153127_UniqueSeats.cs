using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class UniqueSeats : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Flight_FlightId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_FlightId",
                table: "Tickets");

            migrationBuilder.AlterColumn<int>(
                name: "FlightId",
                table: "Tickets",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_FlightId_Row_Column",
                table: "Tickets",
                columns: new[] { "FlightId", "Row", "Column" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Flight_FlightId",
                table: "Tickets",
                column: "FlightId",
                principalTable: "Flight",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Flight_FlightId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_FlightId_Row_Column",
                table: "Tickets");

            migrationBuilder.AlterColumn<int>(
                name: "FlightId",
                table: "Tickets",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_FlightId",
                table: "Tickets",
                column: "FlightId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Flight_FlightId",
                table: "Tickets",
                column: "FlightId",
                principalTable: "Flight",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
