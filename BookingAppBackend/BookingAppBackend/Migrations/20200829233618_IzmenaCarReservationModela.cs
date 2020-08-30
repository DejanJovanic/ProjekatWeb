using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class IzmenaCarReservationModela : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RealizedPackageId",
                table: "Reservations",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_RealizedPackageId",
                table: "Reservations",
                column: "RealizedPackageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_SpecialOffers_RealizedPackageId",
                table: "Reservations",
                column: "RealizedPackageId",
                principalTable: "SpecialOffers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_SpecialOffers_RealizedPackageId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_RealizedPackageId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "RealizedPackageId",
                table: "Reservations");
        }
    }
}
