using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class flightchange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AirlineId",
                table: "Ticket",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Airlines",
                keyColumn: "Id",
                keyValue: 100,
                column: "Destinations",
                value: "[]");

            migrationBuilder.UpdateData(
                table: "Airlines",
                keyColumn: "Id",
                keyValue: 101,
                column: "Destinations",
                value: "[]");

            migrationBuilder.UpdateData(
                table: "Airlines",
                keyColumn: "Id",
                keyValue: 102,
                column: "Destinations",
                value: "[]");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "826b87ef-feff-452c-b8b3-d6451000b50f", "b4113e43-56af-4d21-b2c2-5c95863fe5c3" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "3112ebe0-e470-4445-8992-fab22884cfec", "13dcc246-6db1-4050-9d2e-321b09f3bafe" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "21ff06f3-2740-410c-a715-b514ce95582b", "9b1a42e6-0977-44b4-b4b9-f6b1253eeafe" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "f12547a1-3554-4322-8585-3088bd61a4bd", "79311b20-ab60-4241-8b0a-6e33c121a151" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "2fdfba2e-1e8a-4ff1-811b-77ed4eea4e45", "a7ab1d77-c877-47b9-88bf-012523fa7ce3" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "ffd09b7c-f4a5-4128-8dd6-f66f83e3f709", "6a0636e7-aae9-4896-8d90-3c8123e0b577" });

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.UpdateData(
                table: "Airlines",
                keyColumn: "Id",
                keyValue: 100,
                column: "Destinations",
                value: null);

            migrationBuilder.UpdateData(
                table: "Airlines",
                keyColumn: "Id",
                keyValue: 101,
                column: "Destinations",
                value: null);

            migrationBuilder.UpdateData(
                table: "Airlines",
                keyColumn: "Id",
                keyValue: 102,
                column: "Destinations",
                value: null);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "4318c4ab-6276-41b5-acef-7151689671e3", "e6d27a75-93c4-4af3-96bd-073b8c1c69ea" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "41d89029-8d15-40c2-b23f-7b580c0a1eae", "097ec451-6b71-4384-ab06-7c4e52afd967" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "be063920-2960-445d-ab61-c8a38a23bfe3", "147f21f6-edfb-4c7d-83e4-ce3b4eb12dfb" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "a3a947b0-410e-4aaf-90b6-2d63dec1aec7", "b0d5b45f-b217-4421-b9ca-66df4a0e92c2" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "32a7c3b7-8331-4cb7-898b-203d8d57fd8f", "e30e77d9-de58-4611-9bf6-4ad487d842fe" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "f766cebc-275f-4580-a296-59fa3b97302e", "e18089b5-ea38-4786-8623-f0ea2c7b2bab" });
        }
    }
}
