using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class IzmenjeniModeli2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Cars_SelectedCarId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Enterprises_SelectedEnterpriseId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_SelectedCarId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_SelectedEnterpriseId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "SelectedCarId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "SelectedEnterpriseId",
                table: "Reservations");

            migrationBuilder.AddColumn<int>(
                name: "CarId",
                table: "Reservations",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_CarId",
                table: "Reservations",
                column: "CarId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Cars_CarId",
                table: "Reservations",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Cars_CarId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_CarId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "CarId",
                table: "Reservations");

            migrationBuilder.AddColumn<int>(
                name: "SelectedCarId",
                table: "Reservations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SelectedEnterpriseId",
                table: "Reservations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_SelectedCarId",
                table: "Reservations",
                column: "SelectedCarId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_SelectedEnterpriseId",
                table: "Reservations",
                column: "SelectedEnterpriseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Cars_SelectedCarId",
                table: "Reservations",
                column: "SelectedCarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Enterprises_SelectedEnterpriseId",
                table: "Reservations",
                column: "SelectedEnterpriseId",
                principalTable: "Enterprises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
