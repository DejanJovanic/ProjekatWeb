using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class changedExtras : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PaidExtras_Ticket_TicketId",
                table: "PaidExtras");

            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_Flight_FlightId",
                table: "Ticket");

            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_RegisteredUsers_InvitedByUsername",
                table: "Ticket");

            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_Reservation_ReservationId",
                table: "Ticket");

            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_RegisteredUsers_TicketOwnerUsername",
                table: "Ticket");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ticket",
                table: "Ticket");

            migrationBuilder.DeleteData(
                table: "AirlineAdmins",
                keyColumn: "Username",
                keyValue: "airlineadmin0");

            migrationBuilder.DeleteData(
                table: "AirlineAdmins",
                keyColumn: "Username",
                keyValue: "airlineadmin1");

            migrationBuilder.DeleteData(
                table: "AirlineAdmins",
                keyColumn: "Username",
                keyValue: "airlineadmin2");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5");

            migrationBuilder.DeleteData(
                table: "RegisteredUsers",
                keyColumn: "Username",
                keyValue: "user0");

            migrationBuilder.DeleteData(
                table: "RegisteredUsers",
                keyColumn: "Username",
                keyValue: "user1");

            migrationBuilder.DeleteData(
                table: "RegisteredUsers",
                keyColumn: "Username",
                keyValue: "user2");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "RegisteredUsers");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "RegisteredUsers");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "AirlineAdmins");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "AirlineAdmins");

            migrationBuilder.RenameTable(
                name: "Ticket",
                newName: "Tickets");

            migrationBuilder.RenameIndex(
                name: "IX_Ticket_TicketOwnerUsername",
                table: "Tickets",
                newName: "IX_Tickets_TicketOwnerUsername");

            migrationBuilder.RenameIndex(
                name: "IX_Ticket_ReservationId",
                table: "Tickets",
                newName: "IX_Tickets_ReservationId");

            migrationBuilder.RenameIndex(
                name: "IX_Ticket_InvitedByUsername",
                table: "Tickets",
                newName: "IX_Tickets_InvitedByUsername");

            migrationBuilder.RenameIndex(
                name: "IX_Ticket_FlightId",
                table: "Tickets",
                newName: "IX_Tickets_FlightId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tickets",
                table: "Tickets",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PaidExtras_Tickets_TicketId",
                table: "PaidExtras",
                column: "TicketId",
                principalTable: "Tickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Flight_FlightId",
                table: "Tickets",
                column: "FlightId",
                principalTable: "Flight",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_RegisteredUsers_InvitedByUsername",
                table: "Tickets",
                column: "InvitedByUsername",
                principalTable: "RegisteredUsers",
                principalColumn: "Username",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Reservation_ReservationId",
                table: "Tickets",
                column: "ReservationId",
                principalTable: "Reservation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_RegisteredUsers_TicketOwnerUsername",
                table: "Tickets",
                column: "TicketOwnerUsername",
                principalTable: "RegisteredUsers",
                principalColumn: "Username",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PaidExtras_Tickets_TicketId",
                table: "PaidExtras");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Flight_FlightId",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_RegisteredUsers_InvitedByUsername",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Reservation_ReservationId",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_RegisteredUsers_TicketOwnerUsername",
                table: "Tickets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tickets",
                table: "Tickets");

            migrationBuilder.RenameTable(
                name: "Tickets",
                newName: "Ticket");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_TicketOwnerUsername",
                table: "Ticket",
                newName: "IX_Ticket_TicketOwnerUsername");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_ReservationId",
                table: "Ticket",
                newName: "IX_Ticket_ReservationId");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_InvitedByUsername",
                table: "Ticket",
                newName: "IX_Ticket_InvitedByUsername");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_FlightId",
                table: "Ticket",
                newName: "IX_Ticket_FlightId");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "RegisteredUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "RegisteredUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "AirlineAdmins",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "AirlineAdmins",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ticket",
                table: "Ticket",
                column: "Id");

            migrationBuilder.InsertData(
                table: "AirlineAdmins",
                columns: new[] { "Username", "AirlineID", "City", "LastName", "Name", "Password", "PhoneNumber", "Role" },
                values: new object[,]
                {
                    { "airlineadmin0", 100, null, "AirlineAdmin0", "AirlineAdmin0", "airlineadmin0", null, "AirlineAdmin" },
                    { "airlineadmin1", 101, null, "AirlineAdmin1", "AirlineAdmin1", "airlineadmin1", null, "AirlineAdmin" },
                    { "airlineadmin2", 102, null, "AirlineAdmin2", "AirlineAdmin2", "airlineadmin2", null, "AirlineAdmin" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "Password", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "Role", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "0", 0, "6b0323fc-0311-4032-8e7e-449a7f0e728d", null, false, false, null, null, "User0", "user0", null, null, false, "User", "884595e2-3dac-418b-8de5-bf32654f13e1", false, "user0" },
                    { "1", 0, "80acfa57-b94b-48eb-95cd-de019aca40be", null, false, false, null, null, "User1", "user1", null, null, false, "User", "da7fa750-e34a-4257-8ce6-f8b8c0b0c9b7", false, "user1" },
                    { "2", 0, "cbe1d9be-977a-4cde-912b-74f34e325983", null, false, false, null, null, "User2", "user2", null, null, false, "User", "ea5cfe70-9226-422c-aa27-f370d8a76bad", false, "user2" },
                    { "3", 0, "a9242029-27e0-4006-bd8b-47b7f61f7af6", null, false, false, null, null, "AirlineAdmin0", "airlineAdmin0", null, null, false, "AirlineAdmin", "b940a4bc-c8b6-46b8-bdb3-c9b9bb42c209", false, "airlineAdmin0" },
                    { "4", 0, "a60bdbeb-adb2-45d7-9f27-3f663930137e", null, false, false, null, null, "AirlineAdmin1", "airlineAdmin1", null, null, false, "AirlineAdmin", "6db64e0a-ccc5-460b-ac13-d44a802f7d15", false, "airlineAdmin1" },
                    { "5", 0, "779522d3-6b3e-49e9-b620-2d18ac2e48a3", null, false, false, null, null, "AirlineAdmin2", "airlineAdmin2", null, null, false, "AirlineAdmin", "ea4f17d5-ffe7-4bcf-8ebf-9ce5347736ca", false, "airlineAdmin2" }
                });

            migrationBuilder.InsertData(
                table: "RegisteredUsers",
                columns: new[] { "Username", "City", "IsEnabled", "LastName", "Name", "ParentId", "Password", "PhoneNumber", "Role", "Username1" },
                values: new object[,]
                {
                    { "user0", null, false, "User0", "User0", null, "user0", null, "User", null },
                    { "user1", null, false, "User1", "User1", null, "user1", null, "User", null },
                    { "user2", null, false, "User2", "User2", null, "user2", null, "User", null }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_PaidExtras_Ticket_TicketId",
                table: "PaidExtras",
                column: "TicketId",
                principalTable: "Ticket",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_Flight_FlightId",
                table: "Ticket",
                column: "FlightId",
                principalTable: "Flight",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_RegisteredUsers_TicketOwnerUsername",
                table: "Ticket",
                column: "TicketOwnerUsername",
                principalTable: "RegisteredUsers",
                principalColumn: "Username",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
