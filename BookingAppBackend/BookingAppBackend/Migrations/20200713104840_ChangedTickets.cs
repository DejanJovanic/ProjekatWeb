using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class ChangedTickets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_Airlines_AirlineId",
                table: "Ticket");

            migrationBuilder.DropIndex(
                name: "IX_Ticket_AirlineId",
                table: "Ticket");

            migrationBuilder.DropColumn(
                name: "AirlineId",
                table: "Ticket");

            migrationBuilder.AddColumn<string>(
                name: "InvitedByUsername",
                table: "Ticket",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsApporved",
                table: "Ticket",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Ticket",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "LoadWeight",
                table: "Ticket",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Ticket",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Passport",
                table: "Ticket",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReservationId",
                table: "Ticket",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "RegisteredUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "RegisteredUsers",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PaidExtras",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Price = table.Column<double>(nullable: false),
                    TicketId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaidExtras", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaidExtras_Ticket_TicketId",
                        column: x => x.TicketId,
                        principalTable: "Ticket",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Reservation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SettingUserUsername = table.Column<string>(nullable: true),
                    ApprovedCostReductionPercentage = table.Column<double>(nullable: false),
                    RentACarCostReductionPercentage = table.Column<double>(nullable: false),
                    AirlineId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reservation_Airlines_AirlineId",
                        column: x => x.AirlineId,
                        principalTable: "Airlines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reservation_RegisteredUsers_SettingUserUsername",
                        column: x => x.SettingUserUsername,
                        principalTable: "RegisteredUsers",
                        principalColumn: "Username",
                        onDelete: ReferentialAction.Restrict);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_InvitedByUsername",
                table: "Ticket",
                column: "InvitedByUsername");

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_ReservationId",
                table: "Ticket",
                column: "ReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_PaidExtras_TicketId",
                table: "PaidExtras",
                column: "TicketId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_AirlineId",
                table: "Reservation",
                column: "AirlineId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_SettingUserUsername",
                table: "Reservation",
                column: "SettingUserUsername");

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_RegisteredUsers_InvitedByUsername",
                table: "Ticket",
                column: "InvitedByUsername",
                principalTable: "RegisteredUsers",
                principalColumn: "Username",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_Reservation_ReservationId",
                table: "Ticket",
                column: "ReservationId",
                principalTable: "Reservation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_RegisteredUsers_InvitedByUsername",
                table: "Ticket");

            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_Reservation_ReservationId",
                table: "Ticket");

            migrationBuilder.DropTable(
                name: "PaidExtras");

            migrationBuilder.DropTable(
                name: "Reservation");

            migrationBuilder.DropIndex(
                name: "IX_Ticket_InvitedByUsername",
                table: "Ticket");

            migrationBuilder.DropIndex(
                name: "IX_Ticket_ReservationId",
                table: "Ticket");

            migrationBuilder.DropColumn(
                name: "InvitedByUsername",
                table: "Ticket");

            migrationBuilder.DropColumn(
                name: "IsApporved",
                table: "Ticket");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Ticket");

            migrationBuilder.DropColumn(
                name: "LoadWeight",
                table: "Ticket");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Ticket");

            migrationBuilder.DropColumn(
                name: "Passport",
                table: "Ticket");

            migrationBuilder.DropColumn(
                name: "ReservationId",
                table: "Ticket");

            migrationBuilder.DropColumn(
                name: "City",
                table: "RegisteredUsers");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "RegisteredUsers");

            migrationBuilder.AddColumn<int>(
                name: "AirlineId",
                table: "Ticket",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "06e0953a-85b0-4b83-b6e2-00c68d5c20ec", "787d84d7-d4bf-4695-bfcd-5c22d385398b" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "e6242ec2-15b9-4e3b-a5d3-9e439029e9e5", "f8f03371-c42c-4502-bf77-6e6d51989524" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "d98fd69c-88db-4755-91e5-671928fe27a6", "7b6628af-f956-4ec5-95e8-df3a4c05b0fd" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "b7dd2515-dd6b-4cb2-84d1-808217ccf571", "f7ed3bdd-5284-4d20-aaeb-74ca8acbc6af" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "f7b88f7a-8441-4a16-aed0-125e51ee61ec", "382095bf-13e9-40cd-9c7e-87c87b86fe30" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "1d6ea934-79cb-4e17-a0fc-170d9c46401e", "3a4a1063-2403-47c6-ae13-6eccb6edfac4" });

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_AirlineId",
                table: "Ticket",
                column: "AirlineId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_Airlines_AirlineId",
                table: "Ticket",
                column: "AirlineId",
                principalTable: "Airlines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
