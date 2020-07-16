using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class Airline : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "AirlineID",
                table: "AirlineAdmins",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "AirlineAddress",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Street = table.Column<string>(nullable: true),
                    StreetNo = table.Column<string>(nullable: true),
                    ZipCode = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    Latitude = table.Column<int>(nullable: false),
                    Longitude = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AirlineAddress", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Airlines",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AddressId = table.Column<int>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Destinations = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Airlines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Airlines_AirlineAddress_AddressId",
                        column: x => x.AddressId,
                        principalTable: "AirlineAddress",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Airplane",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    EconomyRows = table.Column<int>(nullable: false),
                    EconomyCols = table.Column<int>(nullable: false),
                    FirstRows = table.Column<int>(nullable: false),
                    FirstCols = table.Column<int>(nullable: false),
                    BusinessRows = table.Column<int>(nullable: false),
                    BusinessCols = table.Column<int>(nullable: false),
                    AirlineId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Airplane", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Airplane_Airlines_AirlineId",
                        column: x => x.AirlineId,
                        principalTable: "Airlines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DisabledSeat",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Row = table.Column<int>(nullable: false),
                    Column = table.Column<int>(nullable: false),
                    DisabledFirstId = table.Column<int>(nullable: true),
                    DisabledBusinessId = table.Column<int>(nullable: true),
                    DisabledEconomyId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DisabledSeat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DisabledSeat_Airplane_DisabledBusinessId",
                        column: x => x.DisabledBusinessId,
                        principalTable: "Airplane",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DisabledSeat_Airplane_DisabledEconomyId",
                        column: x => x.DisabledEconomyId,
                        principalTable: "Airplane",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DisabledSeat_Airplane_DisabledFirstId",
                        column: x => x.DisabledFirstId,
                        principalTable: "Airplane",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Flight",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    StartDateBack = table.Column<DateTime>(nullable: false),
                    EndDateBack = table.Column<DateTime>(nullable: false),
                    StartLocation = table.Column<string>(nullable: true),
                    EndLocation = table.Column<string>(nullable: true),
                    FlightDuration = table.Column<TimeSpan>(nullable: false),
                    NumberOfStops = table.Column<int>(nullable: false),
                    StopsLocations = table.Column<string>(nullable: true),
                    Price = table.Column<double>(nullable: false),
                    AirplaneId = table.Column<int>(nullable: true),
                    IsRoundTrip = table.Column<bool>(nullable: false),
                    FlightClass = table.Column<string>(nullable: false),
                    AirlineId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flight", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Flight_Airlines_AirlineId",
                        column: x => x.AirlineId,
                        principalTable: "Airlines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Flight_Airplane_AirplaneId",
                        column: x => x.AirplaneId,
                        principalTable: "Airplane",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RemovedSeat",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Row = table.Column<int>(nullable: false),
                    Column = table.Column<int>(nullable: false),
                    RemovedFirstId = table.Column<int>(nullable: true),
                    RemovedBusinessId = table.Column<int>(nullable: true),
                    RemovedEconomyId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RemovedSeat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RemovedSeat_Airplane_RemovedBusinessId",
                        column: x => x.RemovedBusinessId,
                        principalTable: "Airplane",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RemovedSeat_Airplane_RemovedEconomyId",
                        column: x => x.RemovedEconomyId,
                        principalTable: "Airplane",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RemovedSeat_Airplane_RemovedFirstId",
                        column: x => x.RemovedFirstId,
                        principalTable: "Airplane",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FastFlight",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FlightId = table.Column<int>(nullable: true),
                    Row = table.Column<int>(nullable: false),
                    Column = table.Column<int>(nullable: false),
                    AirlineId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FastFlight", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FastFlight_Airlines_AirlineId",
                        column: x => x.AirlineId,
                        principalTable: "Airlines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FastFlight_Flight_FlightId",
                        column: x => x.FlightId,
                        principalTable: "Flight",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Ticket",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Row = table.Column<int>(nullable: false),
                    Column = table.Column<int>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    FlightId = table.Column<int>(nullable: true),
                    TicketOwnerUsername = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ticket", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ticket_Flight_FlightId",
                        column: x => x.FlightId,
                        principalTable: "Flight",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Ticket_RegisteredUsers_TicketOwnerUsername",
                        column: x => x.TicketOwnerUsername,
                        principalTable: "RegisteredUsers",
                        principalColumn: "Username",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "AirlineAdmins",
                keyColumn: "Username",
                keyValue: "airlineadmin0",
                column: "AirlineID",
                value: 100);

            migrationBuilder.UpdateData(
                table: "AirlineAdmins",
                keyColumn: "Username",
                keyValue: "airlineadmin1",
                column: "AirlineID",
                value: 101);

            migrationBuilder.UpdateData(
                table: "AirlineAdmins",
                keyColumn: "Username",
                keyValue: "airlineadmin2",
                column: "AirlineID",
                value: 102);

            migrationBuilder.InsertData(
                table: "Airlines",
                columns: new[] { "Id", "AddressId", "Description", "Destinations" },
                values: new object[,]
                {
                    { 100, null, "Really good airline !!!!", null },
                    { 101, null, "Really good airline !!!!", null },
                    { 102, null, "Really good airline !!!!", null }
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "e9a1807c-0687-46ac-8c44-600abcc1b82f", "4d6b6890-b5a7-4aa5-85ee-f034493465f5" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "9915c453-7c3d-4a14-92c9-0255dc2d888f", "792a2e5e-d68a-43fd-8068-4971d58c9011" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "259be683-474a-48c4-8761-291fdb2eda17", "9e864973-1910-47d3-9a18-27663f0f6a82" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "80fb951a-7aed-4620-a524-19a2283ea394", "a698bd94-2fcd-4d16-983b-6837880ad4e9" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "4b839c7c-3fe6-4fe5-93b8-e22b53710466", "05b034c0-3cf2-4d81-906f-3f0ed3ece11e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "96db0bf2-1080-453c-aab0-268f7dc4f218", "628f5f5e-d250-46b6-8c26-00b74f7b091c" });

            migrationBuilder.CreateIndex(
                name: "IX_Airlines_AddressId",
                table: "Airlines",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Airplane_AirlineId",
                table: "Airplane",
                column: "AirlineId");

            migrationBuilder.CreateIndex(
                name: "IX_DisabledSeat_DisabledBusinessId",
                table: "DisabledSeat",
                column: "DisabledBusinessId");

            migrationBuilder.CreateIndex(
                name: "IX_DisabledSeat_DisabledEconomyId",
                table: "DisabledSeat",
                column: "DisabledEconomyId");

            migrationBuilder.CreateIndex(
                name: "IX_DisabledSeat_DisabledFirstId",
                table: "DisabledSeat",
                column: "DisabledFirstId");

            migrationBuilder.CreateIndex(
                name: "IX_FastFlight_AirlineId",
                table: "FastFlight",
                column: "AirlineId");

            migrationBuilder.CreateIndex(
                name: "IX_FastFlight_FlightId",
                table: "FastFlight",
                column: "FlightId");

            migrationBuilder.CreateIndex(
                name: "IX_Flight_AirlineId",
                table: "Flight",
                column: "AirlineId");

            migrationBuilder.CreateIndex(
                name: "IX_Flight_AirplaneId",
                table: "Flight",
                column: "AirplaneId");

            migrationBuilder.CreateIndex(
                name: "IX_RemovedSeat_RemovedBusinessId",
                table: "RemovedSeat",
                column: "RemovedBusinessId");

            migrationBuilder.CreateIndex(
                name: "IX_RemovedSeat_RemovedEconomyId",
                table: "RemovedSeat",
                column: "RemovedEconomyId");

            migrationBuilder.CreateIndex(
                name: "IX_RemovedSeat_RemovedFirstId",
                table: "RemovedSeat",
                column: "RemovedFirstId");

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_FlightId",
                table: "Ticket",
                column: "FlightId");

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_TicketOwnerUsername",
                table: "Ticket",
                column: "TicketOwnerUsername");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DisabledSeat");

            migrationBuilder.DropTable(
                name: "FastFlight");

            migrationBuilder.DropTable(
                name: "RemovedSeat");

            migrationBuilder.DropTable(
                name: "Ticket");

            migrationBuilder.DropTable(
                name: "Flight");

            migrationBuilder.DropTable(
                name: "Airplane");

            migrationBuilder.DropTable(
                name: "Airlines");

            migrationBuilder.DropTable(
                name: "AirlineAddress");

            migrationBuilder.AlterColumn<string>(
                name: "AirlineID",
                table: "AirlineAdmins",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.UpdateData(
                table: "AirlineAdmins",
                keyColumn: "Username",
                keyValue: "airlineadmin0",
                column: "AirlineID",
                value: "0");

            migrationBuilder.UpdateData(
                table: "AirlineAdmins",
                keyColumn: "Username",
                keyValue: "airlineadmin1",
                column: "AirlineID",
                value: "1");

            migrationBuilder.UpdateData(
                table: "AirlineAdmins",
                keyColumn: "Username",
                keyValue: "airlineadmin2",
                column: "AirlineID",
                value: "2");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "4388c6c4-0037-4f4c-97e8-e386a226dd69", "75322bb2-0a40-4650-bcc9-760866b85e86" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "ec103ff0-43d9-4e50-9a6e-b92a11c067cd", "63d0241b-f04f-4ec9-a3e7-68b63883d93d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "1fdc8c5c-9bd9-4163-ae6f-4fa8f32fb22e", "68386eca-4af9-4f1d-b482-286c2aa277c6" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "2348a12f-7dcb-4a8c-aee3-cc2bad7e39b8", "38a35796-56f3-4b3b-bff1-ef7f71b90727" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "e39bfc84-adf9-43e5-9009-527816fb2ebb", "acd96e40-7f19-45e2-832a-5dc08933013c" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "cc05905e-91a4-43ef-bb45-79496dbdec5d", "51a5cd76-5c48-4278-a06c-13e17735633e" });
        }
    }
}
