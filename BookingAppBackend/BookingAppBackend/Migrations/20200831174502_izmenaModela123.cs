using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class izmenaModela123 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    Username = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.Username);
                });

            migrationBuilder.CreateTable(
                name: "DiscountsBasedOnPoints",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Discount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiscountsBasedOnPoints", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserCarReservation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SelectedCarId = table.Column<int>(nullable: false),
                    SelectedEnterpriseId = table.Column<int>(nullable: false),
                    RentedDay = table.Column<DateTime>(nullable: false),
                    NumberOfDays = table.Column<int>(nullable: false),
                    DateFrom = table.Column<DateTime>(nullable: false),
                    DateTo = table.Column<DateTime>(nullable: false),
                    Price = table.Column<int>(nullable: false),
                    RealizedPackageId = table.Column<int>(nullable: false),
                    IsRated = table.Column<bool>(nullable: false),
                    Username = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCarReservation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserCarReservation_SpecialOffers_RealizedPackageId",
                        column: x => x.RealizedPackageId,
                        principalTable: "SpecialOffers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserCarReservation_Cars_SelectedCarId",
                        column: x => x.SelectedCarId,
                        principalTable: "Cars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserCarReservation_Enterprises_SelectedEnterpriseId",
                        column: x => x.SelectedEnterpriseId,
                        principalTable: "Enterprises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserCarReservation_RegisteredUsers_Username",
                        column: x => x.Username,
                        principalTable: "RegisteredUsers",
                        principalColumn: "Username",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserCarReservation_RealizedPackageId",
                table: "UserCarReservation",
                column: "RealizedPackageId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCarReservation_SelectedCarId",
                table: "UserCarReservation",
                column: "SelectedCarId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCarReservation_SelectedEnterpriseId",
                table: "UserCarReservation",
                column: "SelectedEnterpriseId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCarReservation_Username",
                table: "UserCarReservation",
                column: "Username");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "DiscountsBasedOnPoints");

            migrationBuilder.DropTable(
                name: "UserCarReservation");
        }
    }
}
