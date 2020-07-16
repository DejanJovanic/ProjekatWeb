using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class changedUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Passport",
                table: "RegisteredUsers");

            migrationBuilder.DropColumn(
                name: "IsEnabled",
                table: "AirlineAdmins");

            migrationBuilder.AddColumn<double>(
                name: "Distance",
                table: "Flight",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "AirlineAdmins",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "AirlineAdmins",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "6b0323fc-0311-4032-8e7e-449a7f0e728d", "884595e2-3dac-418b-8de5-bf32654f13e1" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "80acfa57-b94b-48eb-95cd-de019aca40be", "da7fa750-e34a-4257-8ce6-f8b8c0b0c9b7" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "cbe1d9be-977a-4cde-912b-74f34e325983", "ea5cfe70-9226-422c-aa27-f370d8a76bad" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "a9242029-27e0-4006-bd8b-47b7f61f7af6", "b940a4bc-c8b6-46b8-bdb3-c9b9bb42c209" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "a60bdbeb-adb2-45d7-9f27-3f663930137e", "6db64e0a-ccc5-460b-ac13-d44a802f7d15" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "779522d3-6b3e-49e9-b620-2d18ac2e48a3", "ea4f17d5-ffe7-4bcf-8ebf-9ce5347736ca" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Distance",
                table: "Flight");

            migrationBuilder.DropColumn(
                name: "City",
                table: "AirlineAdmins");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "AirlineAdmins");

            migrationBuilder.AddColumn<string>(
                name: "Passport",
                table: "RegisteredUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsEnabled",
                table: "AirlineAdmins",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "bd67d7b3-2fa0-4d12-9c02-50a40370b8fc", "ab4de55d-ac83-447e-a7f5-2b4ad041e08c" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "1a74c707-b52b-4d82-a941-24956c7cf5c0", "8909299a-cc8d-4068-aafc-fcd8c7943d5c" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "915ac9de-e190-4655-9610-7defa55bf151", "df415e53-3831-478b-8f32-545f3ecd482a" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "500e38d5-f9dc-4913-895d-df6622b68f73", "10624897-c279-403e-819b-03b4836ae1de" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "2c449dc4-c876-4080-b26b-4a759bf8b598", "4e002ff1-ffae-42a6-9ef8-5d302cc4e525" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "53fda95a-4c8d-4a2c-b02b-8140f1177434", "6fbe2f24-52d8-4deb-9659-609baec66fa1" });
        }
    }
}
