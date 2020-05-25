using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BookingAppBackend.Migrations
{
    public partial class changedflight : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FlightDuration",
                table: "Flight");

            migrationBuilder.DropColumn(
                name: "NumberOfStops",
                table: "Flight");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<TimeSpan>(
                name: "FlightDuration",
                table: "Flight",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<int>(
                name: "NumberOfStops",
                table: "Flight",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "0",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "a4f00618-bb8a-4afc-ad66-12cb2c4626f0", "53e7dd70-cb65-40e4-b2da-327c38d6fb7b" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "405738c8-d99a-454b-bdaa-afc46cfb8a83", "3ad1eb06-89d0-4d5a-88bd-e19461264918" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "a80cfaa5-bdea-4f81-9a51-02a65a7b8583", "285e758a-90f6-4988-8ffc-c2d3b55abe94" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "e283be21-d2da-4321-947a-3cb30ee11b8b", "c38758a5-9406-41cb-9d55-7096a8c04e56" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "e9c7a388-7dfb-4503-97f6-eb3ee0d9abb1", "af492838-df59-49e1-8cfc-012a986e13e2" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "e3f8858f-f93a-4066-adc7-b653d975c2b4", "4f6a7988-5ad1-4ebb-8d86-3ad9e9ce3d48" });
        }
    }
}
