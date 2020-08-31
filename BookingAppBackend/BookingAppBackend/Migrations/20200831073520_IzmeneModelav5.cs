using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class IzmeneModelav5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "RentACarAdmins");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "RentACarAdmins");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "RentACarAdmins",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "RentACarAdmins",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "RentACarAdmins");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "RentACarAdmins");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "RentACarAdmins",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "RentACarAdmins",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
