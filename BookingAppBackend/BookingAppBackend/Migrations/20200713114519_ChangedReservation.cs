using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class ChangedReservation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RentACarCostReductionPercentage",
                table: "Reservation");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "RentACarCostReductionPercentage",
                table: "Reservation",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

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
        }
    }
}
