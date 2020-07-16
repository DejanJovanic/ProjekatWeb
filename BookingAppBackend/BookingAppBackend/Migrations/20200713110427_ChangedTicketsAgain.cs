using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class ChangedTicketsAgain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FastFlightId",
                table: "PaidExtras",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FlightId",
                table: "PaidExtras",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "LoadInCabin",
                table: "Flight",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "DiscountPercentage",
                table: "FastFlight",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "LoadWeight",
                table: "FastFlight",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "FastFlight",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "WeightPricing",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    From = table.Column<float>(nullable: false),
                    To = table.Column<float>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    FlightId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeightPricing", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WeightPricing_Flight_FlightId",
                        column: x => x.FlightId,
                        principalTable: "Flight",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "5237144b-bec6-4ace-936d-53362cd416aa", "19bfa00a-180b-4209-96cf-41ff4092071c" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "88c914db-5dc5-4cc0-af49-8f602a1ec259", "1c3b6b52-bbd7-4196-b7f1-53a7a329f8d9" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "c6f0b173-2673-4635-95cc-24b7fe843704", "3bda1539-f3df-47ec-beb4-ca6b661f2fc8" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "c8917c77-5278-45d7-9518-6546257724bf", "32608050-4c15-4be0-80b0-3d4cb219a89e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "e014750f-f268-4359-a18b-443f5e1905d8", "fb12a249-b816-4770-975a-06e9ca15e492" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "ad32fe9c-807c-4aa4-9952-3f352c5e7871", "4a08ea4a-17eb-4e31-848b-1f74f15a4563" });

            migrationBuilder.CreateIndex(
                name: "IX_PaidExtras_FastFlightId",
                table: "PaidExtras",
                column: "FastFlightId");

            migrationBuilder.CreateIndex(
                name: "IX_PaidExtras_FlightId",
                table: "PaidExtras",
                column: "FlightId");

            migrationBuilder.CreateIndex(
                name: "IX_FastFlight_Username",
                table: "FastFlight",
                column: "Username");

            migrationBuilder.CreateIndex(
                name: "IX_WeightPricing_FlightId",
                table: "WeightPricing",
                column: "FlightId");

            migrationBuilder.AddForeignKey(
                name: "FK_FastFlight_RegisteredUsers_Username",
                table: "FastFlight",
                column: "Username",
                principalTable: "RegisteredUsers",
                principalColumn: "Username",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PaidExtras_FastFlight_FastFlightId",
                table: "PaidExtras",
                column: "FastFlightId",
                principalTable: "FastFlight",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PaidExtras_Flight_FlightId",
                table: "PaidExtras",
                column: "FlightId",
                principalTable: "Flight",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FastFlight_RegisteredUsers_Username",
                table: "FastFlight");

            migrationBuilder.DropForeignKey(
                name: "FK_PaidExtras_FastFlight_FastFlightId",
                table: "PaidExtras");

            migrationBuilder.DropForeignKey(
                name: "FK_PaidExtras_Flight_FlightId",
                table: "PaidExtras");

            migrationBuilder.DropTable(
                name: "WeightPricing");

            migrationBuilder.DropIndex(
                name: "IX_PaidExtras_FastFlightId",
                table: "PaidExtras");

            migrationBuilder.DropIndex(
                name: "IX_PaidExtras_FlightId",
                table: "PaidExtras");

            migrationBuilder.DropIndex(
                name: "IX_FastFlight_Username",
                table: "FastFlight");

            migrationBuilder.DropColumn(
                name: "FastFlightId",
                table: "PaidExtras");

            migrationBuilder.DropColumn(
                name: "FlightId",
                table: "PaidExtras");

            migrationBuilder.DropColumn(
                name: "LoadInCabin",
                table: "Flight");

            migrationBuilder.DropColumn(
                name: "DiscountPercentage",
                table: "FastFlight");

            migrationBuilder.DropColumn(
                name: "LoadWeight",
                table: "FastFlight");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "FastFlight");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "71376deb-b511-4f7e-ab40-88283891139b", "5f11b1bb-d444-45c3-8b3d-a071e28a2186" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "ce4d1764-8d18-4e8b-aaf5-f6c46c845915", "03d043dc-8987-413e-92ca-a62b4a35459a" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "5b6f8409-0cc5-4854-bf14-31cbb260b574", "b183b225-648f-4651-998d-d17ab74b2825" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "c7af672d-9559-4928-b264-b047d2df44bf", "50e59f8f-3afc-4251-a4db-c595d9d22dd9" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "83603ab6-e6b0-411d-ba55-a8e1cc6997f6", "63754bce-44c1-4c63-b2ae-bd4c2fdb6dfa" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "75db9f84-dd4b-4654-ab68-e48c92d09f2f", "9ce92655-9a3e-475e-8a8e-fca0b52d5ab8" });
        }
    }
}
